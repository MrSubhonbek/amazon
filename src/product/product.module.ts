import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { PrismaService } from 'src/prisma.service'
import { PaginationsService } from 'src/paginations/paginations.service'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService, PaginationsService],
})
export class ProductModule {}
