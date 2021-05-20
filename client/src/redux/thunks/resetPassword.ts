import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'
import parseServerValidationErrors from '../../utils/parseServerValidationErrors'

export default createAsyncThunk(
    'auth/reset-password',
    async (email: string, { rejectWithValue }) => {
        const response = await client.mutate({
            mutation: gql`
                mutation ($email: String!) {
                    requestResetPassword(email: $email)
                }
            `,
            variables: { email },
            errorPolicy: 'all',
        })

        const validationErrors = parseServerValidationErrors(response)
        if (validationErrors) {
            return rejectWithValue({ validationErrors })
        }

        return response.data.requestResetPassword
    }
)
