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

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const { userId } = req

    try {
        const getBookingData = await bookingService.getBookingData(userId)
        return res.status(httpStatus.OK).send(getBookingData)
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const bookingId = parseInt(req.params.bookingId)
    const { roomId } = req.body 
    const { userId } = req

    try {
        const updatedBooking = await bookingService.updateBooking(roomId, userId, bookingId)
        return res.status(httpStatus.OK).send({id: updatedBooking})
    } catch (error) {
        if(error.name === "Forbidden") return res.sendStatus(httpStatus.FORBIDDEN)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}