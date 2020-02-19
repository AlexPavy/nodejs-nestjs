import {Controller, Get, Post, Put, Delete, Body, UsePipes, Param} from '@nestjs/common';
import { FormDefinitionSvc } from './formDefinition.service';
import { FormEntrySvc } from './formEntry.service';
import { FormDefValidationPipe } from './formDefinition.pipe'
import { FormEntryValidationPipe } from './formEntry.pipe'

@Controller()
export class BaseCtl {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Add to event test';
  }
}

@Controller("form-definition")
export class FormDefinitionCtl {
  constructor(private readonly formDefSvc: FormDefinitionSvc) {}

  @Get(':name')
  async getFormDefinition(@Param() params) {
    return this.formDefSvc.get(params.name);
  }

  @Post()
  @UsePipes(FormDefValidationPipe)
  async createFormDefinition(@Body() body) {
    const name = Object.keys(body)[0];
    return this.formDefSvc.create(name, body[name]);
  }

  @Put()
  @UsePipes(FormDefValidationPipe)
  async updateFormDefinition(@Body() body) {
    const name = Object.keys(body)[0];
    return this.formDefSvc.update(name, body[name]);
  }

  @Delete(':name')
  async deleteFormDefinition(@Param() params) {
    return this.formDefSvc.delete(params.name);
  }
}

@Controller("form-entry")
export class FormEntryCtl {
  constructor(private readonly formEntrySvc: FormEntrySvc) {}

  @Get(':name')
  async getFormEntry(@Param() params) {
    return this.formEntrySvc.get(params.name);
  }

  @Post()
  @UsePipes(FormEntryValidationPipe)
  async createFormEntry(@Body() body) {
    return this.formEntrySvc.create(body.name, body);
  }

}
