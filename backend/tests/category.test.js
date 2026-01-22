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
		test("Should create a new category", async () => {
			const res = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });

			expect(res.statusCode).toBe(201);
		});
	});

	describe("PUT /api/v1/categories/:id", () => {
		test("Should update an existing category", async () => {
			const category = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });
			const res = await request(app)
				.put(`/api/v1/categories/${category.body.data._id}`)
				.set("Authorization", `Bearer ${token}`)
				.send({
					type: "income",
				});
			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
			expect(res.body.data.type).toBe("income");
		});
	});

	describe("PUT /api/v1/categories/archive/:id", () => {
		test("Should archive an existing category", async () => {
			const category = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });
			const res = await request(app)
				.put(`/api/v1/categories/archive/${category.body.data._id}`)
				.set("Authorization", `Bearer ${token}`)
				.send({
					isArchived: true,
				});
			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
			expect(res.body.data.isArchived).toBe(true);
		});
	});

	describe("PUT /api/v1/categories/unarchive/:id", () => {
		test("Should unarchive an existing category", async () => {
			const category = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });
			await request(app)
				.put(`/api/v1/categories/archive/${category.body.data._id}`)
				.set("Authorization", `Bearer ${token}`)
				.send({
					isArchived: true,
				});
			const res = await request(app)
				.put(`/api/v1/categories/unarchive/${category.body.data._id}`)
				.set("Authorization", `Bearer ${token}`)
				.send({
					isArchived: false,
				});
			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
			expect(res.body.data.isArchived).toBe(false);
		});
	});

	describe("DELETE /api/v1/categories/:id", () => {
		test("Should permanent-delete an existing category", async () => {
			const category = await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: `Food ${Date.now()}`, type: "expense" });
			const res = await request(app)
				.delete(`/api/v1/categories/${category.body.data._id}`)
				.set("Authorization", `Bearer ${token}`)
			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
		});
	});
});
