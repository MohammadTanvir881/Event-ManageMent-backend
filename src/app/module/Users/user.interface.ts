import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  photoUrl : string;
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
