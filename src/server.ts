import App from '@/app';
import IndexRoute from '@routes/index.route';
import AuthRoute from './routes/auth.route';
import CustomersRoute from './routes/customers.route';
import RolesRoute from './routes/roles.route';
import UsersRoute from './routes/users.route';
import KeysRoute from './routes/keys.route';

const app = new App([new IndexRoute(), new AuthRoute(), new RolesRoute(), new UsersRoute(), new CustomersRoute(), new KeysRoute()]);

app.listen();
