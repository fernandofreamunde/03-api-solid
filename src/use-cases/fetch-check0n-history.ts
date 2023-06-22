import { CheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface FetchCheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
  total: number
}

export class FetchCheckInHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchCheckInHistoryUseCaseRequest): Promise<FetchCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    const total = 0 // await this.checkInRepository.countByUserId(userId)

    return {
      checkIns,
      total,
    }
  }
}
