import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    //connection for database: nestjs_db
    MongooseModule.forRoot('mongodb+srv://backend_api_user:Leicam2021@node-rest-eddzmaciel.v241b.mongodb.net/nestjs_db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
