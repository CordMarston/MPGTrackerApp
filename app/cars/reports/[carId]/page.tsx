// 'use client';
import { prisma } from "@/app/lib/prisma";

async function getCar(carId:number) {
    const car = await prisma.cars.findUnique({
        where: {
            id: carId
        },
        include: {
            logs: true
        }
    });
    return car;
};

  
  
export default async function carReport({ params }: { params: { carId: string } }) 
{
    const car = await getCar(parseInt(params.carId));

    return (
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold sm:text-3xl">Total Miles</h1>
                    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
                    </div>
                    <h1 className="text-2xl font-bold sm:text-3xl mt-8">Total Gallons</h1>
                    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
                    </div>
                    <h1 className="text-2xl font-bold sm:text-3xl mt-8">Total Cost</h1>
                    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
                    </div>
                    <h1 className="text-2xl font-bold sm:text-3xl mt-8">Miles Per Gallon</h1>
                    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
                    </div>
                    <h1 className="text-2xl font-bold sm:text-3xl mt-8">Miles Per Dollar</h1>
                    <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
                    </div>
                </div>
            </div>
        </div>
    )
}