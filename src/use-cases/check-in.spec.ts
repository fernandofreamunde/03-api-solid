import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymRepoitory } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepoitory
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepoitory()
    sut = new CheckInUseCase(checkInsRepository, gymRepository)

    gymRepository.data.push({
      id: 'gym-01',
      title: 'Ginasio do Cesar',
      description: 'String?',
      phone: '+351 91 23 45 678',
      longitude: new Decimal(-8.340615603486858),
      latitude: new Decimal(41.289849577500306),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: -8.34055191754671,
      userLatitude: 41.28965967536364,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date('2019-01-01 10:00:00'))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: -8.34055191754671,
      userLatitude: 41.28965967536364,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLongitude: -8.34055191754671,
        userLatitude: 41.28965967536364,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in on different days', async () => {
    vi.setSystemTime(new Date('2019-01-01 10:00:00'))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: -8.34055191754671,
      userLatitude: 41.28965967536364,
    })

    vi.setSystemTime(new Date('2019-01-02 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLongitude: -8.34055191754671,
      userLatitude: 41.28965967536364,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in distant gym', async () => {
    gymRepository.data.push({
      id: 'gym-02',
      title: 'Ginasio Missbell',
      description: 'String?',
      phone: '+351 91 23 45 678',
      latitude: new Decimal(41.2774567142437),
      longitude: new Decimal(-8.379388695961541),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLongitude: -8.34055191754671,
        userLatitude: 41.28965967536364,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
