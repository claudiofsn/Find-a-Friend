import { Pet, Prisma } from "prisma/generated/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  search(params: { city: string; page: number }): Promise<Pet[]>;
  getById(id: string): Promise<Pet | null>;
}
