/**
 * @module users_memory_methods
 */

import {db} from '../../../db/db';
import { Tasks, User } from '../../common/types';
import { checkExistence } from '../../common/utils';

/**
 * This function get all users from database and return them
 * @returns Array of Users
 */

export const getAllDB = async () => {
  const allUsers = await db.users;
  return allUsers;
};

/**
 * This function get one User from database and return him
 * @param id - Id of the User
 * @returns The User
 */

export const getOneDB = async (id: string) => {
  const foundedUser = await db.users.find((user: User) => user.id === id);
  if(foundedUser) return foundedUser;
  throw new Error('User is not exist');
};

/**
 * This function add User to database and return it
 * @param data - It is an object of type User
 * @returns Return added user
 */

export const addUserDB = async (data: User) => {
  const { users } = await db;
  db.users = [...users, data];
  return data;
};

/**
 * This function update data of one User and return updated User
 * @param id - Is an id of updated User
 * @param data - Is an object with data of updated User
 * @returns The updated User
 */

export const updateUserDB = async (id: string, data: User) => {
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
  return updatedUser as User;
};

/**
 * This function delete the user from database and return new array of Users
 * @param id - Is an id of the User
 * @returns The new array of Users
 */

export const deleteUserDB = async (id: string) => {
  const { users, tasks } = await db;
  checkExistence(users, id, 'User');
  const newUsersArray = users.filter((user: User) => user.id !== id);
  const newTasksArray = tasks.map((task: Tasks) => {
    if (task.userId === id) return { ...task, userId: null };
    return task;
  });
  db.users = newUsersArray;
  db.tasks = newTasksArray;
  return newUsersArray;
};

