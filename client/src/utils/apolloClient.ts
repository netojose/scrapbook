import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    InMemoryCache,
    concat,
} from '@apollo/client'

const { REACT_APP_API_URL } = process.env
const httpLink = new HttpLink({ uri: REACT_APP_API_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = window.localStorage.getItem('token')
    if (token) {
        operation.setContext({
            headers: {
                Authorization: token,
            },
        })
    }

    return forward(operation)
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
})

export default client
