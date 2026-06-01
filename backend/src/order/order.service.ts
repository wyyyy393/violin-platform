import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(buyerId: string, items: { productId: string; price: number }[]) {
    const orderNo = `ORD${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const order = await this.prisma.order.create({
      data: {
        orderNo,
        buyerId,
        totalAmount,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    await this.prisma.product.updateMany({
      where: { id: { in: items.map(i => i.productId) } },
      data: { status: 'RESERVED' },
    });

    return order;
  }

  async getOrders(buyerId: string, status?: string) {
    const where: any = { buyerId };
    if (status) where.status = status;
    
    return this.prisma.order.findMany({
      where,
      include: { items: { include: { product: { include: { images: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}