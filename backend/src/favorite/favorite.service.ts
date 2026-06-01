import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: string, productId: string) {
    const favorite = await this.prisma.favorite.create({
      data: { userId, productId },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: { favoriteCount: { increment: 1 } },
    });

    return favorite;
  }

  async removeFavorite(userId: string, productId: string) {
    await this.prisma.favorite.delete({
      where: { userId_productId: { userId, productId } },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: { favoriteCount: { decrement: 1 } },
    });

    return { success: true };
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { product: { include: { images: true, seller: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async isFavorite(userId: string, productId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId } },
    });
    return !!favorite;
  }
}