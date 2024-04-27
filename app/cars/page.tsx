import Link from 'next/link';
import { auth } from "@/app/lib/auth";
import Image from 'next/image'
import prisma  from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

type Cars = Prisma.CarsGetPayload<{
    select: {
        id: true,
        make_id: true,
        model_id: true,
        year: true
        make:true,
        model:true,
        logs:true
    }
}>

async function getCars() {
    const session = await auth();
    const cars = await prisma.cars.findMany({
        where: {
            user_id: session?.user?.id
        },
        include: {
            make: true,
            model: true,
            logs: {
                take: 1,
                orderBy: {
                    id: 'desc',
                }
            }
        }
    });
    return cars;
};


export default async function carsPage()
{
    const cars = await getCars();
    return (
        
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                {cars.length == 0 && 
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold sm:text-3xl">Add Your Vehicles!</h1>
                        <p className="mx-auto mb-0 mt-8 text-white py-6 px-8 text-center">
                            You haven&apos;t added any vehicles to your profile. To start tracking your mileage 
                            <Link href="/cars/add" className="bg-cyan-100 rounded text-cyan-900 px-5 py-2.5 text-sm font-medium mx-2 hover:bg-cyan-200">Add a Car</Link>
                            .
                        </p>
                    </div>
                }
                {cars.length > 0 &&
                    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold sm:text-3xl">Your Vehicles!</h1>
                        {cars.map((c:Cars) => (
                        <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto" key={c.id}>
                            <div className="grid sm:grid-cols-3 grid-cols-1">
                                <div className="items-center flex col-span-2">
                                    <div>
                                        <Image
                                            src="/img/car.png"
                                            width={48}
                                            height={48}
                                            alt="Car Logo"
                                        />
                                    </div>
                                    <div className="items-center block">
                                        <h2 className="text-cyan-900 text-2xl p-4 py-0 block w-full">{ c.year } {c.make.name} {c.model.name}</h2>
                                        {c.logs && c.logs.length > 0 ? (<span className="block text-sm text-gray-400 px-4"><b>Odometer: </b>{c.logs[0].miles.toString()} miles</span>) : ''}
                                    </div>
                                </div>
                                <div className="items-center sm:justify-end block sm:flex">
                                    <div className="grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 gap-2">
                                        <Link className="inline-block sm:block rounded-md bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-700" href={'/cars/log/'+c.id}>
                                            <Image
                                                src="/img/logo-48.png"
                                                width={20}
                                                height={20}
                                                alt="Gas Logo"
                                                className="inline mr-4"
                                            />
                                            Log Fuel Up
                                        </Link>
                                        <Link className="inline-block sm:block rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-cyan-600 transition hover:text-cyan-600/75" href={'/cars/reports/'+c.id}>
                                            <Image
                                                src="/img/charts.png"
                                                width={20}
                                                height={20}
                                                alt="Gas Logo"
                                                className="inline mr-4"
                                            />
                                            Reports
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div className="w-full sm:w-1/2 text-right mt-8 mx-auto">
                            <Link href="/cars/add" className="bg-cyan-100 rounded text-cyan-900 px-5 py-2.5 text-sm font-medium mx-2 hover:bg-cyan-200">Add Another Car</Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}