import NextAuth from "next-auth"
import connectDB from "@/db/connectDB"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import UserGoogle from "@/models/googleuser"
import bcrypt from "bcryptjs"
import Credential from "@/src/models/credential"

connectDB();

export const authOptions = {
    providers:
        [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
            CredentialsProvider({
                name: 'Credentials',
                credentials: {

                },
                profile(profile) {
                    return {
                        id: profile.id,
                        name: profile.name,
                        contact: profile.contact,
                        employeeId: profile.employeeId,
                        email: profile.email,
                        image: profile.image,
                        role: profile.role ?? 'user',
                    }
                },
                async authorize(credentials, req) {

                    // check if the email is in the database and the password is correct with bcrypt
                    const { email, password } = credentials

                    try {
                        await connectDB()
                        const user = await Credential.findOne({ email })

                        if (!user) {
                            throw new Error('Email does not exist in Credential!');
                        }

                        // const passwordsMatch = await bcrypt.compare(password, user.password)
                        // Compare plain text password with the hashed password from the database
                        if (password !== user.password) {
                            throw new Error('Incorrect password!');
                        }


                        return user
                    } catch (error) {
                        console.log("Error", error)
                        return null

                    }

                }
            })
        ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/',
    },

    callbacks: {


        async signIn({ user, account, profile, email, credentials }) {

            if (account.type === 'oauth') {
                const existingUserGoogle = await UserGoogle.findOne({ email: profile.email });
                console.log("Existing UserGoogle", existingUserGoogle)

                if (existingUserGoogle) {
                    // UserGoogle exists, authenticate
                    // return existingUserGoogle;
                    return true;

                }
                // UserGoogle does not exist, create a new UserGoogle
                const newUserGoogle = new UserGoogle({
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    provider: account.provider,
                    role: 'user',

                });

                await newUserGoogle.save();

                // Authenticate the newly created user
                return true;
            }
            else if (account.type === 'credentials') {
                const existingCredential = await Credential.findOne({ email: credentials.email });
                console.log("Existing Credential", existingCredential)

                if (existingCredential) {
                    return true
                }
                // User does not exist, create a new user
                const newCredential = new Credential({
                    name: credentials.name,
                    contact: credentials.contact,
                    employeeId: credentials.employeeId,
                    email: credentials.email,
                    password: credentials.password,
                    image: credentials.image,
                    provider: account.provider,
                    role: 'user', // Set the role field to the default value 'user'

                });

                await newCredential.save();

                // Authenticate the newly created user
                return true
            }


            return true;
        },

        async jwt({ token, trigger, session, user }) {

            // console.log("JWT", token)
            if (user) {
                token.role = user.role
            }

            if (trigger === 'update') {
                // Handle OAuth JWT update
                token.user.name = session.name;
                token.user.image = session.image;
                token.user.email = session.email;
            } else if (trigger === 'updateCredential') {
                // Handle credentials-based JWT update
                token.user.name = session.name;
                token.user.contact = session.contact;
                token.user.employeeId = session.employeeId;
                token.user.image = session.image;
                token.user.email = session.email;
                token.user.password = session.password;
            } else {

                // First, attempt to find the user in the Credential model
                const userCredential = await getCredentialByEmail({ email: token.email });
                if (userCredential) {
                    token.user = userCredential; // Found in UserCredential model
                } else {

                    // If not found in Credential model, check the User model (OAuth)
                    const user = await getUserByEmail({ email: token.email });

                    if (user) {
                        token.user = user; // Found in OAuth model
                    } else {
                        // Handle the case when the email is not found in either model
                        throw new Error('User not found');
                    }
                }

                // // First, attempt to find the user in the User model (OAuth)
                // const user = await getUserByEmail({ email: token.email });

                // if (user) {
                //     token.user = user; // Found in OAuth model
                // } else {
                //     // If not found in User model, check the Credential model
                //     const userCredential = await getCredentialByEmail({ email: token.email });

                //     if (userCredential) {
                //         token.user = userCredential; // Found in UserCredential model
                //     } else {
                //         // Handle the case when the email is not found in either model
                //         throw new Error('User not found');
                //     }
                // }


            }

            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            // console.log("Session ewan ", session)
            return session;

        },
    }

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



async function getUserByEmail({ email }) {
    const user = await UserGoogle.findOne({ email }).select('-password')

    if (!user) throw new Error('Email does not exist in user!')
    return { ...user._doc, _id: user._id.toString() }
}



async function getCredentialByEmail({ email }) {
    const user = await
        Credential.findOne({ email }).select('-password')

    if (!user) throw new Error('Email does not exist in Credential!')
    return { ...user._doc, _id: user._id.toString() }
}