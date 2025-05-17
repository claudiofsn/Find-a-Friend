import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { deletePet } from "./delete";
import { profile } from "./profile";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, create);
  app.get("/pets", search);
  app.get("/pets/:petId", profile);
  app.delete("/pets/:petId", { onRequest: [verifyJWT] }, deletePet);
}
