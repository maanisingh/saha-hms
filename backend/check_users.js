import prisma from './src/config/prismaClient.js';

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true
      },
      orderBy: { id: 'asc' }
    });
    
    console.log('\n=== EXISTING USERS IN DATABASE ===\n');
    console.log('Total Users:', users.length);
    console.log('\nUser List:');
    users.forEach(user => {
      console.log(`ID: ${user.id} | Email: ${user.email} | Role: ${user.role} | Name: ${user.firstName} ${user.lastName}`);
    });
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    await prisma.$disconnect();
  }
}

checkUsers();
