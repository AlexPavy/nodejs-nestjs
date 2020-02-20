import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionCtl } from './app.controller';
import { FormDefinitionSvc } from './formDefinition.service';
import { FirestoreSvc } from './firestore';
import { FirestoreInMemorySvc } from './firestore_in_memory';

/*
  Tests of the controller are more useful as e2e tests for now,
  for the annotations and integrations
 */

describe('controller test', () => {
  let formDefinitionCtl: FormDefinitionCtl;
  let firestoreSvc = new FirestoreInMemorySvc();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FormDefinitionCtl],
      providers: [FirestoreSvc, FormDefinitionSvc],
    }).overrideProvider(FirestoreSvc)
        .useValue(firestoreSvc)
        .compile();

    formDefinitionCtl = app.get<FormDefinitionCtl>(FormDefinitionCtl);
  });

  describe('FormDefinitionCtl test', () => {
    it('createFormDefinition should create a definition', async () => {
      const res = await formDefinitionCtl.createFormDefinition(
          {
            "magician": {
              "key" : "first-name",
              "title" : "First name",
              "type" : "string",
              "validation" : {
                "required" : true
              }
            }
          }
          );
      expect(Object.keys(res)).toStrictEqual(["date"]);
    });
  });
});
