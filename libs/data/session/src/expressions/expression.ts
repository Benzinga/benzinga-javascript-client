import { RequireOnlyOne } from '@benzinga/utils';

type StockSymbol = string;

type Operators = 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'ieq';
type Scaler = number | string | boolean;
type ArrayValue =
  | StockSymbol[]
  | Scaler[]
  | { watchlist_id: string }
  | { screener_id: string }
  | { screener_query: string };

type ArrayToken<FieldType> = [FieldType, 'all' | 'any' | 'in', ArrayValue];
type ExistsToken<FieldType> = [FieldType, 'exists'];
type IndexedSearchToken<FieldType> = [FieldType, 'match' | 'phrase' | 'search', string];
type RangeToken<FieldType> = [FieldType, 'range', [number, number]];
type SingletonToken<FieldType> = [FieldType, Operators, Scaler];

export type Token<FieldType> =
  | ArrayToken<FieldType>
  | ExistsToken<FieldType>
  | RangeToken<FieldType>
  | IndexedSearchToken<FieldType>
  | SingletonToken<FieldType>;

interface LogicalToken<FieldType> {
  lhs: ExpressionObject<FieldType>;
  operator: 'or' | 'and' | 'gte' | 'lte';
  rhs: ExpressionObject<FieldType>;
}

interface GroupToken<FieldType> {
  group: ExpressionObject<FieldType>;
  operator: 'not' | 'group';
}

interface WidgetGroupToken {
  groupId: string;
  operator: 'widgetGroup';
  symbol: StockSymbol;
}

interface ExpressionToken<FieldType> {
  expression: Token<FieldType>;
  operator: 'expression';
}

interface EmptyToken {
  operator: 'none';
}

export type ExpressionObject<FieldType> =
  | EmptyToken
  | WidgetGroupToken
  | ExpressionToken<FieldType>
  | LogicalToken<FieldType>
  | GroupToken<FieldType>;
export class Expression<FieldType> {
  protected expression: ExpressionObject<FieldType>;
  protected grouped = false;
  protected inverse = false;

  protected constructor(arg: { type: 'new' });
  protected constructor(arg: { type: 'token'; val: Token<FieldType> });
  protected constructor(arg: { type: 'expression'; val: Expression<FieldType> });
  protected constructor(arg: { type: 'expressionType'; val: ExpressionObject<FieldType> });
  protected constructor(arg: {
    type: 'new' | 'token' | 'expression' | 'expressionType';
    val?: null | Token<FieldType> | Expression<FieldType> | ExpressionObject<FieldType>;
  }) {
    switch (arg.type) {
      case 'new':
        this.expression = { operator: 'none' };
        break;
      case 'token':
        this.expression = { expression: arg.val as Token<FieldType>, operator: 'expression' };
        break;
      case 'expressionType':
        this.expression = arg.val as ExpressionObject<FieldType>;
        break;
      case 'expression':
        this.expression = (arg.val as Expression<FieldType>).getExpressionType();
        break;
    }
  }

  public static new = <FieldType>(): Expression<FieldType> => {
    return new Expression({ type: 'new' });
  };

  public static fromToken = <FieldType>(val: Token<FieldType>): Expression<FieldType> => {
    return new Expression({ type: 'token', val });
  };

  public static fromExpression = <FieldType>(val: Expression<FieldType>): Expression<FieldType> => {
    return new Expression({ type: 'expression', val });
  };

  public static fromExpressionType = <FieldType>(val: ExpressionObject<FieldType>): Expression<FieldType> => {
    return new Expression({ type: 'expressionType', val });
  };

