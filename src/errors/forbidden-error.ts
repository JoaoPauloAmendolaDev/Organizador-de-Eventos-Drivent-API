import { ApplicationError } from "@/protocols";

export function ForbiddenError(): ApplicationError {
  return {
    name: "Forbidden",
    message: "You're not allowed to do that",
  };
}
