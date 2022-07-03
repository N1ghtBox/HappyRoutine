import { Tasks } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PUT') {
        res.status(405)
        res.end()
        return
    }
    let session = await getSession({req})
    if(!session){
        res.status(401)
        res.end()
        return
    }

    let task:Tasks = req.body
    if(!task){
        res.status(400)
        res.statusMessage = 'Nie podano zadania'
        res.end()
        return
    }
    let updatedTask = await prisma.tasks.update({
        where:{
            id:task.id
        },
        data:{
            description:task.description,
            type:task.type
        }
        }
    )
    .catch((e)=>{
        res.status(400)
        res.statusMessage = 'Coś poszło nie tak'
        res.end()
        return
    })

    if(!updatedTask){
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
