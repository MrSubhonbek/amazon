import { Module } from '@nestjs/common'
import { PaginationsService } from './paginations.service'
import { PaginationsController } from './paginations.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [PaginationsController],
	providers: [PaginationsService, PrismaService],
})
export class PaginationsModule {}
