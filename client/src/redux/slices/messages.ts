import { createSlice } from '@reduxjs/toolkit'

import formatMessageToStore from '../../utils/formatMessageToStore'
import fetchtMessages from '../thunks/fetchtMessages'
import addMessage from '../thunks/addMessage'
import { IMessageState } from '../../utils/interfaces'

const initialState = {
    items: [],
    isLoading: false,
} as IMessageState

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchtMessages.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(fetchtMessages.fulfilled, (state, action) => {
            state.isLoading = false
            state.items = action.payload.map(formatMessageToStore)
        })

        builder.addCase(addMessage.fulfilled, (state, action) => {
            state.items.push(formatMessageToStore(action.payload))
        })
    },
})

export default messagesSlice.reducer
