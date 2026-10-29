import { postgresClient } from '@prisma/orm-postgres';

const prisma = new postgresClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.through prisma");
}
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from the database successfully.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

export {prisma, connectDB, disconnectDB};