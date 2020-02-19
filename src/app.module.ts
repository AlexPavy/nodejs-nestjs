import { Module } from '@nestjs/common';
import { BaseCtl, FormDefinitionCtl, FormEntryCtl } from './app.controller';
import { FirestoreSvc } from './firestore';
import { FormDefinitionSvc } from './formDefinition.service';
import { FormEntrySvc } from './formEntry.service';

@Module({
  imports: [],
  controllers: [BaseCtl, FormDefinitionCtl, FormEntryCtl],
  providers: [FirestoreSvc, FormDefinitionSvc, FormEntrySvc],
})
export class AppModule {}
