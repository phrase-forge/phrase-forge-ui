import { UserRole } from "../model/ApplicationUser";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { DATABASE_TABLE_NAME } from "../model/DatabaseProperties";
import { User } from "firebase/auth";


export class UserService {
    static getUserDataById(userId: string) {
        return getDoc((doc(db, DATABASE_TABLE_NAME.USERS, userId)));
    }

    static addUser(user: User) {
        return addDoc(collection(db, DATABASE_TABLE_NAME.USERS), {
            id: user.uid,
            email: user.email,
            roles: [UserRole.USER]
        });
    }
}