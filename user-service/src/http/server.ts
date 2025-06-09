import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { dispatchUserCreated } from '../broker/messages/user-created.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.register(fastifyCors, { origin: '*' })

app.get('/health', () => {
	return 'OK'
})

app.post('/user', {
	schema: {
		body: z.object({
			name: z.string(),
			email: z.string()
		})
	}
	}, async (request, reply) =>{
	const { name, email } = request.body;
	
	console.log(`Creating user ${name} - ${email}`)
	
	const orderId = randomUUID()

	dispatchUserCreated({
		userId: orderId,
		name: name,
		email: email
	})

	try {
		await db.insert(schema.users).values({
			id: orderId,
			name,
			email,
		})
	} catch (err) {
		console.log(err)
	}

	return reply.status(201).send()
})

app.listen({host: '0.0.0.0', port: 3333 }).then(() => {
	console.log('[UserService] HTTP Server running!')
})
