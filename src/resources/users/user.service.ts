/**
 * @module users_service
 */

import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from '../../common/constants';
import { CustomErrors, errorNames, errorMessages, requestedObjects } from '../../common/errors.object';
import { User } from '../../common/types';
import { validateID } from '../../common/utils';
import { getAllDB, getOneDB, addUserDB, updateUserDB, deleteUserDB} from './user.memory.repository';

/**
 * Return the array of Users
 * @returns The array of Users
 */

export const getAll = () => getAllDB();

/**
 * Validate id and return the User object
 * @async
 * @param {string} id - The id of User
 * @throws - Throw Error if invalid id
 * @returns - The founded User object or throw exeption
 */

export const getOne = async (id: string): Promise<User> => {
  if (!validateID(id)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.user
    );
  const oneUser = await getOneDB(id);
  return oneUser;
};

/**
 * Generate and add id to User object and pass new User object to addUserDB function, return new User
 * @async
 * @param {User} data - The User object
 * @returns - New User object
 */

export const addUser = async (data: User): Promise<User> => {
  const id = uuidv4();
  const newUser = { ...data, id };
  const addedUser = await addUserDB(newUser);
  return addedUser;
};

/**
 * Validate id, pass id and data to updateUserDB to update User object, return updated User object
 * @async
 * @param {string} id - The id of User object
 * @param {User} data - Data for update User object
 * @throws - Throw Error if invalid id
 * @throws - Throw Error if updated user is not exist
 * @returns - The updated User object
 */

export const updateUser = async (id: string, data: User): Promise<User> => {
  if (!validateID(id)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.user
    );
  const updatedUser = await updateUserDB(id, data);
  if(!updatedUser) throw new CustomErrors(
    errorNames.NFE, StatusCodes.notFound, requestedObjects.user + errorMessages.notExist
    );
  return updatedUser;
};

/**
 * Validate User id , pass id to deleteUserDB and return array of Users
 * @async
 * @param {string} id - The id of User object
 * @throws - Throw Error if invalid id
 * @returns - The new User array
 */
export const deleteUser = async (id: string): Promise<User[]> => {
  if (!validateID(id)) throw new CustomErrors(
    errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + requestedObjects.user
    );
  const newUsersArray = deleteUserDB(id);
  return newUsersArray;
};
