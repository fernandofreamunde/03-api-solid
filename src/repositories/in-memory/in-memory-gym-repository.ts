import { Gym, Prisma } from '@prisma/client'
import { GymRepository } from '../gym-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepoitory implements GymRepository {
  public data: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.data.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const MAX_ITEMS_PER_PAGE = 20
    return this.data
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * MAX_ITEMS_PER_PAGE, page * MAX_ITEMS_PER_PAGE)
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
    }

    this.data.push(gym)

    return gym
  }
}
