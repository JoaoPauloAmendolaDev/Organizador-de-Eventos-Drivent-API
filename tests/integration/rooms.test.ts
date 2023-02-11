import { prisma } from "@/config";
import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import supertest from "supertest";

beforeAll(async () => {
    await init()
})

beforeEach(async () => {
    await cleanDb()
})

const server = supertest(app)
