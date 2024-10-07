import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-erro'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInUseCase(checkInsRepository, gymsRepository)

		await gymsRepository.create({
			id: 'gym-01',
			title: 'Gym 1',
			description: 'Description of Gym 1',
			phone: '69984912176',
			latitude: -10.87838012,
			longitude: -61.94767457,
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -10.87838012,
			userLongitude: -61.94767457,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2024, 8, 24, 8, 0, 0))

		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -10.87838012,
			userLongitude: -61.94767457,
		})

		await expect(() =>
			sut.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: -10.87838012,
				userLongitude: -61.94767457,
			}),
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
	})

	it('should be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2024, 8, 24, 8, 0, 0))

		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -10.87838012,
			userLongitude: -61.94767457,
		})

		vi.setSystemTime(new Date(2024, 8, 25, 8, 0, 0))

		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -10.87838012,
			userLongitude: -61.94767457,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-02',
			title: 'Gym 2',
			description: 'Description of Gym 2',
			phone: '69984912176',
			latitude: new Decimal(-10.07838012),
			longitude: new Decimal(-61.04767457),
		})

		await expect(() =>
			sut.execute({
				userId: 'user-01',
				gymId: 'gym-02',
				userLatitude: -10.87838012,
				userLongitude: -61.94767457,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError)
	})
})
