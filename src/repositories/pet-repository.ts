import { Pet, Prisma } from "prisma/generated/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
