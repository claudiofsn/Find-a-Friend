import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/create-and-authenticate-org";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Hecate",
        org_id: "org-1",
        birth_date: new Date(2005, 0, 20, 8, 0, 0).toISOString(),
      });

    expect(response.statusCode).toEqual(201);
  });
});
