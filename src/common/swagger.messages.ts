export enum SwaggerDescription {
  createBoard = 'New board was created',
  getBoardAll = 'Get all boards',
  getBoard = 'Get one board',
  updateBoard = 'Board was updated',
  deleteBoard = 'Board was deleted',
  createUser = 'New user was created',
  getAllUsers = 'Get all users',
  getUser = 'Get one user',
  updateUser = 'User was updated',
  deleteUser = 'User was deleted',
  createTask = 'New task was created',
  getAllTasks = 'Get all tasks',
  getTask = 'Get one task',
  updateTask = 'Task was updated',
  deleteTask = 'Task was deleted',
  createColumn = 'New column was created',
  getAllColumns = 'Get all columns',
  getOneColumn = 'Get one column',
  updateColumn = 'Column was updated',
  deleteColumn = 'Column was deleted',
  fileUpload = 'File uploaded',
  fileDownload = 'File downloaded',
  logIn = 'User was log in',
  registr = 'New user was registered',
  sayHell = 'Say Hello',
}

export enum SwaggerSummary {
  createBoard = 'Create new board',
  getAllBoard = 'Get all boards',
  getOneBoard = 'Get board by id',
  updateBoard = 'Update one board',
  deleteBoard = 'Delete one board',
  createUser = 'Create new user',
  getAllUsers = 'Get all users',
  getOneUser = 'Get user by id',
  updateUser = 'Update one user',
  deleteUser = 'Delete one user',
  createTask = 'Create new task',
  getAllTasks = 'Get all tasks',
  getOneTask = 'Get task by id',
  updateTask = 'Update one task',
  deleteTask = 'Delete one task',
  createColumn = 'Create new column',
  getAllColumns = 'Get all columns',
  getOneColumn = 'Get column by id',
  updateColumn = 'Update one column',
  deleteColumn = 'Delete one column',
  fileUpload = 'Upload file to server',
  fileDownload = 'Download file from server',
  logIn = 'Log in user',
  registr = 'Registr new user',
  primeRoute = 'Primary route',
}

export enum SwaggerTags {
  board = 'Boards',
  task = 'Tasks',
  user = 'Users',
  column = 'Columns',
  files = 'Files',
  auth = 'Authentification',
  primary = 'Primary',
}

export enum SwaggerResponse {
  forbidden = 'Forbidden',
  unauthorized = 'Unauthorized or no auth header',
}
