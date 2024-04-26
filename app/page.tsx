// import { redirect } from 'next/navigation';
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/lib/auth";


export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if(session)
  // {
  //   redirect('/cars');
  // }
  return (
    <div className="grid-rows-1 grid h-full content-center">
      <h1 className="self-center">
        The best way to track your MPG.        
      </h1>
    </div>
  )
}
