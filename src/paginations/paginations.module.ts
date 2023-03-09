import { Module } from '@nestjs/common';
import { PaginationsService } from './paginations.service';
import { PaginationsController } from './paginations.controller';

@Module({
  controllers: [PaginationsController],
  providers: [PaginationsService]
})
export class PaginationsModule {}
