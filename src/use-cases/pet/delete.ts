import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class Delete {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string) {
    const pet = await this.petRepository.getById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    await this.petRepository.delete(petId);
  }
}
