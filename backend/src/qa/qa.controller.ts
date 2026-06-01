import { Controller, Post, Get, Query, Body, Param } from '@nestjs/common';
import { QAService } from './qa.service';
import { QACategory, QAStatus } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('问答')
@Controller('qa')
export class QAController {
  constructor(private qaService: QAService) {}

  @Post('questions')
  async createQuestion(
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('category') category: QACategory,
  ) {
    return this.qaService.createQuestion(userId, title, content, category);
  }

  @Get('questions')
  async getQuestions(
    @Query('category') category?: QACategory,
    @Query('status') status?: QAStatus,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.qaService.getQuestions(
      category,
      status,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get('questions/:id')
  async getQuestion(@Param('id') id: string) {
    return this.qaService.getQuestion(id);
  }

  @Post('answers')
  async createAnswer(
    @Body('questionId') questionId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
    @Body('isExpert') isExpert?: boolean,
  ) {
    return this.qaService.createAnswer(questionId, userId, content, isExpert);
  }
}