import { UserType } from "../enums/user-type";

export class User {
    id!: string;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    type: UserType = UserType.ADMIN;
    bgColor: string = '';
    fontColor: string = '';
}
