import { Test, TestingModule } from '@nestjs/testing';
import { FormEntrySvc } from './formEntry.service';
import { FirestoreSvc } from './firestore';
import { FirestoreInMemorySvc } from './firestore_in_memory';
import {AppModule} from "./app.module";

/*
  Test service for form entries
 */

describe('formEntry service test', () => {
  let formEntrySvc: FormEntrySvc;
  let firestoreSvc = new FirestoreInMemorySvc();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(FirestoreSvc)
        .useValue(firestoreSvc)
        .compile();
      formEntrySvc = app.get<FormEntrySvc>(FormEntrySvc);
  });

  describe('FormEntrySvc test', () => {

    it('create should check if key is duplicate', async () => {
        await formEntrySvc.create(
            "entry1",
            {"value": 1}
        );

        try {
            await formEntrySvc.create(
            "entry1",
            {"value": 2}
            );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("Entry with key entry1 already exists");
      }
    });

  });
});
