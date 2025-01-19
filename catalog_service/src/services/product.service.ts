import { inject, injectable } from "inversify";
import { FindParams } from "../repositories/base/repository";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../types/product.type";
import { TYPES } from "../config/iocContainer";
import { IProductService } from "../interfaces/product.service.interface";

@injectable()
export class ProductService implements IProductService {
	constructor(
		@inject(TYPES.ProductRepository)
		private readonly repository: ProductRepository
	) {}
	getProduct(id: string): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	updateProduct(id: string, newData: Partial<Product>): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	deleteById(id: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async createProduct(data: Partial<Product>): Promise<Product> {
		return await this.repository.create(data);
	}

	async getProducts(query: FindParams): Promise<Product[]> {
		return await this.repository.find(query);
	}

	async getProductById(id: string): Promise<Product> {
		throw new Error();
	}

	async updateProductById(
		id: string,
		data: Partial<Product>
	): Promise<Product> {
		throw new Error();
	}

	async deleteProductById(id: string): Promise<boolean> {
		return true;
	}
}
