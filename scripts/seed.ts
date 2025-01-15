import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // إضافة مستخدم مثال
  const user = await prisma.user.create({
    data: {
      telegramId: 123456,
      username: 'exampleuser',
      firstName: 'Example',
      lastName: 'User',
    },
  });

  // إضافة مهمتين للمستخدم
  const task1 = await prisma.task.create({
    data: {
      title: 'Complete the report',
      url: 'http://example.com/report',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Attend the meeting',
      url: 'http://example.com/meeting',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Tasks added:', { task1, task2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
