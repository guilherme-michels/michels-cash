import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { registerAuthRoutes } from './routes/auth/_auth.routes'
import { registerFinancialPlanningRoutes } from './routes/financial-planning/_financial-planning.routes'
import { registerInvestmentGroupsRoutes } from './routes/investment-groups/_investment-groups.routes'
import { registerInvestmentPlansRoutes } from './routes/investment-plans/_investment-plans.routes'
import { registerInvestmentsRoutes } from './routes/investments/_investments.routes'
import { registerInviteRoutes } from './routes/invites/_invites.routes'
import { registerMembersRoutes } from './routes/members/_member.routes'
import { registerNotificationsRoutes } from './routes/notifications/_notifications.routes'
import { registerTransactionsRoutes } from './routes/transactions/_transactions.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors)
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
dotenv.config()

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Michels Cash',
      description: 'Full-stack Michels Cash',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

app.register(fastifyJwt, {
  secret: jwtSecret,
})

registerInviteRoutes(app)
registerAuthRoutes(app)
registerMembersRoutes(app)
registerInvestmentPlansRoutes(app)
registerInvestmentsRoutes(app)
registerInvestmentGroupsRoutes(app)
registerNotificationsRoutes(app)
registerFinancialPlanningRoutes(app)
registerTransactionsRoutes(app)

const serverPort = process.env.SERVER_PORT
if (!serverPort) {
  throw new Error('SERVER_PORT environment variable is not defined')
}

const portNumber = parseInt(serverPort, 10)

app.listen({ port: portNumber }).then(() => {
  console.log(`HTTP server running on port ${portNumber}!`)
})
