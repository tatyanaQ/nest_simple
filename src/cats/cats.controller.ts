import {
	Controller, Get, Body, Post, Param,
	ParseIntPipe, UsePipes, UseGuards, UseInterceptors,
	UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
	ApiTags,
	ApiOkResponse,
	ApiConsumes,
	ApiBody,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { Roles } from '../common/decorators/roles.decorator';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';
import { postSchema } from './schemas';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../common/guards/role.guard';

import { ICat } from './interfaces/cat.interface';
import { CreateCat } from './dto/cat.dto';
import { CatsService } from './cats.service';

import { UploadFile } from './dto/file.dto';

const filesConfigs = {
	storage: diskStorage({
		destination(request, file, cb) {
			cb(null, 'public');
		},
		filename(request, file, cb) {
			const parts = file.mimetype.split('/');
			const extension = parts[parts.length - 1];
			const randomName = Date.now();

			cb(null, `${randomName}.${extension}`);
		},
	}),
};

@ApiTags('cats')
@Roles('user', 'admin', 'superadmin')
@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Post()
	@ApiOperation({ summary: 'Create cat' })
	@UsePipes(new JoiValidationPipe(postSchema))
	async create(@Body() createCatDto: CreateCat): Promise<ICat> {
		return this.catsService.create(createCatDto);
	}

	@Post('file')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Cat picture',
		type: UploadFile,
	})
	@UseInterceptors(FilesInterceptor('cat_pic', 2, filesConfigs))
	async postFile(@UploadedFiles() files): Promise<string> {
		return 'OK';
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
