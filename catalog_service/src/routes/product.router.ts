import { Router } from "express";
import { container, TYPES } from "../config/iocContainer";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const controller = container.get<ProductController>(TYPES.ProductController);

router.get("/", controller.index.bind(controller));
router.post("/", controller.create.bind(controller));

export default router;
