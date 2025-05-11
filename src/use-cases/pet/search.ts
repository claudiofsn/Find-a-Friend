import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "prisma/generated/client";

interface SearchPetsUseCaseRequest {
  city: string;
  page: number;
}

interface SearchPetsUseCaseReponse {
  pets: Pet[];
}

export class SearchPets {
  constructor(private petsRepository: PetRepository) {}
  async execute(
    params: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseReponse> {
    const pets = await this.petsRepository.search(params);

    return { pets };
  }
}
