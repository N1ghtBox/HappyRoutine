import { TaskType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PUT') {
        res.status(405)
        return

    }
    if(req.headers.authorization && req.headers.authorization !== process.env.UPDATE_KEY){
        res.status(401)
        return

    }
    let { type } = req.query
    if(Array.isArray(type)) type = type.join('')
    if(!Object.keys(TaskType).includes(type)){
        res.status(400)
        res.statusMessage = 'Podany typ nie znajduje się w dozwolonych typach'
        return

    }
    await prisma.tasks.updateMany({
        where:{
            type: type as any
        },
        data:{
            done: false
        }
    })
    .catch((e)=>{
        res.status(400)
        res.statusMessage = 'Coś poszło nie tak'
        return

    })

    await prisma.user.updateMany(getBodyForRequest(type))

    prisma.$disconnect()
    res.status(200)
    return

}

function getBodyForRequest(type: string):any{
    if(type === 'daily') return {data:{doneDaily: false}}
    if(type === 'weekly') return {data:{doneWeekly: false}}
    if(type === 'monthly') return {data:{doneMonthly: false}}
    return {data:{doneYearly: false}}
}