  public static fromBZQL = <FieldType>(
    bzqlWhere: BZQLExpressionObject<FieldType>,
  ): Expression<FieldType> | undefined => {
    // recursion function
    const fromBZQLRecursion = <FieldType>(
      bzqlWhere: BZQLExpression<FieldType>,
      previousToken?: Expression<FieldType>,
    ): Expression<FieldType> | undefined => {
      const keys = Object.keys(bzqlWhere);
      if (keys.length !== 1) {
        return undefined;
      }

      const type = keys[0] as 'and' | 'or' | 'not' | '_' | '$';

      switch (type) {
        case 'and': {
          const rhs = fromBZQLRecursion(bzqlWhere[type] as BZQLExpression<FieldType>);
          if (rhs && previousToken) {
            return previousToken.and(rhs);
          } else {
            return undefined;
          }
        }
        case 'or': {
          const rhs = fromBZQLRecursion(bzqlWhere[type] as BZQLExpression<FieldType>);
          if (rhs && previousToken) {
            return previousToken.or(rhs);
          } else {
            return undefined;
          }
        }
        case 'not': {
          const group = fromBZQLRecursion(bzqlWhere[type] as BZQLExpression<FieldType>);
          if (group) {
            return group.not(true);
          } else {
            return undefined;
          }
        }
        case '_': {
          const group = bzqlWhere[type];
          if (Array.isArray(group)) {
            const groupResult = group.reduce<Expression<FieldType> | undefined>((acc, item) => {
              if (acc === undefined) {
                return fromBZQLRecursion(item);
              } else {
                return fromBZQLRecursion(item, acc);
              }
            }, undefined);
            if (groupResult) {
              return groupResult.parentheses(true);
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        }
        case '$': {
          const group = bzqlWhere[type];
          if (group) {
            return Expression.fromToken(group);
          } else {
            return undefined;
          }
        }
      }
    };
    return fromBZQLRecursion({ _: bzqlWhere });
  };

  public static generateBZQL = <FieldType>(
    token: ExpressionObject<FieldType>,
  ): BZQLExpressionObject<FieldType> | null => {
    const isEmptyGroup = <FieldType>(token: ExpressionObject<FieldType>): boolean =>
      token.operator === 'none' ||
      ((token.operator === 'group' || token.operator === 'not') && isEmptyGroup(token.group)) ||
      ((token.operator === 'or' || token.operator === 'and' || token.operator === 'gte' || token.operator === 'lte') &&
        isEmptyGroup(token.lhs) &&
        isEmptyGroup(token.rhs));

    // recursion function
    const generateBZQLRecursion = <FieldType>(
      token: ExpressionObject<FieldType>,
    ): BZQLExpression<FieldType> | BZQLExpression<FieldType>[] => {
      switch (token.operator) {
        case 'and':
        case 'or':
        case 'gte':
        case 'lte': {
          if (isEmptyGroup(token.lhs)) {
            return generateBZQLRecursion(token.rhs);
          } else if (isEmptyGroup(token.rhs)) {
            return generateBZQLRecursion(token.lhs);
          } else {
            const lhs = generateBZQLRecursion(token.lhs);
            const rhs = generateBZQLRecursion(token.rhs);
            if (Array.isArray(lhs) && Array.isArray(rhs)) {
              const [first, ...rest] = rhs;
              return [...lhs, { [token.operator]: first } as unknown as BZQLExpression<FieldType>, ...rest];
            } else if (Array.isArray(lhs)) {
              return [...lhs, { [token.operator]: rhs } as unknown as BZQLExpression<FieldType>];
            } else if (Array.isArray(rhs)) {
              const [first, ...rest] = rhs;
              return [lhs, { [token.operator]: first } as unknown as BZQLExpression<FieldType>, ...rest];
            } else {
              return [lhs, { [token.operator]: rhs } as unknown as BZQLExpression<FieldType>];
            }
          }
        }
        case 'not': {
          const bz = generateBZQLRecursion(token.group);
          if (Array.isArray(bz)) {
            return { not: { _: bz } };
          } else {
            return { not: bz };
          }
        }
        case 'group': {
          const bz = generateBZQLRecursion(token.group);
          if (Array.isArray(bz)) {
            return { _: bz };
          } else {
            return { _: [bz] };
          }
        }
        case 'expression':
          return { $: token.expression };
        case 'widgetGroup':
          return { $: ['Tickers.name', 'any', [token.symbol]] as any };
        case 'none':
          return { _: [] };
      }
    };

    if (isEmptyGroup(token)) {
      return null;
    }
    const bz = generateBZQLRecursion(token);
    if (Array.isArray(bz)) {
      return [{ _: bz }] as BZQLExpressionObject<FieldType>;
    } else {
      return [bz];
    }
  };

  private static clone = <T>(source: T): T => {
    return Array.isArray(source)
      ? (source as unknown[]).map(item => Expression.clone(item))
      : source instanceof Date
      ? new Date(source.getTime())
      : source && typeof source === 'object'
      ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
          Object.defineProperty(
            o,
            prop,
            Object.getOwnPropertyDescriptor(source, prop) as Record<string | number | symbol, unknown>,
          );
          o[prop] = Expression.clone((source as Record<string | number | symbol, unknown>)[prop]);
          return o;
        }, Object.create(Object.getPrototypeOf(source)))
      : (source as T);
  };

  public and = (expression: Expression<FieldType>): Expression<FieldType> => {
    this.operator(expression, 'and');
    return this;
  };

  public or = (expression: Expression<FieldType>): Expression<FieldType> => {
    this.operator(expression, 'or');
    return this;
  };

  public parentheses = (val: boolean): Expression<FieldType> => {
    this.grouped = val;
    return this;
  };

  public not = (val: boolean): Expression<FieldType> => {
    this.inverse = val;
    return this;
  };

  // try to not call this. only use this for saving to layout.
  public getExpressionType = (): ExpressionObject<FieldType> => {
    if (this.grouped || this.inverse) {
      return { group: this.expression, operator: this.inverse ? 'not' : 'group' };
    } else {
      return this.expression;
    }
  };

  public hasValue = (): boolean => {
    return this.expression.operator !== 'none';
  };

  public toBZQL = (): BZQLExpressionObject<FieldType> | null => {
    const expression = this.getExpressionType();
    if (expression) {
      return Expression.generateBZQL(expression);
    } else {
      return null;
    }
  };

  protected operator = (expression: Expression<FieldType>, operator: 'or' | 'and'): void => {
    const thereExpression = expression.getExpressionType();
    if (thereExpression.operator !== 'none' && this.expression.operator !== 'none') {
      this.expression = { lhs: this.expression, operator: operator, rhs: Expression.clone(thereExpression) };
    } else if (thereExpression.operator !== 'none') {
      this.expression = Expression.clone(thereExpression);
    }
  };
}

type BZQLExpression<FieldType> = RequireOnlyOne<{
  $: Token<FieldType>;
  _: BZQLExpression<FieldType>[];
  and: BZQLExpression<FieldType>;
  not: BZQLExpression<FieldType>;
  or: BZQLExpression<FieldType>;
}>;

export type BZQLExpressionObject<FieldType> = [BZQLExpression<FieldType>];
