import { NextResponse } from 'next/server'
import User from '@/models/user'
import { connectDB } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function GET() {
    return NextResponse.json({ message: 'me hago cargo yo '})
}

export async function POST(request: Request) {
    const { fullname, email, password } = await request.json()
    
    if (!password || password.length < 6) {
        return NextResponse.json({
            error: {
                name: 'Bad Request',
                description: 'Password must be at least 6 characters'
            }
        }, { status: 400 })
    }

    try {
        connectDB()
        const userFound = await User.findOne({ email })

        if (userFound) {
            return NextResponse.json({
                error: {
                    name: 'Existing value',
                    description: 'Email already exists'
                }
            }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            email,
            fullname,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            success: true,
            savedUser
        })
    } catch (error) {
        return NextResponse.json({
            error: {
                name: (error as Error).name,
                description: (error as Error).message
            }
        }, { status: 400 })
    }
}
