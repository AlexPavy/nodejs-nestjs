import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import {FirestoreSvc} from "./firestore";
import {FirestoreInMemorySvc} from "./firestore_in_memory";

const questions = require('../example/service-questions-export.json');

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
      const created = await request(app.getHttpServer())
          .post('/form-definition')
          .send(questions["magician"])
          .expect(200, {message: 'Add to event test'});
      console.log(created)
    });
  });
});
