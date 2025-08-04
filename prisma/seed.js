const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { Roles } = require('../src/utils/constants');

async function main() {
  // const createMany = await prisma.Role.createMany({
  //   data: [
  //     { id: 1, name: Roles.ADMIN },
  //     { id: 2, name: Roles.GUEST },
  //     { id: 3, name: Roles.DOCTOR },
  //     { id: 4, name: Roles.RECEPTIONIST },
  //     { id: 5, name: Roles.PATIENT },
  //   ],
  //   skipDuplicates: true,
  // })

  const pass = "$2a$12$BtCwvP9BZ/q/ms7m5Ftg7.adktLjczxl/oAdem/C94.tv0kDvh1RW";

  const [adminRole, doctorRole, staffRole, guestRole] = await Promise.all([
    prisma.Role.upsert({ where: { name: Roles.ADMIN }, update: {}, create: { name: Roles.ADMIN } }),
    prisma.Role.upsert({ where: { name: Roles.DOCTOR }, update: {}, create: { name: Roles.DOCTOR } }),
    prisma.Role.upsert({ where: { name: Roles.STAFF }, update: {}, create: { name: Roles.STAFF } }),
    prisma.Role.upsert({ where: { name: Roles.GUEST }, update: {}, create: { name: Roles.GUEST } }),
  ]);

  const [cardiologySpecialty, generalMedicineSpecialty] = await Promise.all([
    prisma.Specialty.upsert({ where: { name: 'Cardialgia' }, update: {}, create: { name: 'Cardialgia' } }),
    prisma.Specialty.upsert({ where: { name: 'Medicina General' }, update: {}, create: { name: 'Medicina General' } })
  ]);

  const [doctorUser, adminUser] = await Promise.all([
    prisma.User.create({ data: {
      email: "doctor@mail.com",
      username: "doctorUser",
      password: pass,
      roles: {
        create: [
          { role: { connect: { id: doctorRole.id }}}
        ]
      }
    }}),
    prisma.User.create({ data: {
      email: "admin@mail.com",
      username: "adminUser",
      password: pass,
      roles: {
        create: [
          { role: { connect: { id: adminRole.id }}},
          { role: { connect: { id: staffRole.id }}},
        ]
      }
    }})
  ]);

  const doctor = await prisma.Doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      specialtyId: cardiologySpecialty.id,
      firstName: "Doctor",
      lastName: "Example",
      phone: "1234567890",
    }
  });

  const staff = await prisma.Staff.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      firstName: "Staff",
      lastName: "Example",
      phone: "0987654321",
    }
  });

  const patients = await prisma.patient.createMany({
    data: [
      {
        name: "Patient1",
        email: "patient1@mail.com",
        dni: "12345678",
        dateOfBirth: new Date('1990-01-01'),
        address: "123 Main St",
        phone: "1234567890",
      },
      {
        name: "Patient2",
        email: "patient2@mail.com",
        dni: "12345679",
        dateOfBirth: new Date('1990-01-01'),
        address: "123 Main St",
        phone: "1234567890",
      },
    ],
    skipDuplicates: true
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
