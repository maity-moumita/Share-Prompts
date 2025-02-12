
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
       GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_ID,
       }) 
    ],
    async session({session}){
        const sessionUser = User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;
    },
    // Serverless -> Lambda
    callbacks: {
        async session({ session }) {
            await connectToDB();
            const sessionUser = await User.findOne({ email: session.user.email });

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // Check if the user already exists
                const userExist = await User.findOne({ email: profile.email });

                // If not, create a new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.error("Sign-in error:", error);
                return false;
            }
        },
    }
})

export {handler as GET, handler as POST};
