import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create user', async () => {
		const response = await request(app.server).post('/users').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		})
		expect(response.statusCode).toEqual(201)
	})
})
