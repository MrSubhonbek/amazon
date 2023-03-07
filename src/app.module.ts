import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config/dist'

import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
