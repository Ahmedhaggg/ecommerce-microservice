import { inject, injectable } from "inversify";
import { IMessageProducer } from "./interface";
import { Kafka, Producer } from "kafkajs";
import { TYPES } from "../../config/iocContainer";

@injectable()
export class MessageProducer implements IMessageProducer {
	private producer!: Producer;

	constructor(@inject(TYPES.Kafka) private readonly kafka: Kafka) {}

	public async initProducer(): Promise<void> {
		this.producer = this.kafka.producer();
		await this.producer.connect();
	}

	public async publish<T>(topic: string, message: T): Promise<void> {
		const res = await this.producer.send({
			topic,
			messages: [{ value: JSON.stringify(message) }],
		});
		console.log(res);
	}
}
