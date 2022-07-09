import { TaskType } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"

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
    let { type } = req.query
    if(!type){
        res.status(400)
        res.statusMessage = 'Podany typ nie znajduje się w dozwolonych typach'
        res.end()
        return
    }
    if(Array.isArray(type)) type = type.join('')
    if(!Object.keys(TaskType).includes(type)){
        res.status(400)
        res.statusMessage = 'Podany typ nie znajduje się w dozwolonych typach'
        res.end()
        return
    }
    prisma.user.update(getBodyForRequest(type,session.user ? (session.user as any).id : ''))
    .then(()=>{
        prisma.$disconnect()
        res.status(200)
        res.end()
        return
    }).finally(()=>{
        res.status(500)
        res.end()
        return
    })
    return
}

function getBodyForRequest(type: string, id: string):any{
    if(type === 'daily') return {where:{id: id},data:{doneDaily: true}}
    if(type === 'weekly') return {where:{id: id},data:{doneWeekly: true}}
    if(type === 'monthly') return {where:{id: id},data:{doneMonthly: true}}
    return {where:{id: id},data:{doneYearly: true}}
}