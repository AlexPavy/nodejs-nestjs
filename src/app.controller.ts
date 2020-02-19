import {Controller, Get, Post, Delete, Body, UsePipes, Param} from '@nestjs/common';
import { FormDefinitionSvc } from './app.service';
import {FormDefValidationPipe } from './formDefinitionValidation'

@Controller()
export class HelloCtl {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World';
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

  @Delete(':name')
  async deleteFormDefinition(@Param() params) {
    return this.formDefSvc.delete(params.name);
  }
}

// @Controller("form-entry")
// export class FormEntryCtl {
//   constructor(private readonly appService: AppService) {}
//
//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
