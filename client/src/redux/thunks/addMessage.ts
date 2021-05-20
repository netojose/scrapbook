import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'
import parseServerValidationErrors from '../../utils/parseServerValidationErrors'

export default createAsyncThunk(
    'messages/add',
    async (title: string, { rejectWithValue }) => {
        const response = await client.mutate({
            mutation: gql`
                mutation ($title: String!) {
                    addMessage(title: $title) {
                        id
                        title
                        createdAt
                        user {
                            name
                        }
                    }
                }
            `,
            variables: { title },
            errorPolicy: 'all',
        })

        const validationErrors = parseServerValidationErrors(response)
        if (validationErrors) {
            return rejectWithValue({ validationErrors })
        }

        return response.data.addMessage
    }
)
