import { userCreateSchema } from "../schemas/user.schema";
import { FastifyTypedInstance } from "../types/FastifyTipeInstance";
import { UserUsecase } from "../usecase/user.usecase";
import { hashPassword } from "../util/hash";

export const userRoute = (app: FastifyTypedInstance) => {
  const userUseCase = new UserUsecase();
  app.post(
    "/register",
    {
      schema: {
        description: "Cria um novo usuário",
        tags: ["User"],
        body: userCreateSchema,
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body;

      if (await userUseCase.emailExists(email)) {
        return reply.code(409).send({ message: "Email already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await userUseCase.register({
        email,
        name,
        password: hashedPassword,
      });
      return reply.code(201).send(user);
    }
  );
};
