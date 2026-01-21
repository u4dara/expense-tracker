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
				email: `test${Date.now()}@gmail.com`,
				password: "test@123",
			};
			await request(app).post("/api/v1/auth/sign-up").send(user);
			const res = await request(app).post("/api/v1/auth/sign-up").send(user);
			expect(res.statusCode).toBe(400);
			expect(res.body.success).toBe(false);
		});
	});

	describe("POST /api/v1/auth/sign-in", () => {
		test("Should sign-in an existing user", async () => {
			const user = {
				name: "Test User",
				email: `test${Date.now()}@gmail.com`,
				password: "test@123",
			};
			await request(app).post("/api/v1/auth/sign-up").send(user);
			const res = await request(app).post("/api/v1/auth/sign-in").send({
				email: user.email,
				password: user.password,
			});
			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
			expect(res.body.data.token).toBeDefined();
		});

		test("Should not sign-in with wrong password", async () => {
			const user = {
				name: "Test User",
				email: `test${Date.now()}@gmail.com`,
				password: "test@123",
			};
			await request(app).post("/api/v1/auth/sign-up").send(user);
			const res = await request(app).post("/api/v1/auth/sign-in").send({
				email: user.email,
				password: "test",
			});
			expect(res.statusCode).toBe(401);
			expect(res.body.success).toBe(false);
		});
	});

	describe("GET /api/v1/transactions", () => {
		test("Should block access for protected routes without token", async () => {
			const res = await request(app).get("/api/v1/transactions");

			expect(res.statusCode).toBe(401);
			expect(res.body.success).toBe(false);
		});

		test("Should give access to protected routes has token", async () => {
			const user = {
				name: "Test User",
				email: `test${Date.now()}@gmail.com`,
				password: "test@123",
			};
			await request(app).post("/api/v1/auth/sign-up").send(user);
			const loginRes = await request(app).post("/api/v1/auth/sign-in").send({
				email: user.email,
				password: user.password,
			});
			const token = loginRes.body.data.token;
			const res = await request(app)
				.get("/api/v1/transactions")
				.set("Authorization", `Bearer ${token}`);

			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
		});
	});
});
