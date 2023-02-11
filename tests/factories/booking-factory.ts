import faker from "@faker-js/faker"
import { prisma } from "@/config"

export async function createdBooking(roomId: number, userId: number){
    return await prisma.booking.create({
        data:{
            userId,
            roomId,
        }
    })
}