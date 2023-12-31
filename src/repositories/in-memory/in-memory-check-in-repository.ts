import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public data: Array<CheckIn> = []

  async findById(id: string): Promise<CheckIn | null> {
    return this.data.find((checkIn) => checkIn.id === id) ?? null
  }

  async countByUserId(userId: string): Promise<number> {
    return this.data.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findManyByUserId(userId: string, page = 1): Promise<CheckIn[]> {
    const MAX_ITEMS_PER_PAGE = 20
    return this.data
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * MAX_ITEMS_PER_PAGE, page * MAX_ITEMS_PER_PAGE)
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.data.find((checkIn) => {
      const checkInTime = dayjs(checkIn.created_at)

      const isOnSameDay =
        checkInTime.isAfter(startOfDay) && checkInTime.isBefore(endOfDay)

      return checkIn.user_id === userId && isOnSameDay
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    await this.data.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.data.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.data[checkInIndex] = checkIn
    }

    return checkIn
  }
}
