import {
	Controller, Get, Body, Post, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiUnauthorizedResponse, ApiTags, ApiOkResponse, ApiConsumes, ApiBody,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Roles } from '../common/decorators/roles.decorator';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { postSchema } from './schemas';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../common/guards/role.guard';

import { ICat } from './interfaces/cat.interface';
import { CreateCat } from './dto/cat.dto';
import { CatsService } from './cats.service';

import { UploadFile } from './dto/file.dto';
import configs from '../common/modules/configs/config';

@ApiTags('cats')
@Roles('user', 'admin', 'superadmin')
@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Post()
	@ApiOperation({ summary: 'Create cat' })
	async create(@Body(new JoiValidationPipe(postSchema)) createCatDto: CreateCat): Promise<ICat> {
		return this.catsService.create(createCatDto);
	}

	@Post('file')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Cat picture',
		type: UploadFile,
	})
	@UseInterceptors(FilesInterceptor('cat_pic', 2, { storage: configs.catsStorage }))
	async postFile(@UploadedFiles() files: Express.Multer.File[]): Promise<any[]> {
		return files;
	}

	@Get()
	@ApiBearerAuth()
	@ApiOkResponse({ description: 'Get all cats', type: [ICat] })
	@ApiUnauthorizedResponse({ description: 'No (invalid) jwt or no permissions' })
	@Roles('admin', 'superadmin')
	@UseGuards(JwtGuard, RoleGuard)
	async findAll(): Promise<ICat[]> {
		return this.catsService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ description: 'Get all cats', type: [ICat] })
	findOne(@Param('id', ParseIntPipe) id: number): Promise<ICat> {
		return this.catsService.findOne(id);
	}
}
