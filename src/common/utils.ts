/**
 * @module utils
 */
import { Context } from "koa";
import { User, SearchedArray } from "./types";
import { headers } from './constants';

/**
 * This function remove field password from User object and return new User object
 * @param {User} user - Is a User object
 * @returns The User without field password
 */

export const toResponse = (user: User): Omit<User,'password'> => {
  const { name, login, id } = user;
  return { name, login, id };
};

/**
 * This function validate id
 * @param {string | undefined} id - Is an id parametr of Item
 * @returns If id valid return true, else false
 */

export const validateID = (id: string | undefined): boolean => {
  if (id === undefined) return false;
  if (!id.match(/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/g))
    return false;
  return true;
};

/**
 * This function check the existance ofsome Item in Array
 * @param {T} arr - Array of Items
 * @param {string | undefined} id - Id of searched item in array
 * @param {string} name - Nmae of the Array of the Items
 * @throws Error message if searchedItem is not find
 * @returns Searched Item
 */

export const checkExistence = <T extends SearchedArray>(arr: T[], id: string | undefined, name: string): SearchedArray => {
  if(!id) throw new Error(`Id is not defined`);
  const searchedItem = arr.find((item) => item.id === id);
  if (!searchedItem) throw new Error(`${name} with such id is not defined`);
  return searchedItem;
};

/**
 * This function send success response with data to client
 * @param {Context} context - Is an object that include request and response of server
 * @param {T} data - Is some data that we should send to ckient
 * @param {number} code - Code number of response
 * @returns undefined 
 */

export const successResponse = <T>(context: Context, data: T, code: number) => {
  context.res.writeHead(code, headers);
  context.body = JSON.stringify(data);
};

/**
 * This function send error response with error message to client
 * @param {Context} context - Is an object that include request and response of server
 * @param {unknown} error - Is Error object
 * @param {number} code - ode number of response
 * @returns undefined
 */

export const errorResponse = (context: Context, error: unknown, code: number) => {
  context.response.status = code;
  context.body = (error as Error).message;
};
