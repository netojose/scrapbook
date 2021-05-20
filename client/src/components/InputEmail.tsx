import React from 'react'
import { Form, Input } from 'antd'

export default function InputEmail(): React.ReactElement {
    return (
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
                {
                    min: 4,
                },
                {
                    max: 75,
                },
            ]}
        >
            <Input />
        </Form.Item>
    )
}
