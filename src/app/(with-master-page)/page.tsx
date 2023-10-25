'use client'

import { useSession } from 'next-auth/react'

const Home = () => {
    const session = useSession()

    return (
        <div className="w-full h-screen bg-background flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold">Hola bro</h1>
            <div className="w-full h-1/2 flex items-center justify-center">
                <pre className="w-1/2">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default Home
