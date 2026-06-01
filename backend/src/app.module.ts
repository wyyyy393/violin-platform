import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewModule } from './review/review.module';
import { MessageModule } from './message/message.module';
import { QAModule } from './qa/qa.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductModule,
    OrderModule,
    FavoriteModule,
    ReviewModule,
    MessageModule,
    QAModule,
  ],
})
export class AppModule {}