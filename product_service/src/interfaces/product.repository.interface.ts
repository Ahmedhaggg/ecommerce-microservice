import { Product } from "../model/product.model";

export interface IProductRepository {
	find(limit: number, skip: number): Promise<Product[]>;
	findById(id: string): Promise<Product>;
	create(data: Partial<Product>): Promise<Product>;
	updateById(id: string, data: Partial<Product>): Promise<Product>;
	deleteById(id: string): Promise<boolean>;
}
