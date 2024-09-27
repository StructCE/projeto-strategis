import z from 'zod'

const countOperationsProps = z.object({
  periodTime: z.number()
})

type CountOperationProps = z.infer<typeof countOperationsProps>

export type OperationRepositoryInterfaces = {
  CountOperationProps: CountOperationProps
}

export const operationRepositorySchema = {
  countOperationsProps
}