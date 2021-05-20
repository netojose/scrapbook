import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'
import parseServerValidationErrors from '../../utils/parseServerValidationErrors'

export default createAsyncThunk(
    'auth/define-password',
    async (
        params: { token: string; password: string },
        { rejectWithValue }
    ) => {
        const response = await client.mutate({
            mutation: gql`
                mutation ($token: String!, $password: String!) {
                    definePassword(token: $token, password: $password)
                }
            `,
            variables: params,
            errorPolicy: 'all',
        })

        const validationErrors = parseServerValidationErrors(response)
        if (validationErrors) {
            return rejectWithValue({ validationErrors })
        }

        return response.data.definePassword
    }
)
