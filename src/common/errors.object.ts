/**
 * @module error_classes
 */

/**
 * Custom class that extends class Error
 * @class CustomErrors
 * @public
 */
export class CustomErrors extends Error{
  /**
   * Constructor of class CustomErrors
   * @param {string} name name of the error 
   * @param {number} code response status code
   * @param {string} message message of error
   */
  constructor(public name: string, public code: number, public message: string){
    super(name);
  }
}

export const requestedObjects = {
  task: 'Task',
  board: 'Board',
  user: 'User'
}

export const errorNames = {
  NFE : 'Not Found Error',
  VE : 'Validation Eroor',
}

export const errorMessages = {
  invalid: 'Invalid id of ',
  notExist: ' is not exist'
}