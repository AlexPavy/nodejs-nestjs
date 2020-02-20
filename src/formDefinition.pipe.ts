/*
 * Validation of form definitions (= questions)
 */
import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException
} from '@nestjs/common';

const Joi = require('@hapi/joi');

const FORM_DEFINITION_SCHEMA = Joi.object().min(1).max(1).pattern(
    Joi.string().min(2),
    Joi.array().items(
        Joi.object({
            key: Joi.string().required(),
            type: Joi.valid("string", "textarea", "radios", "submit", "date").required(),
            title: Joi.string(),
            placeholder: Joi.string(),
            options: Joi.array().when("type", {
                is: "radios",
                then: Joi.array().items(
                    Joi.object({
                        name: Joi.string().required(),
                        value: Joi.string().required(),
                    })
                ).min(2).required()
            }),
            validation: Joi.object({
                required: Joi.boolean(),
                maxLength: Joi.number().min(1),
                minDate: Joi.string(),
                pattern: Joi.string(), // should add a step to check that it's a valid RegExp
                validationMessage: Joi.string(),
            })
        })
    ).min(1).required()
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
