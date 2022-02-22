import { Server } from './server/server';
import router from './router/router';
const server=Server.init(3000);


server.app.use(router);


server.start(()=>{
    console.log('Aplicaccion corriendo por el puerto 3000');
})