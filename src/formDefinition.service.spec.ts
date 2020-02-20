import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionSvc } from './formDefinition.service';
import { FirestoreSvc } from './firestore';
import { FirestoreInMemorySvc } from './firestore_in_memory';
import {AppModule} from "./app.module";

/*
  Test service for form definitions
 */

describe('formDefinition service test', () => {
  let formDefSvc: FormDefinitionSvc;
  let firestoreSvc: FirestoreInMemorySvc;

  beforeEach(async () => {
    firestoreSvc = new FirestoreInMemorySvc();
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(FirestoreSvc)
        .useValue(firestoreSvc)
        .compile();
    formDefSvc = app.get<FormDefinitionSvc>(FormDefinitionSvc);
  });

  describe('FormDefinitionSvc test', () => {

    it('create should check if key is duplicate', async () => {
        await formDefSvc.create(
            "service1",
            {"value": 1}
        );

        try {
            await formDefSvc.create(
            "service1",
            {"value": 2}
            );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("Service key service1 already exists");
      }
    });

    it('update should check if key exists', async () => {
      try {
        await formDefSvc.update(
          "service1",
          {"value": 2}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("Service name service1 doesn't exist");
      }
    });

  });
});
