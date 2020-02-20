import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionSvc } from './formDefinition.service';
import { FirestoreSvc } from './firestore';
import { FirestoreInMemorySvc } from './firestore_in_memory';
import { FormEntryValidationPipe } from './formEntry.pipe'
import {AppModule} from "./app.module";

/*
  Test validation pipe for form entries
 */

const formDefs = require('../example/form-definitions.json');
const entries = require('../example/form-entries.json');

describe('formEntry validation pipe test', () => {
  let formDefSvc: FormDefinitionSvc;
  let formEntryPipe: FormEntryValidationPipe;
  let firestoreSvc: FirestoreInMemorySvc;

  beforeEach(async () => {
    firestoreSvc = new FirestoreInMemorySvc();
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(FirestoreSvc)
        .useValue(firestoreSvc)
        .compile();
    formDefSvc = app.get<FormDefinitionSvc>(FormDefinitionSvc);
    // There may be a better way to do the dependency injection of the pipe
    formEntryPipe = new FormEntryValidationPipe(formDefSvc)
  });

  describe('FormEntryValidationPipe test', () => {

    it('should check the entry schema', async () => {
      // Can add more tests on the attributes of the schema
      try {
        await formEntryPipe.transform(
            {
              "key": "s1",
            },
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("ValidationError: \"name\" is required");
      }
    });

    it('should check that a service exists', async () => {
      try {
        await formEntryPipe.transform(
            entries["confetti"]["entry1"],
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe(
            "There is no definition of service with serviceKey confetti");
      }
    });

    it('should match the question key', async () => {
      await formDefSvc.create(
          "confetti",
          {"confetti": formDefs["confetti"]}
      );
      try {
        await formEntryPipe.transform(
            {
              "key": "confetti_entry1",
              "name": "Confetti entry 1",
              "date": 1582157673434,
              "dateCreated": 1582157673433,
              "serviceKey": "confetti",
              "questions": [
                {
                  "questionKey": "typewithtypo",
                  "value": "wedding"
                }
              ]
            },
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe(
            "There is no question with key typewithtypo in the service definition");
      }
    });

    it('should check max length', async () => {
      await formDefSvc.create(
          "confetti",
          {"confetti": formDefs["confetti"]}
      );
      try {
        await formEntryPipe.transform(
            {
              "key": "confetti_entry1",
              "name": "Confetti entry 1",
              "date": 1582157673434,
              "dateCreated": 1582157673433,
              "serviceKey": "confetti",
              "questions": [
                {
                  "questionKey": "type",
                  "value": "wedding"
                },
                {
                  "questionKey": "body",
                  "value": "Confetti are small pieces or streamers of paper, mylar, or metallic material which are" +
                      " usually thrown at celebrations, especially parades and weddings.[1] The origins are from " +
                      "the Latin confectum, with confetti the plural of Italian confetto, small sweet.[2] Modern " +
                      "paper confetti trace back to symbolic rituals of tossing grains and sweets during special " +
                      "occasions, traditional for numerous cultures throughout history as an ancient custom dating " +
                      "back to pagan times,[3][4] but adapted from sweets and grains to paper through the centuries."
                }
              ]
            },
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe(
            "Value for body cannot be longer than 250");
      }
    });

    it('should check pattern is matched', async () => {
      await formDefSvc.create(
          "hottub",
          {"hottub": formDefs["hottub"]}
      );
      try {
        await formEntryPipe.transform(
            {
              "key": "hottub_entry1",
              "name": "Hottub entry 1",
              "date": 1582157673437,
              "dateCreated": 1582157673436,
              "serviceKey": "hottub",
              "questions": [
                {
                  "questionKey": "email",
                  "value": "invalidemail"
                }
              ]
            },
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("Invalid email");
      }
    });

    it('should check required questions', async () => {
      await formDefSvc.create(
          "hottub",
          {"hottub": formDefs["hottub"]}
      );
      try {
        await formEntryPipe.transform(
            {
              "key": "hottub_entry1",
              "name": "Hottub entry 1",
              "date": 1582157673437,
              "dateCreated": 1582157673436,
              "serviceKey": "hottub",
              "questions": [
                {
                  "questionKey": "hottubtype",
                  "value": "solid"
                }
              ]
            },
            {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("A response for type: is required");
      }
    });

  });
});
