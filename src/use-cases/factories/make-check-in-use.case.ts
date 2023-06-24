import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const gymsRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
