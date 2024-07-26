import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: 'Guilherme Michels',
      email: 'guilherme@gmail.com',
      avatarUrl: 'https://github.com/guilherme-michels.png',
      passwordHash: await hash('123456', 1),
    },
  })

  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash: await hash('123456', 1),
    },
  })

  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash: await hash('123456', 1),
    },
  })
}

seed().then(() => {
  console.log('Database seeded')
})
