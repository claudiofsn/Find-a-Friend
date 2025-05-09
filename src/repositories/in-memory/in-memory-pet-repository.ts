import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetRepository } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      birth_date: data.birth_date ? new Date(data.birth_date) : null,
      size: data.size,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
