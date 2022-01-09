/**
 * @module types
 */

/**
 * Interfacce of User Object
 * @name User
 * @type {User}
 * @interface
 */

export interface User {
  id?: string;
  name: string;
  login: string;
  password: string;
}

/**
 * Interfacce of Boards Object
 * @name Board
 * @type {Board}
 * @interface
 */

export interface Board {
  id?: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
  }[];
}

/**
 * Interfacce of Task Object
 * @name Task
 * @type {Task}
 * @interface
 */

export interface Task {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

/**
 * Interfacce of Database Object
 * @name DataBase
 * @type {DataBase}
 * @interface
 */

export interface DataBase {
  users: User[];
  boards: Board[];
  tasks: Task[];
}

/**
 * Interface union object
 * @name SearchedArray
 * @type {SearchedArray}
 * @interface
 */

export interface SearchedArray {
  id?: string;
}
