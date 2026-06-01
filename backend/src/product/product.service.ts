import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductType, ProductCondition, ProductStage } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    type,
    stage,
    minPrice,
    maxPrice,
    condition,
    search,
    page = 1,
    limit = 20,
  }: {
    type?: ProductType;
    stage?: ProductStage;
    minPrice?: number;
    maxPrice?: number;
    condition?: ProductCondition;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {
      status: 'AVAILABLE',
    };

    if (type) where.type = type;
    if (stage) where.stage = stage;
    if (condition) where.condition = condition;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (minPrice !== undefined) where.price = { gte: minPrice };
    if (maxPrice !== undefined) {
      where.price = { ...where.price, lte: maxPrice };
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          seller: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
          images: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    await this.prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
        images: true,
        reviews: {
          include: { user: { select: { id: true, nickname: true, avatar: true } } },
        },
      },
    });
  }

  async create(data: any, sellerId: string) {
    return this.prisma.product.create({
      data: {
        ...data,
        sellerId,
      },
    });
  }

  async update(id: string, data: any, sellerId: string) {
    return this.prisma.product.updateMany({
      where: { id, sellerId },
      data,
    });
  }

  async delete(id: string, sellerId: string) {
    return this.prisma.product.updateMany({
      where: { id, sellerId },
      data: { status: 'OFFLINE' },
    });
  }
}