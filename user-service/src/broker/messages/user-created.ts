import { channels } from "../channels/index.ts"
import type { UserCreatedMessage } from '../../../../contract/messages/user-created-message.ts'

export function dispatchUserCreated(data: UserCreatedMessage ) {
    channels.users.sendToQueue('users', Buffer.from(JSON.stringify(data)))
} 