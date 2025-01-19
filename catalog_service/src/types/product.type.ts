export type BaseProduct = {
	id?: string;
	title: string;
	slug: string;
	price: number;
	description: string;
	images: string[];
	category: Category;
};

export type Category = {
	id: string;
	name: string;
	slug: string;
};

type ClothesSize = {
	size: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm";
	price: number;
};

type ClothesColor = {
	color: string;
	size: ClothesSize[];
};
export type ClothesProduct = BaseProduct & {
	colors: ClothesColor[];
};

export type ElectronicsProduct = BaseProduct & {
	warrantyPeriod: number;
};

export type Product = ClothesProduct | ElectronicsProduct;
