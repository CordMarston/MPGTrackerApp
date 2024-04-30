import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '@/app/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  adapter: PrismaAdapter(prisma),
})