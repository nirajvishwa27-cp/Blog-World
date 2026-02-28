import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, MinLength } from 'class-validator';

interface AuthRequest {
  user: { id: string; email: string };
}

class CommentDto {
  @IsString()
  @MinLength(1)
  content: string;
}

@Controller('blogs')  // ← NO class-level guard
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: AuthRequest, @Body() dto: CreateBlogDto) {
    return this.blogsService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMy(@Request() req: AuthRequest) {
    return this.blogsService.findMyBlogs(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req: AuthRequest, @Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.blogsService.remove(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.blogsService.like(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlike(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.blogsService.unlike(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(@Request() req: AuthRequest, @Param('id') id: string, @Body() dto: CommentDto) {
    return this.blogsService.addComment(req.user.id, id, dto.content);
  }

  // ← NO guard — public can read comments
  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.blogsService.getComments(id);
  }
}
