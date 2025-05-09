import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { AuthenticateUseCase } from "./authenticate";

describe("Authenticate Use Case", () => {
  let orgsRepository: OrgsRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "Jhon Doe",
      email: "teste@gmail.com",
      password_hash: await hash("123456", 6),
      latitude: -21.271671,
      longitude: -47.303047,
    });

    const { org } = await sut.execute({
      email: "teste@gmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "teste@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      name: "Jhon Doe",
      email: "teste@gmail.com",
      password_hash: await hash("123456", 6),
      latitude: -21.271671,
      longitude: -47.303047,
    });

    await expect(() =>
      sut.execute({
        email: "teste@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
