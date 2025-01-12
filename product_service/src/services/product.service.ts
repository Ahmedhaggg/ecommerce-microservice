import { IProductRepository } from "../interfaces/product.repository.interface";
import { Product } from "../model/product.model";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
	constructor(private readonly repository: IProductRepository) {}

	async createProduct(data: Partial<Product>): Promise<Product> {
		return await this.repository.create(data);
	}

	async getProducts(limit: number, skip: number = 0): Promise<Product[]> {
		return await this.repository.find(limit, skip);
	}

	async getProductById(id: string): Promise<Product> {}

	async updateProductById(
		id: string,
		data: Partial<Product>
	): Promise<Product> {}

	async deleteProductById(id: string): Promise<boolean> {}
}
