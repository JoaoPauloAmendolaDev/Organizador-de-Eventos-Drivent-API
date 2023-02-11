import { prisma } from "@/config";

async function makeAReserve(roomId: number, userId: number){
        return await prisma.booking.create({
            data: {
                userId: userId,
                roomId: roomId
            }
        })
}

async function updateRoomCapacity(roomId: number, capacity: number){
    return await prisma.room.update({
        where: {
            id: roomId
        },
        data: {
            capacity: {set: capacity - 1} 
        }
    })
}

const bookingRepository = {
    makeAReserve,
    updateRoomCapacity
}

export default bookingRepository