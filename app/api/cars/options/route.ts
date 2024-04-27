import { NextResponse } from 'next/server'
// import prisma from '@/app/lib/primsa';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    const makes = await prisma.carMakes.findMany({
        include: {
            models: true,
        }
    });

    return NextResponse.json(makes);
}