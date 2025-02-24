import { FindParams } from "../repositories/base/repository";
import { Product } from "../types/product.type";

export interface IProductService {
	createProduct(data: Partial<Product>): Promise<Product>;
	getProducts(query: FindParams): Promise<Product[]>;
	getProduct(id: string): Promise<Product>;
	updateProduct(id: string, newData: Partial<Product>): Promise<Product>;
	deleteById(id: string): Promise<boolean>;
}
