import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, response: FastifyReply) {
	const createUserBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
	})

	const { name, email, password } = createUserBodySchema.parse(request.body)

	try {
		const createUserUseCase = makeCreateUserUseCase()

		await createUserUseCase.execute({ name, email, password })
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return response.status(409).send({ message: error.message })
		}

		throw error
	}

	return response.status(201).send()
}
