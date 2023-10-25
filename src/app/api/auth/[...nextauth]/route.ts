import { connectDB } from '@/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// [...] signfica que next auth se va a hacer cargo de todas los routes que esten por debajo de api/auth menos los que definamos nosotros, como por ejemplo signup

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Username', type: 'text', placeholder: 'Ingrese usuario' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectDB()
                const userFound = await User.findOne({
                    email: credentials?.email,
                }).select('+password')
                if (!userFound) throw new Error('Invalid credentials')

                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if (!passwordMatch) throw new Error('Invalid credentials')

                return userFound
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token: tokenData, user }) {
            if (user) {
                tokenData.user = user
            }
            return tokenData
        },
        async session({ session, token: tokenData }) {
            session.user = tokenData.user as typeof session.user
            return session
        },
    },
})

export { handler as GET, handler as POST }
