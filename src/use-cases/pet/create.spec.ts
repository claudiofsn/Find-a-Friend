import { beforeEach, describe, expect, it } from "vitest";
import { PetRepository } from "@/repositories/pet-repository";
import { CreatePetUseCase } from "./create";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";

describe("Create Pet Use Case", () => {
  let petsRepository: PetRepository;
  let sut: CreatePetUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      name: "Hecate",
      org_id: "org-1",
      size: 1.2,
      birth_date: new Date(2005, 0, 20, 8, 0, 0),
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
