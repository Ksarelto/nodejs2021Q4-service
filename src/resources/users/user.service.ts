/**
 * @module users_service
 */

import { v4 as uuidv4 } from 'uuid';
import { User } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllDB, getOneDB, addUserDB, updateUserDB, deleteUserDB} from './user.memory.repository';

/**
 * This function return the array of Users
 * @returns The array of Users
 */

export const getAll = () => getAllDB();

/**
 * This function validate id and return the User object
 * @param id - The id of User
 * @returns The founded User object or throw exeption
 */

export const getOne = async (id: string) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const oneUser = await getOneDB(id);
  return oneUser;
};

/**
 * This function generate and add id to User object and pass new User object to addUserDB function, return new User
 * @param data - The User object
 * @returns New User object
 */

export const addUser = async (data: User) => {
  const id = uuidv4();
  const newUser = { ...data, id };
  const addedUser = await addUserDB(newUser);
  return addedUser;
};

/**
 * This function validate id, pass id and data to updateUserDB to update User object, return updated User object
 * @param id - The id of User object
 * @param data - Data for update User object
 * @returns The updated User object
 */

export const updateUser = async (id: string, data: User) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const updatedUser = await updateUserDB(id, data);
  return updatedUser;
};

/**
 * This function validate User id , pass id to deleteUserDB and return array of Users
 * @param id - The id of User object
 * @returns The new User array
 */
export const deleteUser = async (id: string) => {
  if (!validateID(id)) throw new Error('Invalid id');
  const newUsersArray = deleteUserDB(id);
  return newUsersArray;
};
