import { Repository } from "./repository";
import mongoose from "mongoose";
import "../../config/db";
type Test = {
	id?: string;
	name: string;
	password: string;
};

describe("Product Repository", () => {
	let repository: Repository<Test>;
	let createdDoc: Test;
	beforeAll(() => {
		const testModel = mongoose.model(
			"test",
			new mongoose.Schema<Test>({}, { strict: false, timestamps: true })
		);
		repository = new Repository<Test>(testModel);
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});
	it("CREATE/ should return save the document in database and return the object from entity", async () => {
		const newDocData: Test = {
			name: "test",
			password: "test",
		};
		const newDoc = await repository.create(newDocData);
		createdDoc = newDoc;
		expect(newDoc).toHaveProperty("id");
		expect(newDoc.name).toBe(newDocData.name);
		expect(newDoc.password).toBe(newDocData.password);
	});
	it("FIND/ should retrieve documents based on query", async () => {
		const docs = await repository.find({ where: { name: "test" } });
		expect(docs).toBeInstanceOf(Array);
	});

	it("FIND BY ID/ should retrieve a document by its id", async () => {
		const doc = await repository.findById(createdDoc.id!);
		expect(doc).toBeDefined();
		expect(doc.id).toBe(createdDoc.id);
		expect(doc.name).toBe(createdDoc.name);
	});

	it("UPDATE BY ID/ should update the document and return the updated document", async () => {
		const updatedData = { name: "updatedTest" };
		const updatedDoc = await repository.updateById(
			createdDoc.id!,
			updatedData
		);
		expect(updatedDoc).toBeDefined();
		expect(updatedDoc.id).toBe(createdDoc.id);
		expect(updatedDoc.name).toBe(updatedData.name);
	});

	it("DELETE BY ID/ should delete the document and return true", async () => {
		const isDeleted = await repository.deleteById(createdDoc.id!);
		expect(isDeleted).toBe(true);
	});
});
