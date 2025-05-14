import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search pets on a city", async () => {
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

    await prisma.pet.create({
      data: {
        name: "Hecate 1",
        org_id: org.id,
        birth_date: new Date(2005, 0, 20, 8, 0, 0),
      },
    });

    await prisma.pet.create({
      data: {
        name: "Hecate 2",
        org_id: org.id,
        birth_date: new Date(2005, 0, 20, 8, 0, 0),
      },
    });

    const anotherOrg = await prisma.org.create({
      data: {
        name: "Org 2",
        email: "org2@gmail.com",
        password_hash: "123456",
        phone: "16999999",
        cep: "1402002",
        uf: "SP",
        city: "cidade-2",
        neighborhood: "bairro",
        street: "rua",
        number: "10000",
      },
    });

    await prisma.pet.create({
      data: {
        name: "Thor",
        org_id: anotherOrg.id,
        birth_date: new Date(2005, 0, 20, 8, 0, 0),
      },
    });

    const response = await request(app.server)
      .get(`/pets`)
      .query({
        city: "cidade-1",
      })
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "Hecate 1",
      }),
      expect.objectContaining({
        name: "Hecate 2",
      }),
    ]);
  });
});
