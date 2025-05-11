import { beforeEach, describe, expect, it } from "vitest";
import { PetRepository } from "@/repositories/pet-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { GetPetProfileUseCase } from "./get-pet-details";

describe("Get Pet Profile Use Case", () => {
  let petsRepository: PetRepository;
  let sut: GetPetProfileUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    sut = new GetPetProfileUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const petCreated = await petsRepository.create({
      name: "Hecate",
      org_id: "org-01",
    });

    const { pet } = await sut.execute({ id: petCreated.id });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual(expect.any(String));
  });
});
