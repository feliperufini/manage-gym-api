import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import bcrypt from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new CreateUserUseCase(usersRepository)
	})

	it('should be able to create user', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon create user', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		})

		const isPasswordCorrectlyHashed = await bcrypt.compare(
			'password123',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to create user with same email twice', async () => {
		const email = 'john.doe@example.com'

		await sut.execute({
			name: 'John Doe',
			email,
			password: 'password123',
		})

		await expect(() =>
			sut.execute({
				name: 'John Doe',
				email,
				password: 'password123',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
