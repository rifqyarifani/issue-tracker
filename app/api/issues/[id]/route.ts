import { schema } from "@/app/schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOption";

interface Props{
    params: {id: string}
}

export async function PATCH(request: NextRequest, {params: {id}}: Props){
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({}, {status: 401})
    }

    const body = await request.json()
    const validation = schema.safeParse(body)
    if(!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })

    if(!issue){
        return NextResponse.json({error: 'Invalid issue'}, {status: 404})
    }

    const updatedIssue = await prisma.issue.update({
        where: {id:issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue)
}

export async function DELETE(request: NextRequest, {params: {id}}: Props){
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({}, {status: 401})
    }
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })

    if(!issue){
        return NextResponse.json({error: 'Invalid issue'}, {status: 404})
    }
    
    const deletedIssue = await prisma.issue.delete({
        where: {id: issue.id}
    })

    return NextResponse.json(deletedIssue)
}