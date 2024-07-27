import * as bodyParser from 'body-parser'

import App from './app';
import HomeController from './controllers/home.controller';
import AuthController from './controllers/auth.controller';
import ProtectedController from './controllers/protected.controller';
import {UserController } from './controllers/user.controller';
import { MissionController } from './controllers/mission.controller';
import { APRequestController } from './controllers/ap.controller';


const app = new App({
    port:3001,
    controllers: [
        new HomeController(),
        new AuthController(),
        new ProtectedController(),
        new UserController(),
        new MissionController,
        new APRequestController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ]
})

app.listen();