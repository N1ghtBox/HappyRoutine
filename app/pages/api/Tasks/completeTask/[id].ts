import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PUT') {
        res.status(405)
        return

    }

    let session = await getSession({req})
    if(!session){
        res.status(401)
        res.end()
    }
    let { id } = req.query
    if(Array.isArray(id)) id = id.join('')
    let task = await prisma.tasks.update({
        where:{
            id: id
        },
        data:{
            done: true
        }
    })
    .catch((e)=>{
        res.status(400)
        res.statusMessage = 'Coś poszło nie tak'
        res.end()
        return

    })

    if(!task){
        res.status(400)
        res.statusMessage = 'Zadanie o podanym Id nie istnieje'
        res.end()
        return
    }

    prisma.$disconnect()
    res.status(200)
    res.end()
    return

}
