import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405)
        res.end()
    }
    let session = await getSession({req})
    if(!session){
        res.status(401)
        res.end()
    }
    let result = await prisma.tasks.findMany({where:{userId: (session!.user as any).id}})
    await prisma.$disconnect()
    res.status(200).send(JSON.stringify(result))
    res.end()
}