import {Controller, Get, Post, Put, Delete, Body, UsePipes, Param} from '@nestjs/common';
import { FormDefinitionSvc } from './formDefinition.service';
import { FormEntrySvc } from './formEntry.service';
import { FormDefValidationPipe } from './formDefinition.pipe'
import { FormEntryValidationPipe } from './formEntry.pipe'

/*
  Single controller file for all routes
 */

@Controller()
export class BaseCtl {
  constructor() {}

  @Get()
  getDefault() {
    return {
      'message': 'Add to event test'
    };
  }
}

@Controller("form-definition")
export class FormDefinitionCtl {
  constructor(private readonly formDefSvc: FormDefinitionSvc) {}

  @Get(':serviceKey')
  async getFormDefinition(@Param() params) {
    return this.formDefSvc.get(params.serviceKey);
  }

  @Post()
  @UsePipes(FormDefValidationPipe)
  async createFormDefinition(@Body() body) {
    const serviceKey = Object.keys(body)[0];
    return this.formDefSvc.create(serviceKey, body);
  }

  @Put()
  @UsePipes(FormDefValidationPipe)
  async updateFormDefinition(@Body() body) {
    const serviceKey = Object.keys(body)[0];
    return this.formDefSvc.update(serviceKey, body);
  }

  @Delete(':serviceKey')
  async deleteFormDefinition(@Param() params) {
    return this.formDefSvc.delete(params.serviceKey);
  }
}

@Controller("form-entry")
export class FormEntryCtl {
  constructor(private readonly formEntrySvc: FormEntrySvc) {}

  @Get(':key')
  async getFormEntry(@Param() params) {
    return this.formEntrySvc.get(params.key);
  }

  @Post()
  @UsePipes(FormEntryValidationPipe)
  async createFormEntry(@Body() body) {
    return this.formEntrySvc.create(body.key, body);
  }

}
