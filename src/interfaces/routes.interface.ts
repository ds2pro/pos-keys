import { Router } from 'express';

interface IRoute {
  path: string;
}

export abstract class Route implements IRoute {
  readonly router: Router = Router();
  path: string;

  constructor() {
    this.configureRoutes();
    this.path = this.getPath();
  }

  /***
   * @returns the leading path of the api. For instance, /users
   */
  abstract getPath(): string;

  abstract configureRoutes(): void;
}
