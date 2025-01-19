// import { faker } from "@faker-js/faker/.";
// import { IProductRepository } from "../interfaces/product.repository.interface";
// import { ProductRepository } from "../repositories/product.repository";
// import { Product } from "../types/product.type";
// const mockProduct = (): Omit<Product, "id"> => {
// 	return {
// 		title: faker.commerce.product(),
// 		slug: faker.commerce.product(),
// 		price: faker.number.float(),
// 		description: faker.commerce.productDescription(),
// 		images: [faker.image.url()],
// 		category: {
// 			id: faker.commerce.department(),
// 			name: faker.commerce.department(),
// 			slug: faker.commerce.department(),
// 		},
// 	};
// };
// describe("ProductService", () => {
// 	let repository: IProductRepository;

// 	beforeAll(() => {
// 		repository = new ProductRepository();
// 	});

// 	describe("create", () => {
// 		it("should create product and return product", async () => {
// 			const productData = mockProduct();
// 			const newProduct = await repository.create(productData);
// 			expect(newProduct).toHaveProperty("id");
// 		});
// 	});
// });
