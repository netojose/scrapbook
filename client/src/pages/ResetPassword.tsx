/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useState } from 'react'
import { Row, Col, Card, Form, Input, Button, Space, Result } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import resetPassword from '../redux/thunks/resetPassword'
import { AppDispatch } from '../store'
import { useCallback } from 'react'

export default function ResetPassword(): React.ReactElement {
    const history = useHistory()
    const dispatch = useDispatch<AppDispatch>()
    const [showInfo, setShowInfo] = useState<boolean>(false)

    const handleSubmit = useCallback(
        async (values) => {
            const resultAction = await dispatch(resetPassword(values.email))
            if (
                resetPassword.fulfilled.match(resultAction) &&
                resultAction.payload
            ) {
                setShowInfo(true)
            }
        },
        [dispatch]
    )

    const handleGoToHome = useCallback(() => {
        history.push('/')
    }, [history])

    return (
        <Row align="middle" css={{ height: '100vh' }}>
            <Col span={6} offset={9}>
                <Card title="Reset password">
                    {showInfo ? (
                        <Result
                            status="success"
                            title="Reset request successfully!"
                            subTitle="If your email address is in our database, you will receive an email with instructions for resetting your password"
                            extra={
                                <Button type="primary" onClick={handleGoToHome}>
                                    Go to home
                                </Button>
                            }
                        />
                    ) : (
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please input a valid email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Reset password
                                </Button>
                            </Form.Item>

                            <Space>
                                Already have an account?{' '}
                                <Link to="/">Login</Link>
                            </Space>
                        </Form>
                    )}
                </Card>
            </Col>
        </Row>
    )
}
