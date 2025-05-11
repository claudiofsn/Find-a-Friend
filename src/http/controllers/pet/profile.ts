import { makeGetPetProfileUseCase } from "@/use-cases/factories/make-get-pet-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getPetProfileParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = getPetProfileParamsSchema.parse(request.params);

  const getPetProfileUseCase = makeGetPetProfileUseCase();

  const pet = await getPetProfileUseCase.execute({ id: petId });

  return reply.status(200).send({ pet });
}
