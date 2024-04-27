"use client"
import { useState } from 'react';
import { prisma } from '@/app/lib/prisma';
import { Prisma } from "@prisma/client";

type Models = Prisma.CarModelsGetPayload<{
    select: {
        id: true,
        name: true,
    }
}>

type Makes = Prisma.CarMakesGetPayload<{
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
}>

export default function AddCarForm({
    years,
    makes
}:{
    years: Array<number>
    makes: Makes[]
})
{

    const [stateModels, setModels] = useState(Array<Models>)

    function makeChanged(e:any)
    {
        const find_make = makes.find(make => make.id == e.target.value);
        if(find_make && find_make.models)
        {
            setModels(find_make.models.sort((a,b) => a.name.localeCompare(b.name)));
        }
    }
    const addCar = async (event:any) => {
        event.preventDefault()
 
        // Get data from the form.
        const data = {
            nickname: event.target.nickname.value,
            year: event.target.year.value,
            make_id: event.target.make_id.value,
            model_id: event.target.model_id.value
        }
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
    
        // API endpoint where we send form data.
        const endpoint = '/api/cars'
    
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
    }

    return (
        <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto pt-6">
            <form className="grid grid-flow-row gap-4" onSubmit={addCar}>
                <div className="">
                    <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Nickname</label>
                    <input type="text" name="nickname" placeholder="Nickname" className="focus:outline-none focus:ring focus:ring-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" required/>
                </div>
                <div className="grid grid-flow-col grid-cols-3 gap-2">
                    <div>
                        <label htmlFor="year" className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Year</label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-gray-200 focus:bg-white focus:border-gray-500" name="year" defaultValue="" id="year" required>
                            <option value="" disabled hidden>Select Year</option>
                            {years.map((y) => (
                                <option value={y} key={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Make</label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-gray-200 focus:bg-white focus:border-gray-500" name="make_id" defaultValue="" onChange={makeChanged} required>
                            <option value="" disabled hidden>Make</option>
                            {makes.length > 0 && makes.map((m:Makes) => (
                                <option value={m.id} key={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Model</label>
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring focus:ring-gray-200 focus:bg-white focus:border-gray-500" name="model_id" defaultValue="" required>
                            <option value="" disabled hidden>Model</option>
                            {stateModels.length > 0 && stateModels.map((m:Models) => (
                                <option value={m.id} key={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="text-right">
                    <button type="submit" className="mt-2 rounded-md bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
                        Add Vehicle
                    </button>
                </div>
            </form>
        </div>
    )
}