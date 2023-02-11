import { postBooking, getBooking, updateBooking } from "@/controllers/booking-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all("/*", authenticateToken)
    .get("/", getBooking)
    .post("/", validateBody(bookingSchema), postBooking)
    .put("/:bookingId", validateBody(bookingSchema), updateBooking)

export { bookingRouter };
