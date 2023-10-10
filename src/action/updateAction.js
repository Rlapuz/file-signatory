'use server'

import { getServerSession } from 'next-auth'
import Credential from '@/models/credential'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function updateProfile({ name, image, contact, employeeId }) {
    const session = await getServerSession(authOptions)

    if (!session) throw new Error('Unauthorization!')

    try {
        const user = await Credential.findByIdAndUpdate(session?.user?._id, {
            name, image, contact, employeeId
        }, { new: true }).select('-password')

        if (!user) throw new Error('Email does not exist!')

        return { msg: 'Update Profile Successfully!' }
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
    }
}