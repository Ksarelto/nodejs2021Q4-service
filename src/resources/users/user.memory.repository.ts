/**
 * @module users_memory_methods
 */

import {db} from '../../../db/db';
import { Task, User } from '../../common/types';
import { checkExistence } from '../../common/utils';

/**
 * Get all User`s objects from database and return them
 * @async
 * @returns - Array of Users objects
 */

export const getAllDB = async (): Promise<User[]> => {
  const allUsers = await db.users;
  return allUsers;
};

/**
 * Get one User object from database and return him
 * @async
 * @param {string} id - Id of the User object
 * @throw - Throws Error if User object is not found
 * @returns - The User object
 */

export const getOneDB = async (id: string): Promise<User> => {
  const {users} = await db;
  const foundedUser = users.find((user: User) => user.id === id);
  if(!foundedUser) throw new Error('User is not exist');
  return foundedUser;
};

/**
 * Add new User object to database and return it
 * @async
 * @param {User} data - It is an object of type User
 * @returns - Return added User object
 */

export const addUserDB = async (data: User): Promise<User> => {
  const { users } = await db;
  db.users = [...users, data];
  return data;
};

/**
 * Update data of one User and return updated User
 * @async
 * @param {string} id - Is an id of updated User
 * @param {User} data - Is an object with data of updated User
 * @returns - The updated User object
 */

export const updateUserDB = async (id: string, data: User): Promise<User | undefined> => {
  const { users } = await db;
  checkExistence(users, id, 'User');
  const updatedUsers = users.map((user: User) => {
    if (user.id === id) {
     return { ...data, id: user.id };
    }
    return user;
  });

  db.users = updatedUsers;
  const updatedUser = updatedUsers.find((user) => user.id === id);
  return updatedUser;
};

/**
 * Delete the user from database, if id===task.userId set it to null and return new array of Users
 * @async
 * @param {string} id - Is an id of the User object
 * @returns - The new array of Users objects
 */

export const deleteUserDB = async (id: string): Promise<User[]> => {
  const { users, tasks } = await db;
  checkExistence(users, id, 'User');
  const newUsersArray = users.filter((user: User) => user.id !== id);
  const newTasksArray = tasks.map((task: Task) => {
    if (task.userId === id) return { ...task, userId: null };
    return task;
  });
  db.users = newUsersArray;
  db.tasks = newTasksArray;
  return newUsersArray;
};

