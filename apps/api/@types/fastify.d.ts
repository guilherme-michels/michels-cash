import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserInvestmentsMembership(
      investmentId: string
    ): Promise<{ membership: Member }>
  }
}
