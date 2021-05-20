/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useCallback, useState } from 'react'
import { Row, Col, Card, Form, Button, Space, Typography } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import InputEmail from '../components/InputEmail'
import InputPassword from '../components/InputPassword'
import login from '../redux/thunks/login'
import { AppDispatch } from '../store'

export default function Login(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const [showError, setShowError] = useState<boolean>(false)
    const history = useHistory()

    const handleSubmit = useCallback(
        async (values) => {
            const resultAction = await dispatch(login(values))
            if (login.fulfilled.match(resultAction)) {
                window.localStorage.setItem('token', resultAction.payload)
                history.push('/messages')
            } else {
                setShowError(true)
            }
        },
        [dispatch, history]
    )

    const handleClearError = useCallback(() => {
        setShowError(false)
    }, [])

    return (
        <Row align="middle" css={{ height: '100vh' }}>
            <Col span={4} offset={10}>
                <Card title="Login">
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        onValuesChange={handleClearError}
                    >
                        <InputEmail />
                        <InputPassword />
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>

                        {showError && (
                            <Form.Item>
                                <Typography.Text type="danger">
                                    Wrong credentials, check the data and try
                                    again
                                </Typography.Text>
                            </Form.Item>
                        )}

                        <Space
                            css={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Link to="/register">Create account</Link>
                            or
                            <Link to="/reset-password">Forgot password?</Link>
                        </Space>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
