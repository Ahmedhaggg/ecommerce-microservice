import mongoose from "mongoose";
import { Product } from "../types/product.type";
const productSchema = new mongoose.Schema<Product>({}, { strict: false });

export default mongoose.model("products", productSchema);

/**
 * product schema
 * ...fields
 *
 */
