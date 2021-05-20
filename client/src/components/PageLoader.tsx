/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Spin } from 'antd'

export default function PageLoader(): React.ReactElement {
    return (
        <Spin
            size="large"
            css={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                alignItems: 'center',
            }}
        />
    )
}
