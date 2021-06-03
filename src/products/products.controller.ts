import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Post()
    addProduct(
        // @Body() completeBody: { title: string, },
        @Body('title') prodTitle: string,
        @Body('description') prodDescription,
        @Body('price') prodPrice): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return { id: generatedId }
    }


    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    /* 
        if we have 2 methods in the same controller with the same decorator, only one will 
        be executed
    */
    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }


    @Patch(':id')
    updateProduct(
        //the param will be passed on the url
        @Param('id') prodId: string,
        //body is going to be passed as a raw json
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number) {

        this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
        return null;

    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.deleteProduct(prodId);
        return null;
    }




}