import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
    //importing the model
    products: Product[] = [];

    insertProduct(title: string, description: string, price: number): string {
        const prodId = uuidv4();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        //be careful returning the object, it is better to return a copy of the array
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.products.find(prod => prod.id === productId);
        if (!product) {
            throw new NotFoundException('Couldn`t find product');
        }
        return { ...product }
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };

        console.log('updatedProduct: ', updatedProduct);
        console.log(`${productId} ${title} ${description} ${price} `);

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
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        //getting the second index that findProduct returns
        const index = this.findProduct(prodId)[1];
        //remove 1 element
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const index = this.products.findIndex(prod => prod.id === id);
        const product = this.products[index];
        console.log(`index: ${index} Product: ${product} `);
        if (!product) {
            throw new NotFoundException('Couldn`t find product');
        }
        return [product, index];
    }


}