import { IProductRepository } from "../interfaces/product.repository.interface";
import { Product } from "../model/product.model";

export class ProductRepository implements IProductRepository {
	async find(): Promise<Product[]> {
		throw new Error("Method not implemented.");
	}
	async findById(): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	async create(): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	async updateById(): Promise<Product> {
		throw new Error("Method not implemented.");
	}
	async deleteById(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
