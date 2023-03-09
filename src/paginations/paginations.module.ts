import { Module } from '@nestjs/common'
import { PaginationsService } from './paginations.service'

@Module({
	providers: [PaginationsService],
	exports: [PaginationsService],
})
export class PaginationsModule {}
