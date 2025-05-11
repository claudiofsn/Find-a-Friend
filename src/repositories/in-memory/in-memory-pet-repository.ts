import { randomUUID } from "node:crypto";
import { PetRepository } from "../pet-repository";
import { Org, Pet, Prisma } from "prisma/generated/client";

export class InMemoryPetRepository implements PetRepository {
  public pets: Pet[] = [];
  public orgs: Org[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      birth_date: data.birth_date ? new Date(data.birth_date) : null,
      org_id: data.org_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async search(params: { city: string; page: number }): Promise<Pet[]> {
    const orgsIdOnCity = this.orgs
      .filter((org) => org.city === params.city)
      .map((org) => org.id);

    return this.pets
      .filter((pet) => orgsIdOnCity.includes(pet.org_id))
      .slice((params.page - 1) * 20, params.page * 20);
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
