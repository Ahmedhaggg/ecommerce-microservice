import { injectable, inject } from "inversify";
import { TYPES } from "../../config/iocContainer";
import {
	IMessageBroker,
	IMessageProducer,
	IMessageConsumer,
	ITopicManager,
	ConsumerHandler,
} from "./interface";

@injectable()
export class Broker implements IMessageBroker {
	constructor(
		@inject(TYPES.MessageProducer)
		private readonly producer: IMessageProducer,
		@inject(TYPES.MessageConsumer)
		private readonly consumer: IMessageConsumer,
		@inject(TYPES.TopicManager) private readonly topicManager: ITopicManager
	) {}

	public async initProducer(): Promise<void> {
		await this.producer.initProducer();
	}

	public async initConsumer(topic: string): Promise<void> {
		await this.consumer.initConsumer(topic);
	}

	public async publish<T>(topic: string, message: T): Promise<void> {
		await this.producer.publish(topic, message);
	}

	public async subscribe<T>(
		topic: string,
		handler: ConsumerHandler<T>
	): Promise<void> {
		await this.consumer.subscribe(topic, handler);
	}

	public async initTopic(topic: string): Promise<void> {
		await this.topicManager.initTopic(topic);
	}
}
