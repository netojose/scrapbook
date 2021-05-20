import { configureStore } from '@reduxjs/toolkit'

import messages from './redux/slices/messages'

const store = configureStore({
    reducer: {
        messages,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
