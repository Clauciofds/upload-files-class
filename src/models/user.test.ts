import User from "./user"

describe('User model', () => {
	test('deve criar um novo usuario', () => {
		const props = {
			name: 'Guido',
			email: 'guido@email.com',
			password: '123456'
		}

		const user = new User(props)

		expect(user.id).toBeDefined()
		expect(user.name).toBe(props.name)
		expect(user.email).toBe(props.email)
		expect(user.password).toBe(props.password)
	})

	test('não deve criar um usuario com email incorreto', () => {
		const props = {
			name: 'Guido',
			email: 'guido@',
			password: '123456'
		}

		expect(() => {
			new User(props)
		}).toThrow(new Error('email inválido'))
	})

	test('não deve criar um usuario com senha inválida', () => {
		const props = {
			name: 'Guido',
			email: 'guido@email.com',
			password: '1234'
		}

		expect(() => {
			new User(props)
		}).toThrow(new Error('a senha precisa ter no mínimo 5 digitos'))
	})
})