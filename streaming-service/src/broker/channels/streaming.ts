import { broker } from '../broker.ts'

export const streaming = await broker.createChannel()

await streaming.assertQueue('streaming')