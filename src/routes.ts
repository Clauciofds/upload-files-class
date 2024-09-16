import { Router } from 'express'
import UserController from './controllers/user-controller'
import multerMiddleware from './middlewares/multer'

const routes = Router()

routes.post('/users', multerMiddleware.single('imagem'), new UserController().create)
routes.get('/users', new UserController().get)
routes.get('/users/:id', new UserController().detail)

export default routes
