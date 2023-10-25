'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

const RegisterPage = () => {
    const { toast } = useToast()
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const email = formData.get('email')
        const fullname = formData.get('fullname')
        const password = formData.get('password')

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    fullname,
                    password
                })
            })
            const data = await response.json()
            if (data.error) {
                toast({
                    variant: 'destructive',
                    title: data.error.name,
                    description: data.error.description
                })
                return
            }

            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (signInResponse?.error) {
                toast({
                    title: signInResponse.error as string
                })
            }

            if (signInResponse?.ok) {
                router.push('/')
            }

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-screen bg-background flex justify-center items-center">
            <div className="w-[400px] h-[300px]">
                <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                    <Input type="text" placeholder="Juan Cobo" name="fullname" />
                    <Input type="email" placeholder="juancobo@mail.com" name="email" />
                    <Input type="password" placeholder="******" name="password" />
                    <Button>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
