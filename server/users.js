const users = [];

const addUser = ({ name, room, id }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(user => user.room === room && user.name === name);
  if (existingUser) {
    return { error: 'username is taken' };
  }

  let user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = socketId => {
  const index = users.findIndex(user => user.id === socketId);
  if (index !== -1)
    return users.splice(index, 1)[0];
};

const getUser = socketId => users.find(user => user.id === socketId);

const getUsersInRoom = room => users.filter(user => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom };