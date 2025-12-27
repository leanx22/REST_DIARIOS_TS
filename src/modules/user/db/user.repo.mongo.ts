import { Collection } from "mongodb";
import { connectMongo } from "../../../config/mongo";
import { User } from "../user.model";
import { UserRepository } from "../user.repository";
import { UserDocument } from "../user.mongo";

export class UserRepositoryMongo implements UserRepository {

    private collection!: Collection<UserDocument>;

    private async getCollection(): Promise<Collection<UserDocument>> {
        if (!this.collection) {
            const db = await connectMongo();
            this.collection = db.collection<UserDocument>("users");
        }
        return this.collection;
    }

    private toUser(doc: UserDocument): User {
        return {
            id: doc.id,
            email: doc.email,
            passwordHash: doc.password,
            createdAt: doc.createdAt
        };
    }

    async create(user: User): Promise<User | null> {
        const collection = await this.getCollection();

        const insertResult = await collection.insertOne({
            _id: undefined as any,
            id: user.id,
            email: user.email,
            password: user.passwordHash,
            createdAt: user.createdAt
        });

        return insertResult.acknowledged ? user : null

    }

    async findById(id: string): Promise<User | null> {
        const collection = await this.getCollection();

        const doc = await collection.findOne({ id });

        return doc ? this.toUser(doc) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const collection = await this.getCollection();

        const doc = await collection.findOne({ email });

        return doc ? this.toUser(doc): null;
    }
}
