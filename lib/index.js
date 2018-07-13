import App from './main';
import { Config } from './config';
const port = Config.serverPort;
const app = new App();
app.listen(port);