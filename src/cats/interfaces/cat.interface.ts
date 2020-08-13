import { ApiProperty } from '@nestjs/swagger';

export class ICat {
	@ApiProperty({
		minimum: 1,
	})
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty({
		minimum: 1,
	})
	age: number;

	@ApiProperty()
	breed: string;
}
