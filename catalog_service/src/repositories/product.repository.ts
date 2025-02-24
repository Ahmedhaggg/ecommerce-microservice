import { injectable } from "inversify";
import { ProductModel } from "../models/index";
import { Product } from "../types/product.type";
import { Repository } from "./base/repository";

@injectable()
export class ProductRepository extends Repository<Product> {
	constructor() {
		super(ProductModel);
	}
}
