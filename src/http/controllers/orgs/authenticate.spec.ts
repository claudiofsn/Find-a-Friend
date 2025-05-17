import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
      name: "Org 1",
      email: "org@gmail.com",
      password: "123456",
      phone: "16999999",
      cep: "1402002",
      uf: "SP",
      city: "cidade",
      neighborhood: "bairro",
      street: "rua",
      number: "10000",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "org@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
