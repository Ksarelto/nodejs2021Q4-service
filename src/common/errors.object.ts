export class CustomErrors extends Error{
  constructor(public name: string, public code: number, public message: string){
    super(name);
  }
}

export class ValidationErrors extends CustomErrors {}
export class UsersErrors extends CustomErrors {}

