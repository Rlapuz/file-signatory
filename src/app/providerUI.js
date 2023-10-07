"use client"

import { NextUIProvider } from '@nextui-org/react'

export const providerUI = ({ children }) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}
