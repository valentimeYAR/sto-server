import { User } from './user.entity';

export type UserWithOutPassword = Omit<User, 'password'>;
