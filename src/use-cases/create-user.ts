import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateUserUseCaseRequest {
	name: string
	email: string
	password: string
}

interface CreateUserUseCaseResponse {
	user: User
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const passwordHash = await bcrypt.hash(password, 6)

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash: passwordHash,
		})

		return {
			user,
		}
	}
}
