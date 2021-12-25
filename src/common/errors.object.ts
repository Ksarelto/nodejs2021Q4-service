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

/**
 * Custom class that extends class CustomErrors
 * @class ValidationErrors
 * @public
 */

export class ValidationErrors extends CustomErrors {}

/**
 * Custom class that extends class CustomErrors
 * @class UsersErrors
 * @public
 */

export class UsersErrors extends CustomErrors {}

