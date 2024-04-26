import AddCarForm from "@/app/components/cars/addcarform";
import { prisma } from '@/app/lib/prisma';

export default async function addCarPage() {
    let years = [];
    for(let year = 2000; year <= new Date().getFullYear(); year++)
    {
        years.unshift(year);
    }

    const makes = await prisma.carMakes.findMany({
        select : {
            id: true,
            name: true,
            models: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return (
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold sm:text-3xl">Tell us about your vehicle!</h1>
                    <AddCarForm years={years} makes={makes}/>
                </div>
            </div>
        </div>
    )
    
}