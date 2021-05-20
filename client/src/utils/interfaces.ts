export interface IServerMessage {
    createdAt: Date
    id: string
    title: string
    user: { name: string }
}

export interface IMessage {
    key: string
    user: string
    title: string
    date: Date
}

export interface IMessageState {
    items: IMessage[]
    isLoading: boolean
}
