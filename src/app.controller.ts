import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //
  // @Get('new')
  // newEndpoint(): string {
  //   return 'Endpoint nuevo';
  // }
  //
  // @Get('products')
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 10,
  //   @Query('brand') brand: string,
  // ): string {
  //   return `Productos limit = ${limit} | offset = ${offset} | brand = ${brand}`;
  // }
  //
  // @Get('products/:id')
  // getProduct(@Param('id') id: string): string {
  //   return `Producto con id ${id}`;
  // }
  //
  // @Get('categories/:id/products/:productId')
  // getCategory(
  //   @Param('id') id: string,
  //   @Param('productId') productId: string,
  // ): string {
  //   return `Categoria con id ${id} y producto con id ${productId}`;
  // }
}
