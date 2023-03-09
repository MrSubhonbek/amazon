import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config/dist'

import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticsModule } from './statistics/statistics.module';
import { PaginationsModule } from './paginations/paginations.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProductModule, ReviewModule, CategoryModule, OrderModule, StatisticsModule, PaginationsModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
