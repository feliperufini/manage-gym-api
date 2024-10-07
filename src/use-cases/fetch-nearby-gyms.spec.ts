import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new FetchNearbyGymsUseCase(gymsRepository)
	})

	it('should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: 'Description of Near Gym',
			phone: '69984912176',
			latitude: -10.87838012,
			longitude: -61.94767457,
		})

		await gymsRepository.create({
			title: 'Far Gym',
			description: 'Description of Far Gym',
			phone: '69984912176',
			latitude: -10.07838012,
			longitude: -61.04767457,
		})

		const { gyms } = await sut.execute({
			userLatitude: -10.87838012,
			userLongitude: -61.94767457,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
