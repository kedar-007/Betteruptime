import {describe ,it,expect ,beforeAll,afterAll} from "bun:test"
import request from "supertest";
import {prismaClient} from "store/client";

// import app from the express app
import app from "../index"

// cleanup before the test

beforeAll(async () =>{
    await prismaClient.website.deleteMany({});
});

afterAll(async ()=>{
    await prismaClient.$disconnect();
});

//group of the tests

describe("Website API test",() => {
    it("POST /website - should create the website", async() =>{
        const response = await request(app).post("/website").send({url:"https://example.com"}).set("Content-Type","application/json");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Website added successfully");
        expect(response.body.website).toHaveProperty("id");
        expect(response.body.website.url).toBe("https://example.com");

    });
});
