import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageType } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(userId: string, content: string, type: MessageType = 'SYSTEM') {
    return this.prisma.message.create({
      data: { userId, content, type },
    });
  }

  async getUserMessages(userId: string) {
    return this.prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(messageId: string) {
    return this.prisma.message.update({
      where: { id: messageId },
      data: { read: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.message.count({ where: { userId, read: false } });
  }
}