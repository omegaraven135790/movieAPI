import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import contractJson from '../../prisma/contract.json' with { type: 'json' };

const prisma = postgres({
    contract: contractFromJson(contractJson),
    url: process.env.DATABASE_URL,
});

const connectDB = async () => {
    try {
        await prisma.connect({ url: process.env.DATABASE_URL });
        console.log("Connected to the database successfully through Prisma.");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.close();
        console.log("Disconnected from the database successfully.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

export {prisma, connectDB, disconnectDB};