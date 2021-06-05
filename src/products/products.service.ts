import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

//interface
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    //importing the model
    products: Product[] = [];

    //inject Product models
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {

    }

    async insertProduct(title: string, description: string, price: number) {
        //const prodId = uuidv4();
        const newProduct = new this.productModel({ title, price, description });
        //this.products.push(newProduct);
        const result = await newProduct.save();
        //to display what type we are returning
        return result.id as string;
    }

    async getProducts() {
        //be careful returning the object, it is better to return a copy of the array
        //return [...this.products];

        // if we use .exec we are doing a real promise here
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getSingleProduct(productId: string) {
        // const product = this.products.find(prod => prod.id === productId);
        const product = await this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Couldn`t find product');
        }
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, description: string, price: number) {
        // const [product, index] = this.findProduct(productId);
        // const updatedProduct = { ...product };
        // console.log('updatedProduct: ', updatedProduct);
        // console.log(`${productId} ${title} ${description} ${price} `);
        const updatedProduct = await this.findProduct(productId);
        //validate if we are receiving null values
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }

        try {
            await updatedProduct.save();
            return { message: 'updated successfully' }
        } catch (error) {
            return { message: `there was an error while saving ${error} ` }

        }
    }



    async deleteProduct(prodId: string) {
        //getting the second index that findProduct returns
        //const index = this.findProduct(prodId)[1];
        //remove 1 element
        // this.products.splice(index, 1);

        try {
            const result = await this.productModel.deleteOne({
                _id: prodId
            }).exec();

            if (result.n == 0) {
                throw new NotFoundException('Product not deleted because couldn`t find it in the DB');
            }
            return { message: 'deleted successfully' }

        } catch (error) {
            return {
                message: `there was an error while deleting ${prodId} `,
                error: error
            }

        }

    }


    private async findProduct(id: string): Promise<Product> {
        // const index = this.products.findIndex(prod => prod.id === id);
        // const product = this.products[index];
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('error: ', error);
        }
        if (!product) {
            throw new NotFoundException('Couldn`t find product');
        }

        return product;
    }




}