import faker from "@faker-js/faker"
import { prisma } from "@/config"

export async function createRoomWithHotelId(hotelId: number){
    return await prisma.room.create({
        data:{
            name: `${faker.datatype.number({max : 1000})}`,
            capacity: 1000,
            hotelId,
            createdAt : new Date().toISOString()
        }
    })
}