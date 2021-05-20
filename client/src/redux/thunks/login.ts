import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'
import parseServerValidationErrors from '../../utils/parseServerValidationErrors'

export default createAsyncThunk(
    'auth/login',
    async (
        params: { email: string; password: string },
        { rejectWithValue }
    ) => {
        const response = await client.mutate({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                    login(email: $email, password: $password)
                }
            `,
            variables: params,
            errorPolicy: 'all',
        })

        const validationErrors = parseServerValidationErrors(response)
        if (validationErrors) {
            return rejectWithValue({ validationErrors })
        }

        return response.data.login
    }
)
