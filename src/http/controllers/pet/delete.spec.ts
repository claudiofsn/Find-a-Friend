import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org";
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
    const { token } = await createAndAuthenticateOrg(app);

    const pet = await prisma.pet.create({
      data: {
        name: "Hecate 1",
        org_id: "org-1",
        birth_date: new Date(2005, 0, 20, 8, 0, 0),
      },
    });

    const response = await request(app.server)
      .delete(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
    const pets = await prisma.pet.findMany();
    expect(pets).toHaveLength(0);
  });
});
