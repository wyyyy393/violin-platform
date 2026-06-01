import { Module } from '@nestjs/common';
import { QAService } from './qa.service';
import { QAController } from './qa.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [QAService],
  controllers: [QAController],
})
export class QAModule {}