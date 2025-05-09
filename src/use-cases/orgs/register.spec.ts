import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";
import { RegisterUseCase } from "./register.";

describe("Register Org Use Case", () => {
  let orgsRepository: OrgsRepository;
  let sut: RegisterUseCase;
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it("should be able to register", async () => {
    const { org } = await sut.execute({
      name: "Jhon Doe",
      email: "teste@gmail.com",
      password: "123456",
      latitude: -21.271671,
      longitude: -47.303047,
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { org } = await sut.execute({
      name: "Jhon Doe",
      email: "teste@gmail.com",
      password: "teste",
      latitude: -21.271671,
      longitude: -47.303047,
    });

    const isPasswordCorrectlyHashed = await compare("teste", org.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Jhon Doe",
      email,
      password: "123456",
      latitude: -21.271671,
      longitude: -47.303047,
    });

    await expect(
      async () =>
        await sut.execute({
          name: "Jhon Doe",
          email,
          password: "123456",
          latitude: -21.271671,
          longitude: -47.303047,
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
