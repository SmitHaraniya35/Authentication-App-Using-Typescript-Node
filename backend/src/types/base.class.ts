import type { QueryFilter, UpdateQuery } from "mongoose";
import type { BaseModel } from "./models/base.model.ts";

export class BaseClass<T>{
    static async findActive<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T> = {}
    ): Promise<any> {
        return this.find({ ...filter, isDeleted: false });
    }

    static async findAll<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T> = {}
    ): Promise<any> {
        return this.find({...filter});
    }

    static async findOneActive<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>
    ): Promise<any> {
        return this.findOne({ ...filter, isDeleted: false });
    }

    static async findByIdActive<T>(
        this: BaseModel<T>,
        id: string
    ): Promise<any> {
        return this.findOne({ id: id, isDeleted: false });
    }

    static async updateOneByFilter<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>,
        update: UpdateQuery<T>
    ): Promise<any> {
        return this.updateOne(filter, update);
    }

    static async updateManyByFilter<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>,
        update: UpdateQuery<T>
    ): Promise<any> {
        return this.updateMany(filter, update);
    }

    static async softDelete<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>
    ): Promise<any> {
        return this.updateOne(filter, {
            isDeleted: true,
            deletedAt: new Date()
        });
    }

    static async restore<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>
    ): Promise<any> {
        return this.updateOne(filter, {
            isDeleted: false,
            deletedAt: null
        });
    }

    static async hardDelete<T>(
        this: BaseModel<T>,
        filter: QueryFilter<T>
    ): Promise<any> {
        return this.deleteMany(filter);
    }
}