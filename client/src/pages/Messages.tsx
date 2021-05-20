import React, { useState, useCallback, useEffect } from 'react'
import { Row, Col, PageHeader, Button, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ModalCreateMessage from '../components/ModalCreateMessage'
import fetchtMessages from '../redux/thunks/fetchtMessages'
import { RootState, AppDispatch } from '../store'

const columns = [
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
]

export default function Messages(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector(({ messages }: RootState) => messages)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const history = useHistory()

    const handleLogout = useCallback(() => {
        window.localStorage.removeItem('token')
        history.push('/')
    }, [history])

    useEffect(() => {
        const promise = dispatch(fetchtMessages())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const showModal = useCallback(() => {
        setIsModalVisible(true)
    }, [])

    const handleOk = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    const handleCancel = useCallback(() => {
        setIsModalVisible(false)
    }, [])

    return (
        <>
            <ModalCreateMessage
                handleCancel={handleCancel}
                handleOk={handleOk}
                isVisible={isModalVisible}
            />
            <Row align="middle">
                <Col span={14} offset={5}>
                    <PageHeader
                        title="Messages"
                        extra={[
                            <Button
                                key="create"
                                type="primary"
                                onClick={showModal}
                            >
                                Create message
                            </Button>,
                            <Button key="logout" onClick={handleLogout}>
                                Logout
                            </Button>,
                        ]}
                    />
                    <Table
                        dataSource={messages.items}
                        columns={columns}
                        loading={messages.isLoading}
                        pagination={false}
                    />
                </Col>
            </Row>
        </>
    )
}
