'use server'

import { getServerSession } from 'next-auth'
import Credential from '@/models/credential'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function editAction({ email, password, role }) {


    try {
        const user = await Credential.findByIdAndUpdate({
            email, password, role
        }, { new: true }).select('-password')

        if (!user) throw new Error('Email does not exist!')

        return { msg: 'Update Profile Successfully!' }
    } catch (error) {
        redirect(`/errors?error=${error.message}`)
    }
}