import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { SearchPets } from "./search";

describe("Search Pets Use Case", () => {
  let petsRepository: InMemoryPetRepository;
  let sut: SearchPets;

  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    sut = new SearchPets(petsRepository);
  });

  it("should be able to the pets on a city", async () => {
    petsRepository.orgs.push({
      id: "org-01",
      name: "Org 01",
      email: "teste@gmail.com",
      password_hash: "123456",
      cep: "cep-01",
      city: "cidade-01",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
    });

    petsRepository.orgs.push({
      id: "org-02",
      name: "Org 02",
      email: "teste@gmail.com",
      password_hash: "123456",
      cep: "cep-02",
      city: "cidade-02",
      neighborhood: "bairro-02",
      number: "s/n",
      phone: "16999999",
      street: "rua-02",
      uf: "bairro-02",
    });

    await petsRepository.create({
      name: "Hecate",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Hecate",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Hecate",
      org_id: "org-02",
    });

    const { pets } = await sut.execute({
      city: "cidade-01",
      page: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ org_id: "org-01" }),
      expect.objectContaining({ org_id: "org-01" }),
    ]);
  });

  it("should be able to fetch paginated pets search", async () => {
    petsRepository.orgs.push({
      id: "org-01",
      name: "Org 01",
      email: "teste@gmail.com",
      password_hash: "123456",
      cep: "cep-01",
      city: "cidade-01",
      neighborhood: "bairro-01",
      number: "s/n",
      phone: "16999999",
      street: "rua-01",
      uf: "bairro-01",
    });

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        id: `${i}`,
        name: "Hecate",
        org_id: "org-01",
      });
    }

    const { pets } = await sut.execute({
      city: "cidade-01",
      page: 2,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "21" }),
      expect.objectContaining({ id: "22" }),
    ]);
  });
});
