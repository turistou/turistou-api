import * as mongoose from 'mongoose';

import { ICompanyType } from '@domain/entities/CompanyType';

import { DbSchema } from './DbSchema';

const dataTypes = mongoose.Schema.Types;

export interface ICompanyTypeModel extends ICompanyType, mongoose.Document {
}

const companyTypeSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: dataTypes.String,
      required: true,
      maxlength: 30
    },
    active: {
      type: dataTypes.Boolean,
      default: true,
    },
  },
);

const collectionName = 'CompanyType';

export const companyTypeModel = mongoose.model<ICompanyTypeModel>(collectionName, companyTypeSchema);

export default {
  collectionName,
  schema: companyTypeSchema,
} as DbSchema;
