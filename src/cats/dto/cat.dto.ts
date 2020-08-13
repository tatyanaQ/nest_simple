import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateCat {
	@ApiProperty({
		required: true,
	})
	name: string;

	@ApiProperty({
		description: 'The age of the cat',
		minimum: 1,
		required: false,
	})
	age: number;

	breed: string;
}


export class UpdateCat extends PickType(
	CreateCat,
	['age'] as const,
) {}
