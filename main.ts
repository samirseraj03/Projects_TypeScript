import express from 'npm:express';
import router from "./src/routes/orbitas.routes.ts";
import { Mongoose } from './src/services/mongoose_services.ts'; 


const startServer = async () => {
    try {
        const mongooseInstance = Mongoose.getInstance(); // Obtiene la instancia
        await mongooseInstance.connect(); // connect to mongoDB
        mongooseInstance.setupGracefulShutdown(); // Configura el apagado

        const app = express();
        app.use(express.json());
        app.use(router);

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();