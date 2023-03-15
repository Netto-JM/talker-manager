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

const writeTalkerFile = async (talkerUsers) => {
  const path = '/talker.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(talkerUsers));
  } catch (error) {
    console.error(`Cannot write to the file: ${error}`);
  }
};

const getNextIdValue = (talkerUsers) => {
  const lastUserId = talkerUsers[talkerUsers.length - 1].id;
  const nextIdValue = lastUserId + 1;
  return nextIdValue;
};

const deleteUserById = (talkerUsers, id) => {
  const userIndex = talkerUsers.findIndex((user) => user.id === id);
  if (userIndex !== -1) talkerUsers.splice(userIndex, 1);
};

const deleteTalkerUser = async (id) => {
  const talkerUsers = await readTalkerFile();
  deleteUserById(talkerUsers, id);
  writeTalkerFile(talkerUsers);
};

const editTalkerFile = async (newUser) => {
  const talkerUsers = await readTalkerFile();
  if (newUser.id) deleteUserById(talkerUsers, newUser.id);
  const newUserWithId = {
    id: getNextIdValue(talkerUsers),
    ...newUser,
  };
  talkerUsers.push(newUserWithId);
  writeTalkerFile(talkerUsers);
  return newUserWithId;
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

const getUsersByName = async (name) => {
  const talkerUsers = await readTalkerFile();
  return talkerUsers
    .filter((user) => user.name.includes(name));
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
  editTalkerFile,
  deleteTalkerUser,
  getUsersByName,
};
