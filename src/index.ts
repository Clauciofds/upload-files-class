import 'dotenv/config'
import express from 'express'
import routes from './routes'
import multerMiddleware from './middlewares/multer'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT, () => {
	console.log('Server started.')
})