import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/schema";
import prisma from "@/prisma/client";
import { title } from "process";

interface Props{
    params: {id: string}
}

export async function PATCH(request: NextRequest, {params: {id}}: Props){

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