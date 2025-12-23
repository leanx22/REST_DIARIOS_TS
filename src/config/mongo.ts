import { MongoClient, Db } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME!;

let db: Db;

export async function connectMongo(): Promise<Db> {
    if(!db){
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
    }
    return db;
}