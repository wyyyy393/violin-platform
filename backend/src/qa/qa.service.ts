import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QACategory, QAStatus } from '@prisma/client';

@Injectable()
export class QAService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(userId: string, title: string, content: string, category: QACategory) {
    return this.prisma.question.create({
      data: { userId, title, content, category },
      include: { user: { select: { id: true, nickname: true } } },
    });
  }

  async getQuestions(category?: QACategory, status?: QAStatus, page = 1, limit = 20) {
    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const [questions, total] = await Promise.all([
      this.prisma.question.findMany({
        where,
        include: {
          user: { select: { id: true, nickname: true } },
          answers: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.count({ where }),
    ]);

    return { questions, total, page, limit };
  }

  async createAnswer(questionId: string, userId: string, content: string, isExpert = false) {
    await this.prisma.question.update({
      where: { id: questionId },
      data: { status: 'ANSWERED' },
    });

    return this.prisma.answer.create({
      data: { questionId, userId, content, isExpert },
      include: { user: { select: { id: true, nickname: true } } },
    });
  }

  async getQuestion(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, nickname: true } },
        answers: { include: { user: { select: { id: true, nickname: true } } } },
      },
    });
  }
}