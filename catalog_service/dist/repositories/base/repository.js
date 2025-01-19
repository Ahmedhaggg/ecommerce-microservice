"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor(model) {
        this.model = model;
    }
    async find(query) {
        const result = await this.model.find(query.where, undefined, {
            skip: query.skip || 0,
            limit: query.limit || 10,
        });
        return this.mapArr(result);
    }
    async create(data) {
        const result = await (await this.model.create(data)).save();
        return this.map(result);
    }
    async findById(id) {
        return this.map(await this.model.findById(id));
    }
    async updateById(id, newData) {
        const doc = await this.model.findByIdAndUpdate(id, newData);
        return this.map(doc);
    }
    async deleteById(id) {
        const result = await this.model.deleteOne({ id });
        return result.deletedCount !== 0;
    }
    map(data) {
        const result = {
            ...data.toObject(),
            id: data.id,
        };
        delete result._id;
        delete result.__v;
        return result;
    }
    mapArr(data) {
        return data.map((item) => this.map(item));
    }
}
exports.Repository = Repository;
