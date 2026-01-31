import { authOptions } from "@/lib/auth-options"
import NextAuth from "next-auth/next"

const handler = NextAuth(authOptions)

export const runtime = 'nodejs';

export { handler as GET, handler as POST }
