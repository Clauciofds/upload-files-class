import { Request, Response } from "express";
import UserRepository from "../repositories/user-repository";
import User from "../models/user";
import bcypt from 'bcrypt'
import { uploadImage } from "../uploads/utils";

export default class UserController {
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body
		const img = req.file

		if (!name || !email || !password) {
			return res.status(400).json({
				message: 'os campos name, email e password são obrigatórios'
			})
		}

		try {
			const userRepository = new UserRepository()

			const emailExists = await userRepository.findByEmail(email)

			if (emailExists) {
				return res.status(400).json({
					message: 'email informado já existe'
				})
			}

			const user = new User({
				name,
				email,
				password,
				photo: null
			})

			const hashPassword = await bcypt.hash(password, 10)
			user.password = hashPassword

			await userRepository.create(user)

			// https://miyyngbsnsfdbvpetvpb.supabase.co/storage/v1/object/public

			if (img) {
				const extension = img.originalname.split('.').pop()
				const image = await uploadImage(
					`profile/${new Date().getTime()}${name}.${extension}`, img.buffer, img.mimetype
				)
				user.photo = image
				await userRepository.update(user.id, user)
				user.photo = `https://zucmrgweipfwccpfhfgl.supabase.co/storage/v1/object/public/${image}`

			}
			return res.status(201).json({ user })
		} catch (error) {
			const erro = error as Error
			return res.status(400).json({
				message: erro.message
			})
		}
	}

	async get(req: Request, res: Response) {
		try {
			const userRepository = new UserRepository()
			const users = await userRepository.find()
			return res.json(users)
		} catch (error) {
			const erro = error as Error
			return res.status(400).json({
				message: erro.message
			})
		}
	}

	async detail(req: Request, res: Response) {
		const { id } = req.params

		try {
			const userRepository = new UserRepository()
			const user = await userRepository.findById(id)

			if (!user) {
				return res.status(404).json({
					message: 'usuário não encontrado'
				})
			}

			return res.json(user)
		} catch (error) {
			const erro = error as Error
			return res.status(400).json({
				message: erro.message
			})
		}
	}
}