import { MongoClient, Db } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME!;

let db: Db;

export async function connectMongo(): Promise<Db> {
    if(!db){
        const client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000
        });
        await client.connect();
        db = client.db(dbName);

        console.log("Conectado a MongoDB");

        await setupIndexes(db);

    }
    return db;
}


async function setupIndexes(db:Db) {
    try {
        const usersCollection = db.collection("users");

        await usersCollection.createIndex(
            { email: 1 },    
            { unique: true }
        );

        console.log("Indices de la colección usuarios creado en la BD.");

    } catch (error) {
        console.error("Error configurando índices de MongoDB:", error);
        process.exit(1);
    }
}
