import { prisma } from "@/config";

async function getRoomById(id: number){
    return prisma.room.findFirst({
        where: {
            id
        }
    })
}

async function removeRoom(roomId: number, capacity: number){
    return await prisma.room.update({
        where: {id: roomId},
        data: {capacity: {
            set: capacity - 1
        }}
    })
}

const roomRepository = {
    getRoomById,
    removeRoom
}

export default roomRepository