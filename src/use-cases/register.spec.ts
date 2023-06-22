import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepo: InMemoryUsersRepository
let usecase: RegisterUseCase

describe('Register User UseCase', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    usecase = new RegisterUseCase(userRepo)
  })

  it('should hash user password on register', async () => {
    const { user } = await usecase.execute({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    const isPasswordCorrectlyHahsed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHahsed).toBe(true)
  })

  it('should be able to register a user', async () => {
    const { user } = await usecase.execute({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be possible to register user with repeated email', async () => {
    const repeatedEmail = 'john.doe@example.com'

    await usecase.execute({
      email: repeatedEmail,
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      usecase.execute({
        email: repeatedEmail,
        name: 'Johny Doey',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
