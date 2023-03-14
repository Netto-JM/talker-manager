const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '/talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
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

module.exports = {
  getAllUsers,
  getUserById,
};
