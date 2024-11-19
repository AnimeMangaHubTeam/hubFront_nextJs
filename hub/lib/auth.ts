import { NextAuthOptions, User, getServerSession } from 'next-auth';
import Credentials, { CredentialsProvider } from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const autoConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user: User = { id: "1", name: "User" };
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ]
};