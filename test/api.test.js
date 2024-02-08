const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require('dotenv').config();

let token;

beforeAll(() => process.env.NODE_ENV = "test");
afterAll(async () => {
    let collections = mongoose.connection.collections;
    for(const key in collections) {
        await collections[key].deleteMany();
    }

    await mongoose.connection.close();
});

//test user registration
describe('POST /api/user/register', () => {
    it("creates a new user", async () => {
        const res = await request(app)
            .post("/api/user/register")
            .send({
                username: 'Chika3',
                phone: '0801000003',
                email: 'chika3@domain.com',
                password: '123456'
            });

        // Assert that the response status code is 200
        expect(res.statusCode).toBe(200);

        // Assert that the response body contains the expected user data
        expect(res.body.message).toBe("User successfully created.");
        expect(res.body.data.username).toBe("Chika3");
        expect(res.body.data.phone).toBe("0801000003");
        expect(res.body.data.email).toBe("chika3@domain.com");
    });
});

//test user login
describe('POST /api/user/login', () => {
    it("logs in user", async () => {
        const res = await request(app)
            .post("/api/user/login")
            .send({
                username: 'Chika3',
                password: '123456'
            });

        // Assert that the response status code is 200
        expect(res.statusCode).toBe(200);

        token = res.body.data.token;
        console.log(token);

        // Assert that the response body contains the expected user data
        expect(res.body.message).toBe("success");
        expect(res.body.data.user.username).toBe("Chika3");
        expect(res.body.data.user.phone).toBe("0801000003");
        expect(res.body.data.token).toBeTruthy();
    });
});

//test webhook callback registration
describe('GET /api/webhook?callback', () => {
    it("register callback test", async () => {
        const res = await request(app).get("/api/webhook?callback=https://oneport-webhook.com/receiver")
        .set('Authorization', `Bearer ${token}`);

        // Assert that the response status code is 200
        expect(res.statusCode).toBe(200);
        // Assert that the response body contains the expected user data
        expect(res.body.message).toBe("callback url added.");
    });
});

//test webhook callback deletion
describe('DELETE /api/webhook', () => {
    it("callback deletion test", async () => {
        const res = await request(app).delete("/api/webhook")
        .set('Authorization', `Bearer ${token}`);

        // Assert that the response status code is 200
        expect(res.statusCode).toBe(200);
        // Assert that the response body contains the expected user data
        expect(res.body.message).toBe("callback url deleted.");
    });
});

//test task creation
describe('POST /api/task', () => {
    it("creates new task", async () => {
        const res = await request(app)
            .post("/api/task")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Task test 1',
                description: 'testing task creation endpoint.',
                tag: 'test',
                priority: 'high'
            });

        // Assert that the response status code is 200
        expect(res.statusCode).toBe(200);

        // Assert that the response body contains the expected user data
        expect(res.body.message).toBe("task created.");
        expect(res.body.data.taskId).toBeTruthy();
    });
});

