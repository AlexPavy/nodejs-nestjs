import {BadRequestException, Injectable} from '@nestjs/common';
import {FirestoreSvc} from "./firestore";

@Injectable()
export class FormEntrySvc {

  private formEntryDb;

  constructor(private readonly firestoreSvc: FirestoreSvc) {
    this.formEntryDb = firestoreSvc.db.collection('form_entries');
  }

  async get(name: string) {
     const snap = await this.formEntryDb.doc(name).get();
     return snap.data();
  }

  async create(key: string, data) {
    const snap = await this.formEntryDb.doc(key).get();
    if (snap.data()) {
      throw new BadRequestException(`Entry with key ${key} already exists`);
    }
    return this.formEntryDb.doc(key).set(data);
  }

}
