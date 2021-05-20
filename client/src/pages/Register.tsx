/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useCallback } from 'react'
import { Row, Col, Card, Form, Input, Button, Space, notification } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import InputEmail from '../components/InputEmail'
import InputPassword from '../components/InputPassword'
import register from '../redux/thunks/register'
import { AppDispatch } from '../store'
import fillIFormErrors from '../utils/fillIFormErrors'

export default function Register(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const [form] = Form.useForm()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (values) => {
            const resultAction = await dispatch(register(values))
            if (register.fulfilled.match(resultAction)) {
                notification.success({
                    message: 'Welcome!',
                    description: 'Your account was created successfully',
                })
                window.localStorage.setItem('token', resultAction.payload)
                history.push('/messages')
            } else {
                fillIFormErrors(resultAction, form)
            }
        },
        [dispatch, form, history]
    )

    return (
        <Row align="middle" css={{ height: '100vh' }}>
            <Col span={4} offset={10}>
                <Card title="Register">
                    <Form layout="vertical" onFinish={handleSubmit} form={form}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                                {
                                    min: 1,
                                },
                                {
                                    max: 50,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <InputEmail />
                        <InputPassword />
                        <InputPassword confirm />
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create account
                            </Button>
                        </Form.Item>
                        <Space>
                            Already have an account? <Link to="/">Login</Link>
                        </Space>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
