import mongoose, { Model } from "mongoose";

export type FindParams = {
	where?: any;
	limit?: number;
	skip?: number;
};

export class Repository<T> {
	constructor(protected model: Model<T>) {}
	async find(query: FindParams): Promise<T[]> {
		const result = await this.model.find(query.where, undefined, {
			skip: query.skip || 0,
			limit: query.limit || 10,
		});
		return this.mapArr(result);
	}

	async create(data: Partial<T>): Promise<T> {
		const result = await (await this.model.create(data)).save();
		return this.map(result);
	}

	async findById(id: string): Promise<T> {
		return this.map(await this.model.findById(id));
	}

	async updateById(id: string, newData: Partial<T>): Promise<T> {
		const UpdateResult = await this.model.updateOne(
			{ _id: this.validateId(id) },
			newData
		);

		if (UpdateResult.modifiedCount == 0) throw new Error("field to update");

		return this.findById(id);
	}
	async deleteById(id: string): Promise<boolean> {
		const result = await this.model.deleteOne({
			_id: this.validateId(id),
		});
		return result.deletedCount == 1 ? true : false;
	}
	protected map(data: any): T {
		const result = {
			...data.toObject(),
			id: data.id,
		};
		delete result._id;
		delete result.__v;
		return result;
	}
	protected mapArr(data: any[]): T[] {
		return data.map((item) => this.map(item));
	}
	protected validateId(id: string): mongoose.Types.ObjectId {
		if (!mongoose.Types.ObjectId.isValid(id))
			throw new Error(`Invalid ObjectId: ${id}`);
		return new mongoose.Types.ObjectId(id);
	}
}
