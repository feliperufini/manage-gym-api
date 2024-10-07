import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch User Check-in History Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new SearchGymsUseCase(gymsRepository)
	})

	it('should be able to search for gyms', async () => {
		await gymsRepository.create({
			title: 'Gym 01',
			description: 'Description of gym 01',
			phone: '69984912176',
			latitude: -10.87838012,
			longitude: -61.94767457,
		})

		await gymsRepository.create({
			title: 'Gym 02',
			description: 'Description of gym 02',
			phone: '69984912176',
			latitude: -10.87838012,
			longitude: -61.94767457,
		})

		const { gyms } = await sut.execute({
			query: 'Gym 01',
			page: 1,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Gym 01' })])
	})

	it('should be able to fetch paginated gym search', async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Gym ${i}`,
				description: 'Description of gym 01',
				phone: '69984912176',
				latitude: -10.87838012,
				longitude: -61.94767457,
			})
		}

		const { gyms } = await sut.execute({
			query: 'Gym',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Gym 21' }),
			expect.objectContaining({ title: 'Gym 22' }),
		])
	})
})
