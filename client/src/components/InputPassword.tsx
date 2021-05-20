import React from 'react'
import { Form, Input } from 'antd'

interface IProps {
    confirm?: boolean
}

const matches = ({
    getFieldValue,
}: {
    getFieldValue: (field: string) => string
}) => ({
    validator(_: unknown, value: string) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
        }
        return Promise.reject(
            new Error('The two passwords that you entered do not match!')
        )
    },
})

export default function InputPassword({
    confirm = false,
}: IProps): React.ReactElement {
    return (
        <Form.Item
            label={confirm ? 'Password confirmation' : 'Password'}
            name={confirm ? 'password_confirmation' : 'password'}
            rules={[
                {
                    required: true,
                    message: 'Please input your password',
                },
                {
                    min: 6,
                    message: 'This field must be at least 6 characters',
                },
                {
                    max: 75,
                    message: 'This field must have a maximum of 75 characters',
                },
                ...(confirm ? [matches] : []),
            ]}
        >
            <Input.Password />
        </Form.Item>
    )
}
