import { FirestoreInMemorySvc } from './firestore_in_memory';
import { FormDefValidationPipe } from './formDefinition.pipe'

/*
  Test validation pipe for form definition
 */

const formDefs = require('../example/form-definitions.json');

describe('formDefinition validation pipe test', () => {
  let formDefPipe: FormDefValidationPipe;
  let firestoreSvc = new FirestoreInMemorySvc();

  beforeEach(async () => {
    formDefPipe = new FormDefValidationPipe()
  });

  describe('FormDefValidationPipe test', () => {

    it('should succeed on valid input', async () => {
        const res = await formDefPipe.transform(
          {"hottub": formDefs["hottub"]},
          {type: 'body'}
        );
        expect(res).toStrictEqual({"hottub": formDefs["hottub"]})
    });

    it('should check the entry schema', async () => {
      // Can add more tests on the attributes of the schema
      try {
        await formDefPipe.transform(
          {
            "magician": {},
          },
          {type: 'body'}
        );
        fail("Validation error should be triggered")
      } catch (e) {
        expect(e.message.message).toBe("ValidationError: \"magician\" must be an array");
      }
    });

  });
});
