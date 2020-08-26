import { ApiProperty } from '@nestjs/swagger';

export class IToken {
	@ApiProperty()
	accessToken: string;
}
