import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../schema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOption";

export async function POST(request: NextRequest){
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({}, {status: 401})
    }
    
    const body = await request.json()
    const validation = schema.safeParse(body)
    if(!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(newIssue, {status: 201})
}

export async function GET(request: NextRequest){
    const issue = await prisma.issue.findMany()
    return NextResponse.json(issue, {status: 200})
}