import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/app/lib/auth';

export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json();
    let data = res;
    data.user_id = session?.user?.id;

    const newCar = await prisma.cars.create({
        data: {
            nickname: data.nickname,
            year: parseInt(data.year),
            make_id: parseInt(data.make_id),
            model_id: parseInt(data.model_id),
            user_id: data.user_id
        }
    })

    return NextResponse.json({ newCar });
}

export async function GET(request: Request)
{

    const body = await request.json();

    const car = await prisma.cars.findUnique({
        where: {
            id: 1
        }
    });

    return NextResponse.json({ car });
}