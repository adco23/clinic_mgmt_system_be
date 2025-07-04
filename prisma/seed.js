const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Users
  const alice = await prisma.User.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      username: 'alice',
      password: '12345',
    },
  });

  const bob = await prisma.User.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      username: 'bob',
      password: '12345',
    },
  });

  const admin = await prisma.User.upsert({
    where: { email: 'admin@prisma.io' },
    update: {},
    create: {
      email: 'admin@prisma.io',
      username: 'admin',
      password: '12345',
    },
  });

  // Specialties
  const cardiology = await prisma.Specialty.upsert({
    where: { name: 'Cardiology' },
    update: {},
    create: {
      name: 'Cardiology',
    },
  });

  const dermatology = await prisma.Specialty.upsert({
    where: { name: 'Dermatology' },
    update: {},
    create: {
      name: 'Dermatology',
    },
  });
  const neurology = await prisma.Specialty.upsert({
    where: { name: 'Neurology' },
    update: {},
    create: {
      name: 'Neurology',
    },
  });

  // Doctors
  const doctorAlice = await prisma.Doctor.upsert({
    where: { dni: '12345678' },
    update: {},
    create: {
      firstName: 'Alice',
      lastName: 'Smith',
      phone: '123-456-7890',
      dni: '12345678',
      userId: alice.id,
      specialtyId: cardiology.id,
    },
  });

  const doctorBob = await prisma.Doctor.upsert({
    where: { dni: '87654321' },
    update: {},
    create: {
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: '123-456-7890',
      dni: '87654321',
      userId: bob.id,
      specialtyId: dermatology.id,
    },
  });

  const staffCharlie = await prisma.Staff.upsert({
    where: { dni: '11223344' },
    update: {},
    create: {
      firstName: 'Charlie',
      lastName: 'Williams',
      phone: '123-456-7890',
      dni: '11223344',
      userId: admin.id,
      role: 'receptionist', // Example role
    },
  });

  // Patients
  const patientAlice = await prisma.Patient.upsert({
    where: { dni: '99887766' },
    update: {},
    create: {
      dni: '99887766',
      name: 'Alice Doe',
      email: 'alice.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Springfield',
      dateOfBirth: new Date('1990-01-01'),
    },
  });

  const patientBob = await prisma.Patient.upsert({
    where: { dni: '66554433' },
    update: {},
    create: {
      dni: '66554433',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '123-456-7890',
      address: '456 Elm St, Springfield',
      dateOfBirth: new Date('1992-02-02'),
    },
  });
  // Appointments
  const appointment1 = await prisma.Appointment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      date: new Date('2023-10-01T10:00:00Z'),
      status: 'scheduled',
      patientId: patientAlice.id,
      doctorId: doctorAlice.id,
    },
  });
  const appointment2 = await prisma.Appointment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      date: new Date('2023-10-02T11:00:00Z'),
      status: 'scheduled',
      patientId: patientBob.id,
      doctorId: doctorBob.id,
    },
  });
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
