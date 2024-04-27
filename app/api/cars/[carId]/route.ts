// import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server'
export async function POST(request: Request)
{
    const res = await request.json();
    let data = res;
    const newLog = await prisma.logs.create({
        data: {
            car_id: parseInt(data.car_id),
            miles: parseFloat(data.miles),
            gallons: parseFloat(data.gallons),
            cost: parseFloat(data.cost),
            notes: data.notes
        }
    })
    return NextResponse.json({"status": "Success"});
}

export async function GET(request: Request)
{
    const res = await request.json();
    let data = res;
    const car = prisma.cars.findUnique({
        where: {
            id: parseInt(data.car_id)
        },
        include: {
            logs: true
        }
    });
    return NextResponse.json({car});
}