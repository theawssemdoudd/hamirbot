// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Task 1', url: 'https://example.com/task1' },
      { title: 'Task 2', url: 'https://example.com/task2' },
      { title: 'Task 3', url: 'https://example.com/task3' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
