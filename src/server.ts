import { app } from './app'
import { env } from './env'

app
	.listen({
		host: '0.0.0.0',
		port: env.API_BASE_PORT,
	})
	.then(() => {
		console.log(
			'🎮 HTTP server is running on http://localhost:' + env.API_BASE_PORT,
		)
	})
