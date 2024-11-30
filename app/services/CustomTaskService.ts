import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { DATABASE_TABLE_NAME } from "../model/DatabaseProperties";

export class CustomTaskService {
    private static USER_ID_FIELD = 'userId';

    static async getTasks(userId: string) {
        const getQuery = query(
            collection(db, DATABASE_TABLE_NAME.TASKS),
            where(CustomTaskService.USER_ID_FIELD, "==", userId)
        );

        return getDocs(getQuery);
    }

    static async saveTask(taskDocument) {
        return addDoc(collection(db, DATABASE_TABLE_NAME.TASKS), { ...taskDocument });
    }
}