import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './modules/orders/controller/orders.controller';
import { OrdersModule } from './modules/orders/module/orders.module';
import { OrdersService } from './modules/orders/service/orders.service';
import { UsersController } from './modules/users/controller/users.controller';
import { UsersModule } from './modules/users/module/users.module';
import { UsersService } from './modules/users/service/users.service';
import { CustomersController } from './modules/customers/controller/customers.controller';
import { CustomersModule } from './modules/customers/module/customers.module';
import { CustomersService } from './modules/customers/service/customers.service';
import { CategoriesController } from './modules/categories/controller/categories.controller';
import { CategoriesModule } from './modules/categories/module/categories.module';
import { CategoriesService } from './modules/categories/service/categories.service';
import { ProductsController } from './modules/products/controller/products.controller';
import { ProductsModule } from './modules/products/module/products.module';
import { ProductsService } from './modules/products/service/products.service';
import { BrandsController } from './modules/brands/controller/brands.controller';
import { BrandsModule } from './modules/brands/module/brands.module';
import { BrandsService } from './modules/brands/service/brands.service';

@Module({
  imports: [
    OrdersModule,
    UsersModule,
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    BrandsModule,
  ],
  controllers: [
    AppController,
    OrdersController,
    UsersController,
    CustomersController,
    CategoriesController,
    ProductsController,
    BrandsController,
  ],
  providers: [
    AppService,
    OrdersService,
    UsersService,
    CustomersService,
    CategoriesService,
    ProductsService,
    BrandsService,
  ],
})
export class AppModule {}
