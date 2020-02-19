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

  async create(name: string, data) {
    const snap = await this.formEntryDb.doc(name).get();
    if (snap.data()) {
      throw new BadRequestException(`Entry with name ${name} already exists`);
    }
    return this.formEntryDb.doc(name).set(data);
  }

}
