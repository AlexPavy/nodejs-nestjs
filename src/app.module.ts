import { Module } from '@nestjs/common';
import { HelloCtl, FormDefinitionCtl } from './app.controller';
import { FormDefinitionSvc } from './app.service';
import { FirestoreSvc } from './firestore';

@Module({
  imports: [],
  controllers: [HelloCtl, FormDefinitionCtl],
  providers: [FirestoreSvc, FormDefinitionSvc],
})
export class AppModule {}
