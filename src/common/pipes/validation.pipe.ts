import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema, private type = 'body', private options = {}) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== this.type) return value;

    const { value: validated, error } = this.schema.validate(value, this.options);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return validated;
  }
}
