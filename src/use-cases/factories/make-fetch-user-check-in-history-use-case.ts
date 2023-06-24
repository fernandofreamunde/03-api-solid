import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { FetchCheckInHistoryUseCase } from '../fetch-checkIn-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const useCase = new FetchCheckInHistoryUseCase(checkInsRepository)

  return useCase
}
