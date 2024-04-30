import Link from 'next/link'
export default function AuthButtons()
{
    return (
        <div className="sm:flex sm:gap-4">
            <Link href="/auth/login" className="block rounded-md bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
                Login
            </Link>
        </div>
    )
}

