import express from 'npm:express';
import router from "./src/routes/orbitas.routes.ts";
import { Mongoose } from './src/services/mongoose_services.ts'; 


const startServer = async () => {
    try {

        console.log("hello ----------")


        const app = express();
        app.use(express.json());
        app.use(router);

        const PORT = 8090;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        const mongooseInstance = Mongoose.getInstance(); // Obtiene la instancia

        console.log("hello")

        await mongooseInstance.connect(); // connect to mongoDB

        console.log("hello 2")

        mongooseInstance.setupGracefulShutdown(); // Configura el apagado

        
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();