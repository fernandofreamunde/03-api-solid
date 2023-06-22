import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate User UseCase', () => {
  it('should be able to authenticate a user', async () => {
    const userRepo = new InMemoryUsersRepository()
    const usecase = new AuthenticateUseCase(userRepo)

    const password_hash = await hash('123456', 8)

    userRepo.create({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password_hash,
    })

    const { user } = await usecase.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should fail to authenticate with wrong password', async () => {
    const userRepo = new InMemoryUsersRepository()
    const usecase = new AuthenticateUseCase(userRepo)

    const password_hash = await hash('123456', 8)

    userRepo.create({
      email: 'john.doe@example.com',
      name: 'John Doe',
      password_hash,
    })

    await expect(() =>
      usecase.execute({
        email: 'john.doe@example.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should fail to authenticate with wrong email', async () => {
    const userRepo = new InMemoryUsersRepository()
    const usecase = new AuthenticateUseCase(userRepo)

    const password_hash = await hash('123456', 8)

    userRepo.create({
      email: 'john@example.com',
      name: 'John Doe',
      password_hash,
    })

    await expect(() =>
      usecase.execute({
        email: 'john.doe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
