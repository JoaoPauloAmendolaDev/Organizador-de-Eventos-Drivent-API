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

async function getBookingData(userId: number){
    if (!userId) throw notFoundError()

    const bookingData = await bookingRepository.findReserve(userId)
    const roomData = await roomRepository.getRoomById(bookingData.roomId)
    const bookingWithRoomData = {
        id: bookingData.id,
        room: roomData
    }
    return bookingWithRoomData
}

async function updateBooking(roomId: number, userId: number, bookingId : number){
    if (!roomId || !userId || !bookingId) throw notFoundError()
    
    const findEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    const verifyIfTokenIsPaid = await ticketRepository.findTicketByEnrollmentId(findEnrollmentByUserId.id)
    const verifyIfHotelIsNotOnline = await ticketRepository.findTicketTypeByTicketId(verifyIfTokenIsPaid.ticketTypeId)

    if(verifyIfTokenIsPaid.status === "RESERVED" || verifyIfHotelIsNotOnline.isRemote === true || verifyIfHotelIsNotOnline.includesHotel === false ) throw ForbiddenError()

    const findReservedRoom = await bookingRepository.findReserve(userId)
    const RoomThatUserAre = await roomRepository.getRoomById(findReservedRoom.roomId)
    if (!RoomThatUserAre) throw notFoundError()
    
    const getNewRoomById = await roomRepository.getRoomById(roomId)

    if(getNewRoomById.capacity < 1) throw ForbiddenError()

    const removeRoomFromUser = await roomRepository.removeRoom(RoomThatUserAre.id, RoomThatUserAre.capacity)
    
    const reserveData = await bookingRepository.updateAReserve(bookingId, getNewRoomById.id)
    const updateRoomCapacity = await bookingRepository.updateRoomCapacity(roomId, getNewRoomById.capacity)

    return reserveData.id
}

const bookingService = {
    getRoomById,
    getBookingData,
    updateBooking
}

export default bookingService