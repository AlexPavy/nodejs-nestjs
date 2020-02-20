import { Injectable } from '@nestjs/common';

/*
  Same methods as Firestore service, but only in memory (like a mock) for testing
 */

@Injectable()
export class FirestoreInMemorySvc {

  public db;

  constructor() {
    this.db = new InMemoryDB();
  }

}

class InMemoryDB {

  private collections = {};

  collection(name: string) {
    if (!this.collections[name]) {
      this.collections[name] = new InMemoryCollection()
    }
    return this.collections[name];
  }

}

class InMemoryCollection {

  private docs = {};

  doc(name: string) {
    if (!this.docs[name]) {
      this.docs[name] = new InMemoryDocRef()
    }
    return this.docs[name];
  }

}

/**
 * DocumentReference
 */
class InMemoryDocRef {

  private snap = new InMemoryDocSnap();

  async get() {
    return this.snap;
  }

  async set(value: any) {
    this.snap.set(value);
    return {
      "date": Date()
    };
  }

}

/**
 * DocumentSnapshot
 */
class InMemoryDocSnap {

  private docdata = undefined;

  data() {
    if (!this.docdata) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(this.docdata))
  }

  set(value: any) {
    this.docdata = JSON.parse(JSON.stringify(value));
  }

}
