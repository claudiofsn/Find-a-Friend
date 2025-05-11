import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  let orgsRepository: OrgsRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      name: "Org 01",
      email: "teste@gmail.com",
      cep: "cep-01",
      city: "cidade",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
      password_hash: await hash("123456", 6),
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
      name: "Org 01",
      email: "teste@gmail.com",
      cep: "cep-01",
      city: "cidade",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "teste@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
