import type { Model, QueryFilter, UpdateQuery } from "mongoose";
import type { BaseDocument } from "../base.document.ts";

// It is only for type-safety in typescript
export interface BaseModel<T> extends Model<T>{
    findActive(filter?: QueryFilter<T>): Promise<T[]>;
    findAll(filter?: QueryFilter<T>): Promise<T[]>;
    findOneActive(filter: QueryFilter<T>): Promise<T | null>;
    findByIdActive(id: string): Promise<T | null>;

    updateOneByFilter(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<any>;
    updateManyByFilter(filter: QueryFilter<T>, update: UpdateQuery<T>): Promise<any>;

    softDelete(filter: QueryFilter<T>): Promise<any>;
    restore(filter: QueryFilter<T>): Promise<any>;
    hardDelete(filter: QueryFilter<T>): Promise<any>;
}
