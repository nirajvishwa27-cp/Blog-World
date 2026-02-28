import { IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

export class UpdateBlogDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}