import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'codetests',
  keyFilename: 'google-credentials.json',
});
