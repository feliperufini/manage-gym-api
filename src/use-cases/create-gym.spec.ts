import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'Gym 01',
			description: 'Description of gym 01',
			phone: '69984912176',
			latitude: -10.87838012,
			longitude: -61.94767457,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
