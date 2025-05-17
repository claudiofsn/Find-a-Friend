import { makeDeleteUseCase } from "@/use-cases/factories/make-delete-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = deletePetParamsSchema.parse(request.params);

  const deletePetUseCase = makeDeleteUseCase();

  await deletePetUseCase.execute({ petId, orgId: request.user.sub });

  return reply.status(204).send();
}
