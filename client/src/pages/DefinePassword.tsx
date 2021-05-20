/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useState } from 'react'
import { Row, Col, Card, Form, Button, Result, message } from 'antd'
import { useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import InputPassword from '../components/InputPassword'
import definePassword from '../redux/thunks/definePassword'
import { AppDispatch } from '../store'

export default function DefinePassword(): React.ReactElement {
    const history = useHistory()
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const params = useParams<{ token: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = useCallback(
        async (values) => {
            const { token } = params
            const resultAction = await dispatch(
                definePassword({ token, password: values.password })
            )

            if (
                definePassword.fulfilled.match(resultAction) &&
                resultAction.payload
            ) {
                setShowInfo(true)
            } else {
                message.error(
                    'Operation not completed, you probably are using a link that has already expired'
                )
            }
        },
        [dispatch, params]
    )

    const handleGoToLogin = useCallback(() => {
        history.push('/')
    }, [history])

    return (
        <Row align="middle" css={{ height: '100vh' }}>
            <Col span={6} offset={9}>
                <Card title="Define password">
                    {showInfo ? (
                        <Result
                            status="success"
                            title="You have successfully changed your password!"
                            subTitle="Go to the login screen and use your new password"
                            extra={
                                <Button
                                    type="primary"
                                    onClick={handleGoToLogin}
                                >
                                    Go to login
                                </Button>
                            }
                        />
                    ) : (
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <InputPassword />
                            <InputPassword confirm />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Define password
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Card>
            </Col>
        </Row>
    )
}
