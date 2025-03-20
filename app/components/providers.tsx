'use client'

import {Provider} from 'jotai'
import React from "react";
import {store} from "@/lib/store";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}