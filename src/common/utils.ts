/**
 * @module utils
 */
import { User } from './types';

/**
 * Remove field password from User object and return new User object
 * @param {User} user - Is a User object
 * @returns - The User without field password
 */

export const toResponse = (user: User): Omit<User, 'password'> => {
  const { name, login, id } = user;
  return { name, login, id };
};

/**
 * This function validate id
 * @param {string | undefined} id - Is an id parametr of Item
 * @returns - If id valid return true, else false
 */

export const validateID = (id: string | undefined): boolean => {
  if (id === undefined) return false;
  if (!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g))
    return false;
  return true;
};
