import { injectable, inject } from "inversify";
import { Consumer, Kafka } from "kafkajs";
import { TYPES } from "../../config/iocContainer";
import { IMessageConsumer, ConsumerHandler } from "./interface";

@injectable()
export class MessageConsumer implements IMessageConsumer {
	private consumer!: Consumer;

	constructor(
		@inject(TYPES.Kafka) private readonly kafka: Kafka,
		@inject(TYPES.KAFKA_GROUP_ID) private readonly groupId: string
	) {}

	public async initConsumer(topic: string): Promise<void> {
		this.consumer = this.kafka.consumer({ groupId: this.groupId });
		await this.consumer.connect();
	}

	public async subscribe<T>(
		topic: string,
		handler: ConsumerHandler<T>
	): Promise<void> {
		await this.consumer.subscribe({ topic });
		await this.consumer.run({
			eachMessage: async ({ message }) => {
				const value = JSON.parse(
					message.value?.toString() || "{}"
				) as T;
				await handler(value);
			},
		});
	}
}
