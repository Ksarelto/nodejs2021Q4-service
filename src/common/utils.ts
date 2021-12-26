/**
 * @module utils
 */
import { User, SearchedArray } from "./types";
import { StatusCodes } from './constants';
import { CustomErrors, errorMessages, errorNames } from "./errors.object";

/**
 * Remove field password from User object and return new User object
 * @param {User} user - Is a User object
 * @returns - The User without field password
 */

export const toResponse = (user: User): Omit<User,'password'> => {
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

/**
 * Check the existance of some Item in Array
 * @param {T} arr - Array of Items
 * @param {string | undefined} id - Id of searched item in array
 * @param {string} name - Nmae of the Array of the Items
 * @throws - Error message if id is not exist
 * @throws - Error message if searchedItem is not find
 * @returns - Searched Item
 */

export const checkExistence = <T extends SearchedArray>(
  arr: T[], id: string | undefined, name: string
  ): SearchedArray => {
  if(!id) throw new CustomErrors(errorNames.VE, StatusCodes.invalidId, errorMessages.invalid + name);
  const searchedItem = arr.find((item) => item.id === id);
  if (!searchedItem) throw new CustomErrors(
    errorNames.NFE, StatusCodes.notFound, name + errorMessages.notExist
    );
  return searchedItem;
};
