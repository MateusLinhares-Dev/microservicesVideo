import '@opentelemetry/auto-instrumentations-node/register'

import '../broker/subscriber.ts'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { trace } from '@opentelemetry/api'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors, { origin: '*' })

app.get('/health', () => {
	return 'OK'
})


app.listen({host: '0.0.0.0', port: 3334 }).then(() => {
	console.log('[Streaming] HTTP Server running!')
})