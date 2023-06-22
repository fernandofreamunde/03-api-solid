import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  // with the unchecked interface, we are not creating a new gym/user
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
