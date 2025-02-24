"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./repository");
const mongoose_1 = __importDefault(require("mongoose"));
require("../../config/db");
describe("Product Repository", () => {
    let repository;
    beforeAll(() => {
        const testModel = mongoose_1.default.model("test", new mongoose_1.default.Schema({}, { strict: false, timestamps: true }));
        repository = new repository_1.Repository(testModel);
    });
    afterAll(async () => {
        await mongoose_1.default.connection.close();
    });
    it("CREATE/ should return save the document in database and return the object from entity", async () => {
        const newDocData = {
            name: "test",
            password: "test",
        };
        const newDoc = await repository.create(newDocData);
        console.log(newDoc);
        expect(newDoc).toHaveProperty("id");
        expect(newDoc.name).toBe(newDocData.name);
        expect(newDoc.password).toBe(newDocData.password);
    });
});
