import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config/dist'

import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
