import {
	Controller,
	Param,
	UsePipes,
	Body,
	HttpCode,
	ValidationPipe,
	Get,
	Put,
	Patch,
} from '@nestjs/common'

import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.usersService.byId(id)
	}
	@UsePipes(new ValidationPipe())
	@Auth()
	@HttpCode(200)
	@Put('profile')
	async getNewToken(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.usersService.updateProfile(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Patch('profile/favorite/:productId')
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string,
	) {
		return this.usersService.toggleFavorite(id, +productId)
	}
}
