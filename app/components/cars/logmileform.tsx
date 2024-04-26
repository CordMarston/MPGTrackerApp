// @refresh reset
"use client"
export default async function logMileForm({
    carId,
}:{
    carId: string
})
{
    const addLog = async (event:any) => {
        event.preventDefault()
        const data = {
            car_id: carId,
            miles: event.target.miles.value,
            gallons: event.target.gallons.value,
            cost: event.target.cost.value,
            notes: event.target.notes.value,
            date: event.target.date.value,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/cars/'+carId
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        return result;
    }

    var date = new Date("Wed, 04 May 2022");
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var today = year + "-" + month + "-" + day;

    return (
        <div className="w-full sm:w-1/2 bg-white rounded p-4 mt-8 mx-auto">
            <form className="grid sm:grid-flow-row gap-4" onSubmit={addLog}>
                <input type="hidden" name="card_id" value={carId} />
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Miles</label>
                        <input type="number" name="miles" placeholder="Odometer Reading" className="focus:outline-none focus:ring focus:ring-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" required/>
                    </div>
                    <div className="">
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Gallons</label>
                        <input type="number" name="gallons" placeholder="Gallons Added" className="focus:outline-none focus:ring focus:ring-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" step="0.001" required/>
                    </div> 
                    <div className="">
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Cost</label>
                        <div className="relative mb-4 flex flex-wrap items-stretch">
                            <span className="flex items-center whitespace-nowrap rounded-l border border-gray-300 border-r-0 border-solid px-3 py-[0.25rem] text-center text-base bg-gray-300 font-bold leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">$</span>
                            <input type="number" name="cost" className="relative m-0 block w-[1px] flex-auto rounded-l-none rounded-r focus:outline-none focus:ring focus:ring-gray-200 appearance-none bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" placeholder="0.00" step="0.01" required/>
                        </div>
                    </div>
                    <div className="">
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Date</label>
                        <input type="date" name="date" defaultValue={today} placeholder="Date Filled" className="focus:outline-none focus:ring focus:ring-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500" step="0.001" required/>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <label className="block uppercase tracking-wide text-cyan-700 text-xs font-bold mb-2">Notes (Optional)</label>
                        <input type="text" name="notes" placeholder="Optional Notes" className="border-gray-300 focus:outline-none focus:ring focus:ring-gray-200 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight  focus:bg-white focus:border-gray-500"/>
                    </div>
                </div>
                <div className="text-right">
                    <button type="submit" className="mt-2 rounded-md bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
                        Log Fuel Up
                    </button>
                </div>
            </form>
        </div>
    )
}