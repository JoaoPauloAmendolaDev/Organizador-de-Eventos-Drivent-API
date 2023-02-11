import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Booking } from "@prisma/client";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { roomId } = req.body
    const { userId } = req

    try {
        const getRoomId = await bookingService.getRoomById(roomId, userId)
        return res.status(httpStatus.OK).send(getRoomId)
    } catch (error) {
        if(error.name === "Forbidden") return res.sendStatus(httpStatus.FORBIDDEN)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}