import { randomUUID } from 'node:crypto'
import type { Prisma, Role, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async findById(id: string) {
		const user = this.items.find((user) => user.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.items.find((user) => user.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			role: (data.role as Role) ?? 'MEMBER',
			created_at: new Date(),
		}

		this.items.push(user)

		return user
	}
}
