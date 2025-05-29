
import { faker } from '@faker-js/faker';
import fs from 'fs';

// --- Lookup values ---
const ROLE_NAMES = ['Admin', 'Sales', 'Engineering'];
const REGION_NAMES = ['North', 'South', 'East', 'West', 'Central'];
const STATUS_NAMES = ['Open', 'Closed', 'In Progress'];
const PROJECT_NAMES = ['Apollo', 'Zeus', 'Hermes', 'Athena', 'Orion'];

// --- Generate lookup tables with UUID IDs ---
const generateLookup = (names, keyName) =>
  names.map(name => ({ [`id`]: faker.string.uuid(), name }));

const roles = generateLookup(ROLE_NAMES, 'role');
const regions = generateLookup(REGION_NAMES, 'region');
const statuses = generateLookup(STATUS_NAMES, 'status');
const projects = generateLookup(PROJECT_NAMES, 'project');

// --- Helper ---
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRoleIdByName = (name) => roles.find(r => r.name === name).id;

// --- Generate Users ---
const NUM_USERS = 1000000;
const users = Array.from({ length: NUM_USERS }).map(() => {
  const role = randomElement(roles);
  return {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'Passw0rd',
    phone_number: faker.phone.number('+91-####-######'),
    role_id: role.id,
  };
});

// Separate users by role for later usage
const salesUsers = users.filter(u => u.role_id === getRoleIdByName('Sales'));
const engineeringUsers = users.filter(u => u.role_id === getRoleIdByName('Engineering'));

// --- Generate Sales Records ---
const NUM_SALES = 100000;
const sales = Array.from({ length: NUM_SALES }).map(() => {
  const user = randomElement(salesUsers);
  return {
    id: faker.string.uuid(),
    user_id: user.id,
    region_id: randomElement(regions).id,
    status_id: randomElement(statuses).id,
    sales_amount: Number(faker.finance.amount(100, 10000, 2)),
    date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
  };
});

// --- Generate Engineering Logs ---
const NUM_LOGS = 100000;
const engineeringLogs = Array.from({ length: NUM_LOGS }).map(() => {
  const user = randomElement(engineeringUsers);
  return {
    id: faker.string.uuid(),
    user_id: user.id,
    project_id: randomElement(projects).id,
    status_id: randomElement(statuses).id,
    region_id: randomElement(regions).id,
    date: faker.date.past({ years: 1 }).toISOString().split('T')[0],
  };
});
export {
    roles,
    engineeringLogs,
    projects,
    sales,
    statuses,
    users,
    regions
}