import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export default function makeRegisterUseCase(): RegisterUseCase {
  const userRepo = new PrismaUsersRepository()
  const usecase = new RegisterUseCase(userRepo)

  return usecase
}
