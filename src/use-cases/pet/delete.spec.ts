import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { Delete } from "./delete";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

describe("Delete Pet Use Case", () => {
  let petsRepository: InMemoryPetRepository;
  let sut: Delete;

  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    sut = new Delete(petsRepository);
  });

  it("should be able to delete a pet", async () => {
    petsRepository.create({
      id: "pet-01",
      name: "Hecate",
      org_id: "org-1",
      birth_date: new Date(2005, 0, 20, 8, 0, 0).toISOString(),
    });

    await sut.execute("pet-01");

    expect(petsRepository.pets).toHaveLength(0);
  });

  it("should not be able to delete a non existent pet", async () => {
    await expect(() => sut.execute("pet-01")).rejects.instanceOf(
      ResourceNotFoundError,
    );
  });
});
