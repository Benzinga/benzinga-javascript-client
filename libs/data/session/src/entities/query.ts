import { BZQLExpressionObject, Expression } from '../expressions';

export type BZQLQuery<TYPE extends string> = {
  fields: TYPE[];
  limit: number;
  offset: number;
  sort: Partial<Record<TYPE, -1 | 1>>;
  where: Expression<TYPE> | null;
};

export type BZQLRequestQuery<TYPE extends string> = {
  fields: TYPE[];
  limit: number;
  offset: number;
  sort?: Partial<Record<TYPE, -1 | 1>>;
  where: BZQLExpressionObject<TYPE> | null;
};
