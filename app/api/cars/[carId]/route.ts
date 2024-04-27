// import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server'
export async function POST(request: Request)
{
    const res = await request.json();
    let data = res;
    console.log(data);
    const newLog = await prisma.logs.create({
        data: {
            car_id: parseInt(data.car_id),
            miles: parseFloat(data.miles),
            gallons: parseFloat(data.gallons),
            cost: parseFloat(data.cost),
            notes: data.notes
        }
    })
    return NextResponse.json({"Hello": "Yo"})

}
// export async function GET(request: Request)
// {
//     console.log('HIT HERE');
//     // const body = await request;
//     // const carId = parseInt(params.carId);
//     // console.log(carId);

//     // const car = await prisma.cars.findUnique({
//     //     where: {
//     //         id: carId
//     //     }
//     // });
//     return NextResponse.json({"id":1,"nickname":"Test","year":2014,"make_id":39,"model_id":655,"user_id":"clj4l47l20000o517xdgkju6j"});
// }

