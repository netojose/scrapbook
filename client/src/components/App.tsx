import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/client/react'

import client from '../utils/apolloClient'
import Routes from './Routes'
import store from '../store'

export default function App(): React.ReactElement {
    return (
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <Routes />
            </ReduxProvider>
        </ApolloProvider>
    )
}
