import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

afterAll(async () => {
	await mongoose.connection.close();
});

describe("Auth API", () => {
	describe("POST /api/v1/auth/sign-up", () => {
		test("Should register a new user", async () => {
			const user = {
				name: "Test User",
				email: `test${Date.now()}@gmail.com`,
				password: "test@123",
			};
			const res = await request(app).post("/api/v1/auth/sign-up").send(user);
			expect(res.statusCode).toBe(201);
			expect(res.body.success).toBe(true);
			expect(res.body.data.email).toBe(user.email);
			expect(res.body.data.password).toBeUndefined();
		});

		test("Should not allow duplicate email", async () => {
			const user = {
				name: "Test User",
				email: `dup${Date.now()}@gmail.com`,
				password: "test@123",
			};
			await request(app).post("/api/v1/auth/sign-up").send(user);
			const res = await request(app).post("/api/v1/auth/sign-up").send(user);
			expect(res.statusCode).toBe(400);
			expect(res.body.success).toBe(false);
		});
	});
});
