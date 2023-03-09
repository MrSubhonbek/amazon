import { Controller } from '@nestjs/common';
import { PaginationsService } from './paginations.service';

@Controller('paginations')
export class PaginationsController {
  constructor(private readonly paginationsService: PaginationsService) {}
}
