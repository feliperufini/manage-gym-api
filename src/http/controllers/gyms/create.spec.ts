import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		const response = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 01',
				description: 'Description of gym 01',
				phone: '69984912176',
				latitude: -10.87838012,
				longitude: -61.94767457,
			})

		expect(response.statusCode).toEqual(201)
	})
})
