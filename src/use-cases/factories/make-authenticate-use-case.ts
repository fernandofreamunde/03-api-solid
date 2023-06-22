import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export default function makeAuthenicateUseCase(): AuthenticateUseCase {
  const userRepo = new PrismaUsersRepository()
  const usecase = new AuthenticateUseCase(userRepo)

  return usecase
}
