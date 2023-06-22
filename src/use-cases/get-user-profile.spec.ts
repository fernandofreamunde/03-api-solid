import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let userRepo: InMemoryUsersRepository
let usecase: GetUserProfileUseCase

describe('Get User Profile UseCase', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    usecase = new GetUserProfileUseCase(userRepo)
  })

  it('should get user information', async () => {
    const user = await userRepo.create({
      email: 'john@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 8),
    })

    const profile = await usecase.execute({
      userId: user.id,
    })

    expect(profile.user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      usecase.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
