import IndexController from '@controllers/index.controller';
import { Route } from '@interfaces/routes.interface';

class IndexRoute extends Route {
  configureRoutes(): void {
    this.router.get(`/`, IndexController.index);
  }

  getPath(): string {
    return '/';
  }
}

export default IndexRoute;
