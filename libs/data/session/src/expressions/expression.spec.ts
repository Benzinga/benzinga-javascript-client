import { Expression, ExpressionObject } from './expression';
const baseBzql = (id: string): ['hi', 'in', [string]] => ['hi', 'in', [id]];
const baseExpr = (expr: ['hi', 'in', [string]]): ExpressionObject<'hi'> => ({
  expression: expr,
  operator: 'expression',
});
const or = (lhs: ExpressionObject<'hi'>, rhs: ExpressionObject<'hi'>): ExpressionObject<'hi'> => {
  return { lhs, operator: 'or', rhs };
};
const and = (lhs: ExpressionObject<'hi'>, rhs: ExpressionObject<'hi'>): ExpressionObject<'hi'> => {
  return { lhs, operator: 'and', rhs };
};
// const not = (group: ExpressionObject<'hi'>): ExpressionObject<'hi'> => {
//   return { group, operator: 'not' };
// };
const group = (group: ExpressionObject<'hi'>): ExpressionObject<'hi'> => {
  return { group, operator: 'group' };
};

const A1 = baseBzql('A');
const A = baseExpr(A1);
const B1 = baseBzql('B');
const B = baseExpr(B1);
const C1 = baseBzql('C');
const C = baseExpr(C1);
const D1 = baseBzql('D');
const D = baseExpr(D1);
const E1 = baseBzql('A');
const E = baseExpr(E1);

describe('expression -> bzql testing -> simple operators', () => {
  it('A *or* B => (A *or* B)', () => {
    const result = Expression.generateBZQL(or(A, B));
    expect(result).toEqual([{ _: [{ $: A1 }, { or: { $: B1 } }] }]);
  });
  it('A *and* B => (A *and* B)', () => {
    const result = Expression.generateBZQL(and(A, B));
    expect(result).toEqual([{ _: [{ $: A1 }, { and: { $: B1 } }] }]);
  });
});

describe('expression -> bzql testing -> OR/AND combinations with 2 operands', () => {
  it('[A *or* B] *and* C => ((A *or* B) *and* C)', () => {
    const result = Expression.generateBZQL(and(or(A, B), C));
    expect(result).toEqual([
      {
        _: [{ _: [{ $: A1 }, { or: { $: B1 } }] }, { and: { $: C1 } }],
      },
    ]);
  });
  it('[A *and* B] *or* C => ((A *and* B) *or* C)', () => {
    const result = Expression.generateBZQL(or(and(A, B), C));
    expect(result).toEqual([
      {
        _: [{ _: [{ $: A1 }, { and: { $: B1 } }] }, { or: { $: C1 } }],
      },
    ]);
  });
  it('A *and* [B *or* C] => (A *and* (B *or* C))', () => {
    const result = Expression.generateBZQL(and(A, or(B, C)));
    expect(result).toEqual([
      {
        _: [{ $: A1 }, { and: { _: [{ $: B1 }, { or: { $: C1 } }] } }],
      },
    ]);
  });
  it('A *or* [B *and* C] => (A *or* (B *and* C))', () => {
    const result = Expression.generateBZQL(or(A, and(B, C)));
    expect(result).toEqual([
      {
        _: [{ $: A1 }, { or: { _: [{ $: B1 }, { and: { $: C1 } }] } }],
      },
    ]);
  });
});

describe('expression -> bzql testing -> OR/AND combinations with multiple chained operands', () => {
  it('[[[A *or* B] *or* C] *or* D] *and* E => ((A *or* B *or* C *or* D) *and* E) ', () => {
    const result = Expression.generateBZQL(and(or(or(or(A, B), C), D), E));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { or: { $: B1 } }, { or: { $: C1 } }, { or: { $: D1 } }],
          },
          { and: { $: E1 } },
        ],
      },
    ]);
  });
  it('[[[A *and* B] *and* C] *and* D] *or* E => ((A *and* B *and* C *and* D) *or* E) ', () => {
    const result = Expression.generateBZQL(or(and(and(and(A, B), C), D), E));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { and: { $: B1 } }, { and: { $: C1 } }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
  it('[[[A *and* B] *or* C] *and* D] *or* E => ((((A *and* B) *or* C) *and* D) *or* E) ', () => {
    const result = Expression.generateBZQL(or(and(or(and(A, B), C), D), E));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ _: [{ _: [{ $: A1 }, { and: { $: B1 } }] }, { or: { $: C1 } }] }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
  it('[A *and* [[B *or* C] *and* D]] *or* E => (A and (B or C) and D) or E ', () => {
    const result = Expression.generateBZQL(or(and(A, and(or(B, C), D)), E));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { and: { _: [{ $: B1 }, { or: { $: C1 } }] } }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
});

describe('expression -> bzql testing -> Make sure Extra groups are stripped and needed ones are kept/created', () => {
  it('(A) *or* B => (A *or* B) ', () => {
    const result = Expression.generateBZQL(or(group(A), B));
    expect(result).toEqual([
      {
        _: [{ $: A1 }, { or: { $: B1 } }],
      },
    ]);
  });
  it('A *or* (B) => (A *or* B) ', () => {
    const result = Expression.generateBZQL(or(A, group(B)));
    expect(result).toEqual([
      {
        _: [{ $: A1 }, { or: { $: B1 } }],
      },
    ]);
  });
  it('((((A *or* B) *or* C) *or* D) *and* E) => ((A *or* B *or* C *or* D) *and* E) ', () => {
    const result = Expression.generateBZQL(group(and(group(or(group(or(group(or(A, B)), C)), D)), E)));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { or: { $: B1 } }, { or: { $: C1 } }, { or: { $: D1 } }],
          },
          { and: { $: E1 } },
        ],
      },
    ]);
  });
  it('((((A *and* B) *and* C) *and* D) *or* E) => ((A *and* B *and* C *and* D) *or* E) ', () => {
    const result = Expression.generateBZQL(group(or(group(and(group(and(group(and(A, B)), C)), D)), E)));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { and: { $: B1 } }, { and: { $: C1 } }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
  it('((((A *and* B) *or* C) *and* D) *or* E) => ((((A *and* B) *or* C) *and* D) *or* E) ', () => {
    const result = Expression.generateBZQL(group(or(group(and(group(or(group(and(A, B)), C)), D)), E)));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ _: [{ _: [{ $: A1 }, { and: { $: B1 } }] }, { or: { $: C1 } }] }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
  it('((A *and* (B *or* C) *and* D) *or* E) => (A and (B or C) and D) or E ', () => {
    const result = Expression.generateBZQL(group(or(group(and(A, group(and(group(or(B, C)), D)))), E)));
    expect(result).toEqual([
      {
        _: [
          {
            _: [{ $: A1 }, { and: { _: [{ $: B1 }, { or: { $: C1 } }] } }, { and: { $: D1 } }],
          },
          { or: { $: E1 } },
        ],
      },
    ]);
  });
});
