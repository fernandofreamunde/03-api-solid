import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  private data: Array<CheckIn> = []

  async findById(id: string): Promise<CheckIn | null> {
    return this.data.find((checkIn) => checkIn.id === id) ?? null
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
}
