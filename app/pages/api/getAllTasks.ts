import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        res.status(405).send({message:'Only GET requests allowed'})
        return
    }
    let session = await getSession({req})
    if(session === null){
        res.status(401)
        return
    }
    let result = await prisma.tasks.findMany({where:{userId: (session!.user as any).id}})
    await prisma.$disconnect()
    res.status(200).send(JSON.stringify(result))
    res.end()
}