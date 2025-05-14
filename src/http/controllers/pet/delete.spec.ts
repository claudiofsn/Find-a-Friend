import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Delete Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a pet", async () => {
    const org = await prisma.org.create({
      data: {
        name: "Org 1",
        email: "org@gmail.com",
        password_hash: "123456",
        phone: "16999999",
        cep: "1402002",
        uf: "SP",
        city: "cidade-1",
        neighborhood: "bairro",
        street: "rua",
        number: "10000",
      },
    });

    const pet = await prisma.pet.create({
      data: {
        name: "Hecate 1",
        org_id: org.id,
        birth_date: new Date(2005, 0, 20, 8, 0, 0),
      },
    });

    const response = await request(app.server).delete(`/pets/${pet.id}`).send();
    expect(response.statusCode).toEqual(204);

    const pets = await prisma.pet.findMany();
    expect(pets).toHaveLength(0);
  });
});
