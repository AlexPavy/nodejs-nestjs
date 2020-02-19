/*
 * Validation of form definitions (= questions)
 *
 * It could use https://github.com/hapijs/joi to validate questions
 * but since we can't use it to validate submissions I preferred to code it without
 */
import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    BadRequestException
} from '@nestjs/common';

const Joi = require('@hapi/joi');

const FORM_DEFINITION_SCHEMA = Joi.object().min(1).max(1).pattern(
    Joi.string().min(2),
    Joi.object({
        key: Joi.string().required(),
        type: Joi.valid("string", "textarea", "radios", "submit", "date").required(),
        title: Joi.string().required(),
        placeholder: Joi.string().required(),
        options: Joi.array().when("type", {
            is: "radios",
            then: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    value: Joi.string().required(),
                })
            ).min(2).required()
        })
    })
);

@Injectable()
export class FormDefValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const result = FORM_DEFINITION_SCHEMA.validate(value);
        if (result.error) {
            throw new BadRequestException(result.error.stack);
        }
        return value;
    }

}
