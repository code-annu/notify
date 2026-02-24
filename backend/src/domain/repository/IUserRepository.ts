import { User, UserCreate, UserUpdate } from "../entity/user.entity";

export default interface IUserRepository {
  create(data: UserCreate): Promise<User>;
  update(id: string, updates: UserUpdate): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
