import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PageLoader from './PageLoader'
import ProtectedRoute from './ProtectedRoute'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const ResetPassword = lazy(() => import('../pages/ResetPassword'))
const DefinePassword = lazy(() => import('../pages/DefinePassword'))
const Messages = lazy(() => import('../pages/Messages'))

export default function Routes(): React.ReactElement {
    return (
        <Router>
            <Suspense fallback={<PageLoader />}>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/reset-password">
                        <ResetPassword />
                    </Route>
                    <Route path="/define-password/:token">
                        <DefinePassword />
                    </Route>
                    <ProtectedRoute path="/messages">
                        <Messages />
                    </ProtectedRoute>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    )
}
