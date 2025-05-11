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
      name: "Org 01",
      email: "teste@gmail.com",
      password: "123456",
      cep: "cep-01",
      city: "cidade",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { org } = await sut.execute({
      name: "Org 01",
      email: "teste@gmail.com",
      password: "123456",
      cep: "cep-01",
      city: "cidade",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Org 01",
      email,
      password: "123456",
      cep: "cep-01",
      city: "cidade",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
    });

    await expect(
      async () =>
        await sut.execute({
          name: "Org 01",
          email,
          password: "123456",
          cep: "cep-01",
          city: "cidade",
          neighborhood: "bairro-01",
          number: "s/n",
          phone: "16999999",
          street: "rua-01",
          uf: "bairro-01",
        }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
