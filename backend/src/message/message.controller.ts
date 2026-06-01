import { Controller, Post, Get, Query, Put, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageType } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('消息')
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async createMessage(
    @Query('userId') userId: string,
    @Query('content') content: string,
    @Query('type') type?: MessageType,
  ) {
    return this.messageService.createMessage(userId, content, type || 'SYSTEM');
  }

  @Get()
  async getUserMessages(@Query('userId') userId: string) {
    return this.messageService.getUserMessages(userId);
  }

  @Get('unread')
  async getUnreadCount(@Query('userId') userId: string) {
    return { count: await this.messageService.getUnreadCount(userId) };
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messageService.markAsRead(id);
  }
}