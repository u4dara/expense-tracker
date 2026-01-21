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

describe("Transaction CRUD Tests", () => {
	describe("GET /api/v1/transactions", () => {
		test("Should block access to protected routes without token", async () => {
			const res = await request(app).get("/api/v1/transactions");

			expect(res.statusCode).toBe(401);
			expect(res.body.success).toBe(false);
		});

		test("Should give access to protected routes with token", async () => {
			const res = await request(app)
				.get("/api/v1/transactions")
				.set("Authorization", `Bearer ${token}`);

			expect(res.statusCode).toBe(200);
			expect(res.body.success).toBe(true);
		});
	});

	describe("POST /api/v1/transactions", () => {
		test("Create a new Transaction", async () => {
         const categoryName = `Food ${Date.now()}`;
			await request(app)
				.post("/api/v1/categories")
				.set("Authorization", `Bearer ${token}`)
				.send({ name: categoryName, type: "expense" });
			const res = await request(app)
				.post("/api/v1/transactions")
				.set("Authorization", `Bearer ${token}`)
				.send({
					title: "test transaction",
					amount: "1000",
					category: categoryName,
					date: Date.now(),
				});
			expect(res.statusCode).toBe(201);
			expect(res.body.success).toBe(true);
		});
	});

	// describe("PUT /api/v1/transactions/:id", () => {
	// 	test("Update existing Transaction", async () => {
	// 		const categoryName = "test category";
	// 		const categoryType = "expense";
	// 		await createNewCategory(token, categoryName, categoryType);
	// 		const transaction = await request(app)
	// 			.post("/api/v1/transactions")
	// 			.set("Authorization", `Bearer ${token}`)
	// 			.send({
	// 				title: "test transaction",
	// 				amount: "1000",
	// 				category: categoryName,
	// 				date: Date.now(),
	// 			});
	// 		const res = await request(app)
	// 			.put(`/api/v1/transaction/${transaction.data._id}`)
	// 			.set("Authorization", `Bearer ${token}`)
	// 			.send({
	// 				title: "test transaction updated",
	// 			});
	// 		expect(res.statusCode).toBe(200);
	// 		expect(res.body.success).toBe(true);
	// 		expect(res.body.data.title).toBe("test transaction updated");
	// 	});
	// });
});
