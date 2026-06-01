import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('订单')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body('buyerId') buyerId: string,
    @Body('items') items: { productId: string; price: number }[],
  ) {
    return this.orderService.createOrder(buyerId, items);
  }

  @Get()
  async getOrders(
    @Query('buyerId') buyerId: string,
    @Query('status') status?: string,
  ) {
    return this.orderService.getOrders(buyerId, status);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }
}