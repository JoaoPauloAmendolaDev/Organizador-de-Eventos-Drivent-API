import { ForbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";
import httpStatus, { FORBIDDEN } from "http-status";

async function getRoomById(roomId: number, userId: number){
    if(!roomId || !userId) throw notFoundError()
    
    const getRoomById = await roomRepository.getRoomById(roomId)
    const findEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    const verifyIfTokenIsPaid = await ticketRepository.findTicketByEnrollmentId(findEnrollmentByUserId.id)
    const verifyIfHotelIsNotOnline = await ticketRepository.findTicketTypeByTicketId(verifyIfTokenIsPaid.ticketTypeId)

    if(!getRoomById) throw notFoundError()
    if(verifyIfTokenIsPaid.status === "RESERVED" || verifyIfHotelIsNotOnline.isRemote === true || verifyIfHotelIsNotOnline.includesHotel === false ) throw ForbiddenError()
    if(getRoomById.capacity < 1) throw ForbiddenError()

    const reserveData = await bookingRepository.makeAReserve(roomId, userId)
    const updateRoomCapacity = await bookingRepository.updateRoomCapacity(roomId, getRoomById.capacity)
    return reserveData
}

const bookingService = {
    getRoomById
}

export default bookingService