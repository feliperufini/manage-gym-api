import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

// "mysql://root:@localhost:3306/manage-gym-api"
const prisma = new PrismaClient()

function generateDatabaseURL(databaseName: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error('Please provide a DATABASE_URL environment variable.')
	}

	const url = new URL(process.env.DATABASE_URL)

	url.pathname = `/${databaseName}`

	return url.toString()
}

export default (<Environment>{
	name: 'prisma',
	transformMode: 'ssr',
	async setup() {
		const databaseName = randomUUID()
		const databaseURL = generateDatabaseURL(databaseName)

		process.env.DATABASE_URL = databaseURL

		execSync('npx prisma migrate deploy')

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(
					'DROP DATABASE IF EXISTS `' + databaseName + '`',
				)

				await prisma.$disconnect()
			},
		}
	},
})
