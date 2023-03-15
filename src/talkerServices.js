const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '/talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return console.error(`Cannot read the file: ${error}`);
  }
};

const getAllUsers = async () => {
  const talkerUsers = await readTalkerFile();
  return talkerUsers;
};

const getUserById = async (id) => {
  const talkerUsers = await readTalkerFile();
  return talkerUsers
    .find((user) => user.id === id);
};

const generateRandomChar = () => {
  const isNumber = Math.random() < 0.5;
  const isUpperCase = Math.random() < 0.5;
  const randomCharCode = isNumber
    ? Math.floor(Math.random() * 10) + 48
    : Math.floor(Math.random() * 26) + (isUpperCase ? 65 : 97);
  return String.fromCharCode(randomCharCode);
};

const generateRandomToken = () => {
  const asterisks = '*'.repeat(16);
  const randomToken = Array.from(asterisks, generateRandomChar).join('');
  return randomToken;
};

module.exports = {
  getAllUsers,
  getUserById,
  generateRandomToken,
};
