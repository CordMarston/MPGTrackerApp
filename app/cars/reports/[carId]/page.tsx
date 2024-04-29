'use client';
// import { prisma } from "@/app/lib/prisma";
import Image from 'next/image'
import Card from '@/app/components/ui/card';
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    plugins: {
        legend: {
            display:false
        },
        title: {
            display: false,
        },
    },
};

export type logObject = {
    logDate: '',
    miles: ''
}

const LoadingImage = () => {
    return (
        <Image src="/img/loading.webp" width={50} height={50} alt="Loading Webp" className="inline" />
    )
}
  
export default function CarReport({ params }: { params: { carId: string } }) 
{
    const [ isLoading, setIsLoading ] = useState(true);
    const [ car, setCar ] = useState({
        logs:[]
    });
    const [ fuelDate, setFuelDates] = useState<string[]>([]);
    const [ totalMiles, setTotalMiles] = useState<string[]>([]);
    let labelDates : string[] = [];
    let pointMiles : string[] = [];
    useEffect(() => {
        fetch(process.env.BASE_URL + '/api/cars/'+params.carId)
        .then((res) => res.json())
        .then((data) => {
            setCar(data.car);
            data.car.logs.forEach((log:logObject) => {
                labelDates.push(new Date(log.logDate).toLocaleDateString());
                pointMiles.push(log.miles);
            });
            if(labelDates.length > 0) {
                setFuelDates(labelDates);
                setTotalMiles(pointMiles);
            }
            setIsLoading(false);
        })
    },[]);

    const labels = fuelDate;

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Miles',
                data: totalMiles,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <Card title="Total Miles" content={isLoading ? <LoadingImage/> : <Line options={options} data={data} />}></Card>
                </div>
            </div>
        </div>
    )
}