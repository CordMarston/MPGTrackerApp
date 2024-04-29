// import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma';
import { NextResponse} from 'next/server';

export async function POST(request: Request)
{
    const res = await request.json();
    let data = res;
    let date = new Date(data.date);
    const newLog = await prisma.logs.create({
        data: {
            car_id: parseInt(data.car_id),
            miles: parseFloat(data.miles),
            gallons: parseFloat(data.gallons),
            cost: parseFloat(data.cost),
            logDate: date.toISOString(),
            notes: data.notes
        }
    })
    return NextResponse.json({"status": "Success"});
}

export async function GET(request: Request, { params }: { params: { carId: string }})
{
    const car = await prisma.cars.findUnique({
        where: {
            id: parseInt(params.carId)
        },
        include: {
            logs: true
        }
    });
    return NextResponse.json({car});
}