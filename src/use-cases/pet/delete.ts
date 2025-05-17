import { PetRepository } from "@/repositories/pet-repository";
import { PetBelongsToAnotherOrgError } from "../errors/pet-belongs-to-another-org-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class Delete {
  constructor(private petRepository: PetRepository) {}

  async execute({ petId, orgId }: { petId: string; orgId: string }) {
    const pet = await this.petRepository.getById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    if (pet.org_id !== orgId) {
      throw new PetBelongsToAnotherOrgError();
    }

    await this.petRepository.delete(petId);
  }
}
