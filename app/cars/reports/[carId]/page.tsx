'use client';
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

const LoadingImage = () => {
    return (
        <Image src="/img/loading.webp" width={50} height={50} alt="Loading Webp" className="inline" />
    )
}
  
export default function CarReport({ params }: { params: { carId: string } }) 
{
    const [ isLoading, setIsLoading ] = useState(true);
    const [ mpgDates, setMpgDates] = useState<string[]>([]);
    const [ mpgValues, setMpgValues] = useState<number[]>([]);

    let mpgDatesBuilder : string[] = [];
    let mpgValuesBuilder : number[] = [];
    useEffect(() => {
        fetch(process.env.BASE_URL + '/api/cars/'+params.carId)
        .then((res) => res.json())
        .then((data) => {
            for(let i = 0; i < data.car.logs.length; i++) {
                mpgDatesBuilder.push(new Date(data.car.logs[i].logDate).toLocaleDateString());
                if(i > 0) {
                    mpgValuesBuilder.push((data.car.logs[i].miles - data.car.logs[i-1].miles) / data.car.logs[i].gallons);
                }
            }
            mpgDatesBuilder.shift();
            setMpgValues(mpgValuesBuilder);
            setMpgDates(mpgDatesBuilder);
            setIsLoading(false);
        })
    },[]);

    const labels = mpgDates;
    const mpgData = {
        labels,
        datasets: [
            {
                label: 'MPG',
                data: mpgValues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div className="grid-rows-1 grid h-full content-center">
            <div className="self-center">
                <div className="max-w-screen-xl mx-auto gap-8 px-4 sm:px-6 lg:px-8">
                    <Card title="Miles Per Gallon" content={isLoading ? <LoadingImage/> : mpgValues.length > 0 ? <Line options={options} data={mpgData} /> : 'Not enough data.'}></Card>
                </div>
            </div>
        </div>
    )
}