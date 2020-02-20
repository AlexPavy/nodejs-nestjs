import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import {FirestoreSvc} from "./firestore";
import {FirestoreInMemorySvc} from "./firestore_in_memory";

/*
  Tests the whole integration
 */

const formDefs = require('../example/form-definitions.json');
const entries = require('../example/form-entries.json');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let firestoreSvc = new FirestoreInMemorySvc();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(FirestoreSvc)
        .useValue(firestoreSvc)
        .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Base test', () => {
    it('/ (GET)', async () => {
      return request(app.getHttpServer())
          .get('/')
          .expect(200, {message: 'Add to event test'})
    });
  });

  describe('Form Definition test', () => {
    it('Can create and get a valid form definition', async () => {
      await request(app.getHttpServer())
          .post('/form-definition')
          .send({"magician": formDefs["magician"]})
          .expect(201);
      return request(app.getHttpServer())
          .get('/form-definition/magician')
          .expect(200, {"magician": formDefs["magician"]});
    });

    it('Checks create invalid form definition', async () => {
      await request(app.getHttpServer())
          .post('/form-definition')
          .send({"magician": {}})
          .expect(400, {
            statusCode: 400,
            error: 'Bad Request',
            message: 'ValidationError: "magician" must be an array'
          });
    });

    it('Can update and get a valid form definition', async () => {
      await request(app.getHttpServer())
        .post('/form-definition')
        .send({"magician": formDefs["magician"]});

      const updated = JSON.parse(JSON.stringify(formDefs["magician"]));
      updated[0].key = "typeofmagic";
      await request(app.getHttpServer())
        .put('/form-definition')
        .send({"magician": updated})
        .expect(200);

      return request(app.getHttpServer())
        .get('/form-definition/magician')
        .expect(200, {"magician": updated});
    });

    it('Checks update invalid form definition', async () => {
      await request(app.getHttpServer())
        .post('/form-definition')
        .send({"magician": formDefs["magician"]});

      await request(app.getHttpServer())
        .put('/form-definition')
        .send({"magician": {}})
        .expect(400, {
          statusCode: 400,
          error: 'Bad Request',
          message: 'ValidationError: "magician" must be an array'
        });
    });
  });

  describe('Form Entry test', () => {
    it('Can create and get a valid form entry', async () => {
      await request(app.getHttpServer())
          .post('/form-definition')
          .send({"confetti": formDefs["confetti"]})
          .expect(201);

      await request(app.getHttpServer())
          .post('/form-entry')
          .send(entries["confetti"]["entry1"])
          .expect(201);
      return request(app.getHttpServer())
          .get('/form-entry/confetti_entry1')
          .expect(200, entries["confetti"]["entry1"]);
    });

    it('Checks invalid form entry', async () => {
      await request(app.getHttpServer())
          .post('/form-entry')
          .send(entries["confetti"]["entry1"])
          .expect(400, {
            statusCode: 400,
            error: 'Bad Request',
            message: 'There is no definition of service with serviceKey confetti'
          });
    });
  });
});
