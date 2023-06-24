import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
