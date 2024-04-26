import { prisma } from "@/app/lib/prisma";
import LogMileForm from "@/app/components/cars/logmileform";

export default async function carLog({ params }: { params: { carId: string } }) 
{
    const car = await prisma.cars.findUnique({
        where: {
            id: parseInt(params.carId)
        }
    });
    return (
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold sm:text-3xl">Log { car?.nickname } Mileage</h1>
                    <LogMileForm carId={params.carId} />
                </div>
            </div>
        </div>
    )
}