import { Schema, type SchemaDefinition, type SchemaOptions } from 'mongoose';
import { generateId } from '../utils/helper.utils.ts';

export function generateSchema<T>(
  definition: SchemaDefinition<T>,
  options?: Record<string, any>
): Schema<T> {

  const baseSchemaFields: SchemaDefinition = {
    ...definition,
    id: { type: String, default: generateId },
    isDeleted: { type: Boolean, default: false, index: true},
    deletedAt: { type: Date, default: null }
  };

  const baseSchemaOptions = {
    timestamps: true,
    versionKey: false,
    ...options
  } as const;

  const schema = new Schema<T>(
    baseSchemaFields,
    baseSchemaOptions
  )

  return schema;
}
