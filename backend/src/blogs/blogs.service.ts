import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

function slugify(title: string): string {
  return (
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') +
    '-' +
    Date.now()
  );
}

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBlogDto) {
    const slug = slugify(dto.title);
    return this.prisma.blog.create({
      data: { ...dto, slug, userId },
    });
  }

  async findMyBlogs(userId: string) {
    return this.prisma.blog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { likes: true, comments: true } } },
    });
  }

  async update(userId: string, blogId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.userId !== userId) throw new ForbiddenException('Not your blog');

    return this.prisma.blog.update({ where: { id: blogId }, data: dto });
  }

  async remove(userId: string, blogId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');
    if (blog.userId !== userId) throw new ForbiddenException('Not your blog');

    await this.prisma.blog.delete({ where: { id: blogId } });
    return { message: 'Blog deleted' };
  }

  async like(userId: string, blogId: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');

    await this.prisma.like.upsert({
      where: { userId_blogId: { userId, blogId } },
      create: { userId, blogId },
      update: {},
    });

    const count = await this.prisma.like.count({ where: { blogId } });
    return { likes: count };
  }

  async unlike(userId: string, blogId: string) {
    await this.prisma.like.deleteMany({ where: { userId, blogId } });
    const count = await this.prisma.like.count({ where: { blogId } });
    return { likes: count };
  }

  async addComment(userId: string, blogId: string, content: string) {
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('Blog not found');

    return this.prisma.comment.create({
      data: { userId, blogId, content },
      include: { user: { select: { email: true } } },
    });
  }

  async getComments(blogId: string) {
    return this.prisma.comment.findMany({
      where: { blogId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } },
    });
  }
}