import express from 'npm:express';
import router from "./src/routes/orbitas.routes.ts";
import { Mongoose } from './src/services/mongoose_services.ts'; 


Mongoose.getInstance();

const app = express()
app.use(express.json())

app.use(router)

app.listen(3000 , () => {
    console.log('Server is renuning on port 3000');
});



