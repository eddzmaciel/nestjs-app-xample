
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//controllers
import { ProductsController } from './products.controller';

//services
import { ProductsService } from './products.service';

//schemas
import { ProductSchema } from './product.model';



@Module({
    //importing the modules that we are going to use with the schemas
    imports: [
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule { }