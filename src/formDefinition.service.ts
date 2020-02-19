import {BadRequestException, Injectable} from '@nestjs/common';
import {FirestoreSvc} from "./firestore";

@Injectable()
export class FormDefinitionSvc {

  private formDefDb;

  constructor(private readonly firestoreSvc: FirestoreSvc) {
    this.formDefDb = firestoreSvc.db.collection('form_definitions');
  }

  async get(name: string) {
     const snap = await this.formDefDb.doc(name).get();
     return snap.data();
  }

  async create(name: string, data) {
    const snap = await this.formDefDb.doc(name).get();
    if (snap.data()) {
      throw new BadRequestException(`Service name ${name} already exists`);
    }
    return this.formDefDb.doc(name).set(data);
  }

  async update(name: string, data) {
    const snap = await this.formDefDb.doc(name).get();
    if (!snap.data()) {
      throw new BadRequestException(`Service name ${name} doesn't exist`);
    }
    return this.formDefDb.doc(name).set(data);
  }

  async delete(name: string) {
    return this.formDefDb.doc(name).delete();
  }
}
