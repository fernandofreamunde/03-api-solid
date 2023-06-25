import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkInId: z.coerce.string().uuid(),
  })

  const { checkInId } = validateCheckinParamsSchema.parse(request.params)

  const usecase = makeValidateCheckInUseCase()

  await usecase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
