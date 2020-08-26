import { ApiProperty } from '@nestjs/swagger';

export class PlainCredentials {
	@ApiProperty({
		required: true,
	})
	username: string;

	@ApiProperty({
		required: true,
	})
	password: string;
}
