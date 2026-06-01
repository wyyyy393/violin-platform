import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('评价')
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  async createReview(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('rating') rating: number,
    @Body('content') content: string,
  ) {
    return this.reviewService.createReview(userId, productId, rating, content);
  }

  @Get()
  async getProductReviews(
    @Query('productId') productId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewService.getProductReviews(
      productId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }
}