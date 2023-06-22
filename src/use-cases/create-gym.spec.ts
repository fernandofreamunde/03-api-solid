import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepoitory } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepo: InMemoryGymRepoitory
let usecase: CreateGymUseCase

describe('Create Gym UseCase', () => {
  beforeEach(() => {
    gymRepo = new InMemoryGymRepoitory()
    usecase = new CreateGymUseCase(gymRepo)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await usecase.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
