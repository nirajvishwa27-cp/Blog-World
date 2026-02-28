import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PublicService } from './public.service';

@UseGuards(ThrottlerGuard)
@Controller('public')
export class PublicController {
  constructor(private publicService: PublicService) {}

  @Get('feed')
  getFeed(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.publicService.getFeed(parseInt(page), parseInt(limit));
  }

  @Get('blogs/:slug')
  getBlog(@Param('slug') slug: string) {
    return this.publicService.getBlogBySlug(slug);
  }
}
