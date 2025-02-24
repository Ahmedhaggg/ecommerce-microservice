import { injectable, inject } from "inversify";
import { Kafka } from "kafkajs";
import { TYPES } from "../../config/iocContainer";
import { ITopicManager } from "./interface";

@injectable()
export class TopicManager implements ITopicManager {
	constructor(@inject(TYPES.Kafka) private readonly kafka: Kafka) {}

	public async initTopic(topic: string): Promise<void> {
		const topics = await this.kafka.admin().listTopics();
		if (!topics.includes(topic)) {
			await this.kafka.admin().createTopics({
				topics: [{ topic }],
			});
		}
	}
}
