import express from 'express';
import {Application} from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import cors from 'cors';

class App{
  public app: Application;
  public port: number;

  constructor(appInit: {port: number; middleWares: any; controllers: any;}){
    this.app = express();
    this.app.use(cors())
    this.port = appInit.port;
    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
    this.connectToDatabase();
  }


private connectToDatabase = async () => {
  try {
      await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process on failure
  }
}

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
        this.app.use(middleWare)
    })
}
  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
        this.app.use(controller.path, controller.router)
    })
}
  public listen(){
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }   
}

export default App;