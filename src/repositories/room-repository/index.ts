import { prisma } from "@/config";

async function getRoomById(id: number){
    return prisma.room.findFirst({
        where: {
            id
        }
    })
}

const roomRepository = {
    getRoomById
}

export default roomRepository