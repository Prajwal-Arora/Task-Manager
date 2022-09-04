const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/schemas/user');
const Task = require('../../src/schemas/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'TestUser1',
  email: 'testOne@gmail.com',
  password: 'Hello@123',
  tokens: [
    {
      token: jwt.sign(
        { _id: userOneId },
        'ascxaw5a4dc9ase8dc6atransXSeCret!31sd65cv4s'
      ),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'TestUser2',
  email: 'testTwo@gmail.com',
  password: 'Ola@123',
  tokens: [
    {
      token: jwt.sign(
        { _id: userTwoId },
        'ascxaw5a4dc9ase8dc6atransXSeCret!31sd65cv4s'
      ),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second task',
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third task',
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
