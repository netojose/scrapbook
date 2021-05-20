import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client'

import client from '../../utils/apolloClient'

export default createAsyncThunk('messages/fetchAll', async () => {
    const response = await client.query({
        query: gql`
            query {
                messages {
                    id
                    title
                    createdAt
                    user {
                        name
                    }
                }
            }
        `,
    })

    return response.data.messages
})
