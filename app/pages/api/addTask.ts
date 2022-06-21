import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        res.status(405)
        res.end()
    }
    let session = await getSession({req})
    if(!session){
        res.status(401)
        res.end()
    }
    delete req.body.id;
    await prisma.tasks.create({data:{...req.body}})
    .then(async ()=>{
        await prisma.$disconnect()
        res.status(204)
        res.end()
    })
    .catch((e)=>{
        res.status(400)
        res.statusMessage = 'Coś poszło nie tak'
        res.end()
    })

}