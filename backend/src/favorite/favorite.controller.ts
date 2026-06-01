import { Controller, Post, Delete, Get, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('收藏')
@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return this.favoriteService.addFavorite(userId, productId);
  }

  @Delete()
  async removeFavorite(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return this.favoriteService.removeFavorite(userId, productId);
  }

  @Get()
  async getUserFavorites(@Query('userId') userId: string) {
    return this.favoriteService.getUserFavorites(userId);
  }

  @Get('check')
  async isFavorite(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
  ) {
    return { isFavorite: await this.favoriteService.isFavorite(userId, productId) };
  }
}