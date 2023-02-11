import faker from "@faker-js/faker";
import { prisma } from "@/config";

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

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

export async function createRoomWithoutCapacity(hotelId: number){
  return await prisma.room.create({
    data:{
      name: `${faker.datatype.number({max : 1000})}`,
      capacity: 0,
      hotelId,
      createdAt : new Date().toISOString()
    }
  })
}
