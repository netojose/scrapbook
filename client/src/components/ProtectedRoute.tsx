import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

export default function ProtectedRoute(props: RouteProps): React.ReactElement {
    const token = window.localStorage.getItem('token')
    if (!token) {
        return <Redirect to="/" />
    }

    return <Route {...props} />
}
