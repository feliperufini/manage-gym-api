import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able search gyms by title', async () => {
		const { token } = await createAndAuthenticateUser(app, true)

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 01',
				description: 'Description of gym 01',
				phone: '69984912176',
				latitude: -10.87838012,
				longitude: -61.94767457,
			})

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 02',
				description: 'Description of gym 02',
				phone: '69984912176',
				latitude: -10.87838012,
				longitude: -61.94767457,
			})

		const response = await request(app.server)
			.get('/gyms/search')
			.query({
				query: 'Gym 01',
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Gym 01',
			}),
		])
	})
})
