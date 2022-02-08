import { UserType } from "../enums/user-type";

export class User {
    id!: string;
    name: string = '';
    email: string = '';
    type: UserType = UserType.ADMIN;
}
