import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: string, productId: string, rating: number, content: string) {
    return this.prisma.review.create({
      data: { userId, productId, rating, content },
      include: { user: { select: { id: true, nickname: true, avatar: true } } },
    });
  }

  async getProductReviews(productId: string, page = 1, limit = 10) {
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId },
        include: { user: { select: { id: true, nickname: true, avatar: true } } },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.review.count({ where: { productId } }),
    ]);

    return { reviews, total, page, limit };
  }
}