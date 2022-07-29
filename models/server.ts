import express, { Application }  from 'express';
import usersRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Serve{
    private app: express.Application;
    private port: string;
    private paths = {
        users:'/api/users'
    }
    constructor(){ 
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    middlewares(){

        //cors
        this.app.use( cors() );
        
        //lectura del body
        this.app.use( express.json() );

        //carpeta puublica
        this.app.use( express.static('public') );
    }
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    routes(){
         this.app.use(this.paths.users,usersRoutes)
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ' + this.port);
            
        })
    }
}

export default Serve;