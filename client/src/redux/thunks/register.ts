import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'
import parseServerValidationErrors from '../../utils/parseServerValidationErrors'

export default createAsyncThunk(
    'auth/register',
    async (
        params: { name: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        const response = await client.mutate({
            mutation: gql`
                mutation ($name: String!, $email: String!, $password: String!) {
                    register(name: $name, email: $email, password: $password)
                }
            `,
            variables: params,
            errorPolicy: 'all',
        })

        const validationErrors = parseServerValidationErrors(response)
        if (validationErrors) {
            return rejectWithValue({ validationErrors })
        }

        return response.data.register
    }
)
