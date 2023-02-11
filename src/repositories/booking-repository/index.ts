import { prisma } from "@/config";

async function makeAReserve(roomId: number, userId: number){
        return await prisma.booking.create({
            data: {
                userId: userId,
                roomId: roomId
            }
        })
}

async function updateAReserve(bookingId: number, roomId: number){
    return await prisma.booking.update({
        where: {
            id: bookingId
        },
        data: {
            roomId: {
                set: roomId
            }
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

async function findReserve(userId: number){
    return await prisma.booking.findFirst({
        select: {
            id: true,
            roomId: true
        },
        where: {
            userId
        }
    })
}




const bookingRepository = {
    makeAReserve,
    updateRoomCapacity,
    findReserve,
    updateAReserve
}

export default bookingRepository