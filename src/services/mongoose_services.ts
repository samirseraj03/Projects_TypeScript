import mongoose from 'npm:mongoose';
import dotenv from 'npm:dotenv';
import process from "node:process";

// Load environment variables
dotenv.config();
// creat constant environment
const mongoUrl = process.env.MONGO_URL as string;
const dbName = process.env.DB_NAME as string

export class Mongoose {

    private static instance: Mongoose;
    private isConnected = false;

    private constructor() {
        // debug mongoose
        mongoose.set('debug', true);
    }

    // Method to get the singleton instance of the class
    public static getInstance(): Mongoose {
        if (!this.instance) {
            this.instance = new Mongoose();
        }
        return this.instance;
    }

    // Automatically connect to the database
    public async connect(): Promise<void> {
        if (this.isConnected) return;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName , 
              });
            this.isConnected = true;
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    // Automatically close the connection when the process ends
    private async disconnect(): Promise<void> {
        if (!this.isConnected) return;

        try {
            await mongoose.connection.close();
            this.isConnected = false;
            console.log('MongoDB disconnected successfully');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }

    // Set up graceful shutdown when the process exits
    public setupGracefulShutdown(): void {
        process.on('SIGINT', async () => {
            await this.disconnect();
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await this.disconnect();
            process.exit(0);
        });
    }
}

// Automatic initialization
const mongooseInstance = Mongoose.getInstance();
mongooseInstance.setupGracefulShutdown();

