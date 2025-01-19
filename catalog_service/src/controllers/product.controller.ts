import { inject, injectable } from "inversify";
import { TYPES } from "../config/iocContainer";
import { NextFunction, Request, Response } from "express";
import { HTTPStatusCode } from "../utils/errorHandlers/httpStatusCode";
import { IProductService } from "../interfaces/product.service.interface";

@injectable()
export class ProductController {
	private productService: IProductService;
	constructor(@inject(TYPES.ProductService) service: IProductService) {
		this.productService = service;
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const newProduct = await this.productService.createProduct(req.body);
		res.status(HTTPStatusCode.Created).json({
			product: newProduct,
		});
	}

	async index(req: Request, res: Response, next: NextFunction) {
		const products = await this.productService.getProducts({});
		res.status(HTTPStatusCode.Ok).json({
			products,
		});
	}
}
