import {
  Session,
  SessionCreate,
  SessionUpdate,
} from "../entity/session.entity";

export default interface ISessionRepository {
  create(data: SessionCreate): Promise<Session>;
  update(id: string, updates: SessionUpdate): Promise<Session>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Session | null>;
  findByToken(token: string): Promise<Session | null>;
  findByUserId(userId: string): Promise<Session[]>;
  deleteByUserId(userId: string): Promise<void>;
  deleteByToken(token: string): Promise<void>;
  deleteExpiredForUser(userId: string): Promise<void>;
}
