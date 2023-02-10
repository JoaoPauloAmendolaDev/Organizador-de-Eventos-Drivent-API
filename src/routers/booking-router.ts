import { singInPost } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter.post("/sign-in", validateBody(signInSchema), singInPost);

export { bookingRouter };
