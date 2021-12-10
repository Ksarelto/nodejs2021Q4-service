/**
 * @module types
 */

/**
 * Interfacce of User Object
 * @interface
 */

export interface User {
    id?: string,
    name: string,
    login: string,
    password: string
}

/**
 * Interfacce of Boards Object
 * @interface
 */

export interface Boards {
    id?: string,
    title: string,
    columns: {
        id: string,
        title: string,
        order: number,
    }[]
}

/**
 * Interfacce of Task Object
 * @interface
 */

export interface Tasks {
    id?: string,
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string | null,
    columnId: string | null
}

/**
 * Interfacce of Database Object
 * @interface
 */

export interface DataBase {
    users: User[],
    boards: Boards[],
    tasks: Tasks[]
}

/**
 * Interface union object
 * @interface
 */

export interface SearchedArray {
    id?: string
  }


