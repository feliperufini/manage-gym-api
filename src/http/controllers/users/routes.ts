import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { create } from './create'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
	// Public Routes
	app.post('/users', create)
	app.post('/sessions', authenticate)
	app.patch('/token/refresh', refresh)

	// Authenticated Routes
	app.get('/me', { onRequest: [verifyJWT] }, profile)
}
