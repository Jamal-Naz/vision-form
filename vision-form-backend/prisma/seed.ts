import {PrismaClient} from '@prisma/client';
import appConfig from '../src/config';

const prismaLocal = new PrismaClient({
  datasources: {
    db: {
      url: appConfig.DATABASE_URL,
    },
  },
});


async function main() {
  console.log(`Start seeding ...`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prismaLocal.$disconnect();
  })
  .catch(async (e) => {
    await prismaLocal.$disconnect();
    process.exit(1);
  });
