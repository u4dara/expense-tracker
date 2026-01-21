import request from "supertest";
import app from "../app";

let token;

beforeEach(async () => {
	const res = await request(app)
		.post("/api/v1/auth/sign-up")
		.send({
			name: "Test User",
			email: `test${Date.now()}@gmail.com`,
			password: "test@123",
		});

	const login = await request(app).post("/api/v1/auth/sign-in").send({
		email: res.body.data.email,
		password: "test@123",
	});

	token = login.body.data.token;
});

describe("Category CRUD Tests", () => {
	describe("GET /api/v1/categories", () => {
		test("Should block access to protected routes without token", async () => {
			const res = await request(app).get("/api/v1/categories");

			expect(res.statusCode).toBe(401);
			expect(res.body.success).toBe(false);
		});

		test("Should give access to protected routes with token", async () => {
			const res = await request(app)
				.get("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`);

			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
		});
	});

	describe("POST /api/v1/categories", () => {
		test("Should create category", async () => {
			const res = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });

			expect(res.statusCode).toBe(201);
		});
	});
});
