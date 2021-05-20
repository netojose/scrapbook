import { IServerMessage, IMessage } from './interfaces'

export default function formatMessageToStore(row: IServerMessage): IMessage {
    return {
        key: row.id,
        user: row.user.name,
        title: row.title,
        date: row.createdAt,
    }
}
