import { container, TYPES } from "../../config/iocContainer";
import { Broker } from "./broker";

export enum Topics {
	PRODUCT_CREATED = "product.created",
}

const broker = container.get<Broker>(TYPES.MessageBroker);

export const init = async () => {
	await broker.initTopic(Topics.PRODUCT_CREATED);
	await broker.initProducer();
};

export { broker };
