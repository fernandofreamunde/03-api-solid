import { Gym } from '@prisma/client'
import { GymRepository } from '../gym-repository'

export class InMemoryGymRepoitory implements GymRepository {
  public data: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.data.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
