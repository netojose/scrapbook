import React, { useCallback } from 'react'
import { Modal, Form, Input, notification } from 'antd'
import { useDispatch } from 'react-redux'

import fillIFormErrors from '../utils/fillIFormErrors'
import addMessage from '../redux/thunks/addMessage'
import { AppDispatch } from '../store'

interface IModalCreateMessage {
    isVisible: boolean
    handleOk: () => void
    handleCancel: () => void
}

export default function ModalCreateMessage({
    isVisible,
    handleOk,
    handleCancel,
}: IModalCreateMessage): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const [form] = Form.useForm()

    const handleSubmit = useCallback(async () => {
        const values = await form.validateFields()
        const { title } = values
        const resultAction = await dispatch(addMessage(title))
        if (addMessage.fulfilled.match(resultAction)) {
            notification.success({
                message: 'Message added',
                description: 'Your message was added successfully',
            })
            handleOk()
        } else {
            fillIFormErrors(resultAction, form)
        }
    }, [form, dispatch, handleOk])

    const handleClose = useCallback(() => {
        form.resetFields()
    }, [form])

    return (
        <Modal
            title="Create message"
            visible={isVisible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText="Add message"
            afterClose={handleClose}
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your message',
                        },
                        {
                            max: 255,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}
