import { randomUUID } from 'crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  private data: Array<CheckIn> = []

  async findById(id: string): Promise<CheckIn | null> {
    return this.data.find((checkIn) => checkIn.id === id) ?? null
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
