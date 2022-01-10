/**
 * @module users_memory_methods
 */

import { DeleteResult, getRepository } from 'typeorm';
import { User } from '../../common/types';
import { EntUser } from '../../typeorm/entities/user.entity';

/**
 * Get all User`s objects from database and return them
 * @async
 * @returns - Array of Users objects
 */

export const getAllDB = async (): Promise<User[]> => {
  const users = await getRepository(EntUser).find();
  return users;
};

/**
 * Get one User object from database and return him
 * @async
 * @param {string} id - Id of the User object
 * @throw - Throws Error if User object is not found
 * @returns - The User object
 */

export const getOneDB = async (id: string): Promise<User> => {
  const user = await getRepository(EntUser).findOneOrFail(id);
  return user;
};

/**
 * Add new User object to database and return it
 * @async
 * @param {User} data - It is an object of type User
 * @returns - Return added User object
 */

export const addUserDB = async (data: User): Promise<User> => {
  const user = await getRepository(EntUser).save(data);
  return user;
};

/**
 * Update data of one User and return updated User
 * @async
 * @param {string} id - Is an id of updated User
 * @param {User} data - Is an object with data of updated User
 * @throw - Throws Error if User object is not found
 * @returns - The updated User object
 */

export const updateUserDB = async (id: string, data: User): Promise<User> => {
  await getRepository(EntUser).findOneOrFail(id);
  const updatedUser = await getRepository(EntUser).save(data);
  return updatedUser;
};

/**
 * Delete the user from database, if id===task.userId set it to null and return new array of Users
 * @async
 * @param {string} id - Is an id of the User object
 * @returns - The new array of Users objects
 */

export const deleteUserDB = async (id: string): Promise<DeleteResult> => {
  const deletedUser = await getRepository(EntUser).delete(id);
  return deletedUser;
};
