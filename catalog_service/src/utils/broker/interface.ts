export type ConsumerHandler<T> = (message: T) => Promise<void>;

export interface IKafkaConfig {
	clientId: string;
	brokers: string[];
	logLevel: number;
}

export interface IMessageProducer {
	initProducer(): Promise<void>;
	publish<T>(topic: string, message: T): Promise<void>;
}

export interface IMessageConsumer {
	initConsumer(topic: string): Promise<void>;
	subscribe<T>(topic: string, handler: ConsumerHandler<T>): Promise<void>;
}

export interface ITopicManager {
	initTopic(topic: string): Promise<void>;
}

export interface IMessageBroker
	extends IMessageProducer,
		IMessageConsumer,
		ITopicManager {}
