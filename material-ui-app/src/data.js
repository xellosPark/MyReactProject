import { v4 as uuidv4 } from 'uuid';

const generateData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      id: uuidv4(),
      name: `User ${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
      email: `user${i + 1}@example.com`,
      address: `Address ${i + 1}`,
      phone: `+123456789${i}`,
      company: `Company ${i + 1}`,
      department: `Dept ${i + 1}`,
      role: `Role ${i + 1}`,
      colorState: 'rad',
    });
  }
  return data;
};

export default generateData;