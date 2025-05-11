import { Prisma, Pet } from "prisma/generated/client";
import { PetRepository } from "../pet-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async search(params: { city: string; page: number }): Promise<Pet[]> {
    const { city, page } = params;

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
      },
      include: {
        org: true,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return pets;
  }

  async getById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    if (!pet) {
      return null;
    }

    return pet;
  }
}
