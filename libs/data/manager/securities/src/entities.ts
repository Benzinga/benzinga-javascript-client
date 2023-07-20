import { StockSymbol } from '@benzinga/session';

/**
 * Instrument identifier
 *
 * @export
 * @interface InstrumentIdentifier
 */
export interface InstrumentIdentifier {
  asOf: string;
  shareClassId: string;
}

/**
 * Alpha beta
 *
 * @export
 * @interface AlphaBeta
 */
export interface AlphaBeta {
  /**
   * Alpha value
   *
   * @type {number}
   * @memberof AlphaBeta
   */
  alpha: number;

  /**
   * Beta value
   *
   * @type {number}
   * @memberof AlphaBeta
   */
  beta: number;

  /**
   * ID
   *
   * @type {InstrumentIdentifier}
   * @memberof AlphaBeta
   */
  id: InstrumentIdentifier;
}

/**
 * Financial ID
 *
 * @export
 * @interface FinancialId
 */
export interface FinancialId {
  aorRestate: string;
  asOf: string;
  companyId: string;
  period: string;
  reportType: string;
}

/**
 * Financials balance sheet
 *
 * @export
 * @interface BalanceSheet
 */
export interface BalanceSheet {
  /**
   * Accounts Payable
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  accountsPayable: number;
  /**
   * Accounts Receivable
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  accountsReceivable: number;
  /**
   * Accumulated Depreciation
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  accumulatedDepreciation: number;
  /**
   * Capital Stock
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  capitalStock: number;
  /**
   * Cash And Cash Equivalents
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  cashAndCashEquivalents: number;
  /**
   * Cash Cash Equivalents And Marketable Securities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  cashCashEquivalentsAndMarketableSecurities: number;
  /**
   * Commercial Paper
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  commercialPaper: number;
  /**
   * Common Stock
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  commonStock: number;
  /**
   * Common Stock Equity
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  commonStockEquity: number;
  /**
   * Currency Id
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currencyId: string;
  /**
   * Current Accrued Expenses
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentAccruedExpenses: number;
  /**
   * Current Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentAssets: number;
  /**
   * Current Debt
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentDebt: number;
  /**
   * Current Debt And Capital Lease Obligation
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentDebtAndCapitalLeaseObligation: number;
  /**
   * Current Deferred Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentDeferredLiabilities: number;
  /**
   * Current Deferred Revenue
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentDeferredRevenue: number;
  /**
   * Current Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  currentLiabilities: number;
  /**
   * Fiscal Year End
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  fiscalYearEnd: number;
  /**
   * Gains Losses Not Affecting Retained Earnings
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  gainsLossesNotAffectingRetainedEarnings: number;
  /**
   * Goodwill
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  goodwill: number;
  /**
   * Goodwill And Other Intangible Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  goodwillAndOtherIntangibleAssets: number;
  /**
   * Gross Ppe
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  grossPpe: number;
  /**
   * Id
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  id: FinancialId;
  /**
   * Inventory
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  inventory: number;
  /**
   * Invested Capital
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  investedCapital: number;
  /**
   * Investments And Advances
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  investmentsAndAdvances: number;
  /**
   * Is Calculated
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  isCalculated: false;
  /**
   * Land And Improvements
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  landAndImprovements: number;
  /**
   * Leases
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  leases: number;
  /**
   * Long Term Debt
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  longTermDebt: number;
  /**
   * Long Term Debt And Capital Lease Obligation
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  longTermDebtAndCapitalLeaseObligation: number;
  /**
   * Machinery Furniture Equipment
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  machineryFurnitureEquipment: number;
  /**
   * Net Debt
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  netDebt: number;
  /**
   * Net Ppe
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  netPpe: number;
  /**
   * Net Tangible Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  netTangibleAssets: number;
  /**
   * Non Current Deferred Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  nonCurrentDeferredLiabilities: number;
  /**
   * Non Current Deferred Revenue
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  nonCurrentDeferredRevenue: number;
  /**
   * Non Current Deferred Taxes Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  nonCurrentDeferredTaxesLiabilities: number;
  /**
   * Ordinary Shares Number
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  ordinarySharesNumber: number;
  /**
   * Other Capital Stock
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherCapitalStock: number;
  /**
   * Other Current Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherCurrentAssets: number;
  /**
   * Other Current Borrowings
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherCurrentBorrowings: number;
  /**
   * Other Current Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherCurrentLiabilities: number;
  /**
   * Other Intangible Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherIntangibleAssets: number;
  /**
   * Other Non Current Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherNonCurrentAssets: number;
  /**
   * Other Non Current Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherNonCurrentLiabilities: number;
  /**
   * Other Payable
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherPayable: number;
  /**
   * Other Properties
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherProperties: number;
  /**
   * Other Receivables
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherReceivables: number;
  /**
   * Other Short Term Investments
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  otherShortTermInvestments: number;
  /**
   * Payables
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  payables: number;
  /**
   * Payables And Accrued Expenses
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  payablesAndAccruedExpenses: number;
  /**
   * Period Ending Date
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  periodEndingDate: string;
  /**
   * Receivables
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  receivables: number;
  /**
   * Retained Earnings
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  retainedEarnings: number;
  /**
   * Share Issued
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  shareIssued: number;
  /**
   * Stockholders Equity
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  stockholdersEquity: number;
  /**
   * Tangible Book Value
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  tangibleBookValue: number;
  /**
   * Total Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalAssets: number;
  /**
   * Total Capitalization
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalCapitalization: number;
  /**
   * Total Debt
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalDebt: number;
  /**
   * Total Equity
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalEquity: number;
  /**
   * Total Equity Gross Minority Interest
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalEquityGrossMinorityInterest: number;
  /**
   * Total Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalLiabilities: number;
  /**
   * Total Liabilities Net Minority Interest
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalLiabilitiesNetMinorityInterest: number;
  /**
   * Total Non Current Assets
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalNonCurrentAssets: number;
  /**
   * Total Non Current Liabilities
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalNonCurrentLiabilities: number;
  /**
   * Total Non Current Liabilities Net Minority Interest
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  totalNonCurrentLiabilitiesNetMinorityInterest: number;
  /**
   * Working Capital
   *
   * @type {number}
   * @memberof BalanceSheet
   */
  workingCapital: number;
}

/**
 * Cash flow statement
 *
 * @export
 * @interface CashFlowStatement
 */
export interface CashFlowStatement {
  /**
   * Beginning Cash Position
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  beginningCashPosition: number;
  /**
   * Capital Expenditure
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  capitalExpenditure: number;
  /**
   * Cash Dividends Paid
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  cashDividendsPaid: number;
  /**
   * Change In Account Payable
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInAccountPayable: number;
  /**
   * Change In Inventory
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInInventory: number;
  /**
   * Change In Other Working Capital
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInOtherWorkingCapital: number;
  /**
   * Change In Payable
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInPayable: number;
  /**
   * Change In Payables And Accrued Expense
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInPayablesAndAccruedExpense: number;
  /**
   * Change In Receivables
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInReceivables: number;
  /**
   * Change In Working Capital
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changeInWorkingCapital: number;
  /**
   * Changes In Account Receivables
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changesInAccountReceivables: number;
  /**
   * Changes In Cash
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  changesInCash: number;
  /**
   * Common Stock Issuance
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  commonStockIssuance: number;
  /**
   * Common Stock Payments
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  commonStockPayments: number;
  /**
   * Currency Id
   *
   * @type {'USD'}
   * @memberof CashFlowStatement
   */
  currencyId: 'USD';
  /**
   * Deferred Income Tax
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  deferredIncomeTax: number;
  /**
   * Deferred Tax
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  deferredTax: number;
  /**
   * Depreciation Amortization Depletion
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  depreciationAmortizationDepletion: number;
  /**
   * Depreciation And Amortization
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  depreciationAndAmortization: number;
  /**
   * End Cash Position
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  endCashPosition: number;
  /**
   * Financing Cash Flow
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  financingCashFlow: number;
  /**
   * Fiscal Year End
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  fiscalYearEnd: number;
  /**
   * Free Cash Flow
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  freeCashFlow: number;
  /**
   * Id
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  id: FinancialId;
  /**
   * Income Tax Paid Supplemental Data
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  incomeTaxPaidSupplementalData: number;
  /**
   * Interest Paid Supplemental Data
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  interestPaidSupplementalData: number;
  /**
   * Investing Cash Flow
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  investingCashFlow: number;
  /**
   * Is Calculated
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  isCalculated: boolean;
  /**
   * Issuance Of Capital Stock
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  issuanceOfCapitalStock: number;
  /**
   * Long Term Debt Payments
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  longTermDebtPayments: number;
  /**
   * Net Business Purchase And Sale
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netBusinessPurchaseAndSale: number;
  /**
   * Net Common Stock Issuance
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netCommonStockIssuance: number;
  /**
   * Net Income
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netIncome: number;
  /**
   * Net Income From Continuing Operations
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netIncomeFromContinuingOperations: number;
  /**
   * Net Intangibles Purchase And Sale
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netIntangiblesPurchaseAndSale: number;
  /**
   * Net Investment Purchase And Sale
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netInvestmentPurchaseAndSale: number;
  /**
   * Net Issuance Payments Of Debt
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netIssuancePaymentsOfDebt: number;
  /**
   * Net Long Term Debt Issuance
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netLongTermDebtIssuance: number;
  /**
   * Net Other Financing Charges
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netOtherFinancingCharges: number;
  /**
   * Net Other Investing Changes
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netOtherInvestingChanges: number;
  /**
   * Net Ppe Purchase And Sale
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netPpePurchaseAndSale: number;
  /**
   * Net Short Term Debt Issuance
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  netShortTermDebtIssuance: number;
  /**
   * Operating Cash Flow
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  operatingCashFlow: number;
  /**
   * Other Non Cash Items
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  otherNonCashItems: number;
  /**
   * Period Ending Date
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  periodEndingDate: string;
  /**
   * Purchase Of Business
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  purchaseOfBusiness: number;
  /**
   * Purchase Of Intangibles
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  purchaseOfIntangibles: number;
  /**
   * Purchase Of Investment
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  purchaseOfInvestment: number;
  /**
   * Purchase Of Ppe
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  purchaseOfPpe: number;
  /**
   * Purchase Of Short Term Investments
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  purchaseOfShortTermInvestments: number;
  /**
   * Repayment Of Debt
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  repaymentOfDebt: number;
  /**
   * Repurchase Of Capital Stock
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  repurchaseOfCapitalStock: number;
  /**
   * Sale Of Investment
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  saleOfInvestment: number;
  /**
   * Sale Of Short Term Investments
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  saleOfShortTermInvestments: number;
  /**
   * Stock Based Compensation
   *
   * @type {number}
   * @memberof CashFlowStatement
   */
  stockBasedCompensation: number;
}

/**
 * Income statement
 *
 * @export
 * @interface IncomeStatement
 */
export interface IncomeStatement {
  /**
   * Cost Of Revenue
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  costOfRevenue: number;
  /**
   * Currency Id
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  currencyId: string;
  /**
   * Ebit
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  ebit: number;
  /**
   * Ebitda
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  ebitda: number;
  /**
   * Fiscal Year End
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  fiscalYearEnd: number;
  /**
   * Gross Profit
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  grossProfit: number;
  /**
   * Id
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  id: FinancialId;
  /**
   * Interest Expense
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  interestExpense: number;
  /**
   * Interest Expense Non Operating
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  interestExpenseNonOperating: number;
  /**
   * Interest Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  interestIncome: number;
  /**
   * Interest Income Non Operating
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  interestIncomeNonOperating: number;
  /**
   * Interestand Similar Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  interestandSimilarIncome: number;
  /**
   * Is Calculated
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  isCalculated: boolean;
  /**
   * Net Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncome: number;
  /**
   * Net Income Common Stockholders
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncomeCommonStockholders: number;
  /**
   * Net Income Continuous Operations
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncomeContinuousOperations: number;
  /**
   * Net Income From Continuing And Discontinued Operation
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncomeFromContinuingAndDiscontinuedOperation: number;
  /**
   * Net Income From Continuing Operation Net Minority Interest
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncomeFromContinuingOperationNetMinorityInterest: number;
  /**
   * Net Income Including Noncontrolling Interests
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netIncomeIncludingNoncontrollingInterests: number;
  /**
   * Net Interest Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netInterestIncome: number;
  /**
   * Net Non Operating Interest Income Expense
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  netNonOperatingInterestIncomeExpense: number;
  /**
   * Non Operating Expenses
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  nonOperatingExpenses: number;
  /**
   * Non Operating Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  nonOperatingIncome: number;
  /**
   * Normalized Ebitda
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  normalizedEbitda: number;
  /**
   * Normalized Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  normalizedIncome: number;
  /**
   * Operating Expense
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  operatingExpense: number;
  /**
   * Operating Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  operatingIncome: number;
  /**
   * Operating Revenue
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  operatingRevenue: number;
  /**
   * Other Income Expense
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  otherIncomeExpense: number;
  /**
   * Other Operating Expenses
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  otherOperatingExpenses: number;
  /**
   * Period Ending Date
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  periodEndingDate: string;
  /**
   * Pretax Income
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  pretaxIncome: number;
  /**
   * Reconciled Cost Of Revenue
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  reconciledCostOfRevenue: number;
  /**
   * Reconciled Depreciation
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  reconciledDepreciation: number;
  /**
   * Research And Development
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  researchAndDevelopment: number;
  /**
   * Selling General And Administration
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  sellingGeneralAndAdministration: number;
  /**
   * Tax Provision
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  taxProvision: number;
  /**
   * Total Expenses
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  totalExpenses: number;
  /**
   * Total Revenue
   *
   * @type {number}
   * @memberof IncomeStatement
   */
  totalRevenue: number;
}

/**
 * Financial report
 *
 * @export
 * @interface Financial
 */
export interface Financial {
  /**
   * AOR Restate
   *
   * @type {string}
   * @memberof Financial
   */
  aorRestate: string;

  /**
   * Date of report
   *
   * @type {string}
   * @memberof Financial
   */
  asOf: string;

  /**
   * Balance sheet
   *
   * @type {BalanceSheet}
   * @memberof Financial
   */
  balanceSheet: BalanceSheet;

  /**
   * Cash flow statement
   *
   * @type {CashFlowStatement}
   * @memberof Financial
   */
  cashFlowStatement: CashFlowStatement;

  /**
   * Income statement
   *
   * @type {IncomeStatement}
   * @memberof Financial
   */
  incomeStatement: IncomeStatement;

  /**
   * Period of report
   *
   * @type {string}
   * @memberof Financial
   */
  period: string;

  /**
   * Report type
   *
   * @type {string}
   * @memberof Financial
   */
  reportType: string;
}

/**
 * Earning ratio
 *
 * @export
 * @interface EarningRatio
 */
export interface EarningRatio {
  dilutedContEpsGrowth: number;
  dilutedEpsGrowth: number;
  dpsGrowth: number;
  equityPerShareGrowth: number;
  fiscalYearEnd: number;
}

/**
 * Earning report
 *
 * @export
 * @interface EarningReport
 */
export interface EarningReport {
  /**
   * Basic Average Shares
   *
   * @type {number}
   * @memberof EarningReport
   */
  basicAverageShares: number;
  /**
   * Basic Continuous Operations
   *
   * @type {number}
   * @memberof EarningReport
   */
  basicContinuousOperations: number;
  /**
   * Basic Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  basicEps: number;
  /**
   * Continuing And Discontinued Basic Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  continuingAndDiscontinuedBasicEps: number;
  /**
   * Continuing And Discontinued Diluted Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  continuingAndDiscontinuedDilutedEps: number;
  /**
   * Currency Id
   *
   * @type {string}
   * @memberof EarningReport
   */
  currencyId: string;
  /**
   * Diluted Average Shares
   *
   * @type {number}
   * @memberof EarningReport
   */
  dilutedAverageShares: number;
  /**
   * Diluted Continuous Operations
   *
   * @type {number}
   * @memberof EarningReport
   */
  dilutedContinuousOperations: number;
  /**
   * Diluted Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  dilutedEps: number;
  /**
   * Dividend Per Share
   *
   * @type {number}
   * @memberof EarningReport
   */
  dividendPerShare: number;
  /**
   * Fiscal Year End
   *
   * @type {number}
   * @memberof EarningReport
   */
  fiscalYearEnd: number;
  /**
   * Id
   *
   * @type {FinancialId}
   * @memberof EarningReport
   */
  id: FinancialId;
  /**
   * Normalized Basic Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  normalizedBasicEps: number;
  /**
   * Normalized Diluted Eps
   *
   * @type {number}
   * @memberof EarningReport
   */
  normalizedDilutedEps: number;
}

/**
 * Company info
 *
 * @export
 * @interface Company
 */
export interface Company {
  /**
   * Company CIK
   *
   * @type {string}
   * @memberof Company
   */
  cik: string;

  /**
   * ID of the company country
   *
   * @type {string}
   * @memberof Company
   */
  countryId: string;

  /**
   * CUSIP
   *
   * @type {string}
   * @memberof Company
   */
  cusip: string;

  /**
   * ISIN
   *
   * @type {string}
   * @memberof Company
   */
  isin: string;

  /**
   * Primary exchange for company
   *
   * @type {string}
   * @memberof Company
   */
  primaryExchange: string;

  /**
   * Primary company symbol on exchange
   *
   * @type {StockSymbol}
   * @memberof Company
   */
  primarySymbol: StockSymbol;

  /**
   * SEDOL
   *
   * @type {string}
   * @memberof Company
   */
  sedol: string;

  /**
   *Standard company name
   *
   * @type {string}
   * @memberof Company
   */
  standardName: string;

  /**
   * Valoren
   *
   * @type {string}
   * @memberof Company
   */
  valoren: string;
}

/**
 * Company profile
 *
 * @export
 * @interface CompanyProfile
 */
export interface CompanyProfile {
  /**
   * Address
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  address1: string;
  /**
   * City
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  city: string;
  /**
   * Company Status
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  companyStatus: string;
  /**
   * Country
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  country: string;
  /**
   * Country Id
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  countryId: string;
  /**
   * Fax
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  fax: string;
  /**
   * Fiscal Year End
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  fiscalYearEnd: string;
  /**
   * Homepage
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  homepage: string;
  /**
   * Legal Name
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  legalName: string;
  /**
   * Long Description
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  longDescription: string;
  /**
   * Phone
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  phone: string;
  /**
   * Postal Code
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  postalCode: string;
  /**
   * Province
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  province: string;
  /**
   * Short Description
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  shortDescription: string;
  /**
   * Short Name
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  shortName: string;
  /**
   * Standard Name
   *
   * @type {string}
   * @memberof CompanyProfile
   */
  standardName: string;
}

/**
 * Asset classification
 *
 * @export
 * @interface AssetClassification
 */
export interface AssetClassification {
  msGroupCode: number;
  msGroupName: string;
  msIndustryCode: number;
  msIndustryName: string;
  msSectorCode: number;
  msSectorName: string;
  msSuperSectorCode: number;
  msSuperSectorName: string;
  naics: string;
  naicsName: string;
  sic: string;
  sicName: string;
}

/**
 * Share class
 *
 * @export
 * @interface ShareClass
 */
export interface ShareClass {
  currency: string;
  ipoDate: number;
  isDepositaryReceipt: boolean;
  isPrimary: true;
  securityType: string;
  shareClassId: string;
}

/**
 * Share class profile
 *
 * @export
 * @interface ShareClassProfile
 */
export interface ShareClassProfile {
  asOf: string;
  enterpriseValue: number;
  marketCap: number;
}

/**
 * Operation ratio
 *
 * @export
 * @interface OperationRatio
 */
export interface OperationRatio {
  /**
   * Assets Turnover
   *
   * @type {number}
   * @memberof OperationRatio
   */
  assetsTurnover: number;
  /**
   * Cash Conversion Cycle
   *
   * @type {number}
   * @memberof OperationRatio
   */
  cashConversionCycle: number;
  /**
   * Common Equity To Assets
   *
   * @type {number}
   * @memberof OperationRatio
   */
  commonEquityToAssets: number;
  /**
   * Current Ratio
   *
   * @type {number}
   * @memberof OperationRatio
   */
  currentRatio: number;
  /**
   * Days In Inventory
   *
   * @type {number}
   * @memberof OperationRatio
   */
  daysInInventory: number;
  /**
   * Days In Payment
   *
   * @type {number}
   * @memberof OperationRatio
   */
  daysInPayment: number;
  /**
   * Days In Sales
   *
   * @type {number}
   * @memberof OperationRatio
   */
  daysInSales: number;
  /**
   * Debt to Assets
   *
   * @type {number}
   * @memberof OperationRatio
   */
  debttoAssets: number;
  /**
   * Ebit Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  ebitMargin: number;
  /**
   * Ebitda Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  ebitdaMargin: number;
  /**
   * Financial Leverage
   *
   * @type {number}
   * @memberof OperationRatio
   */
  financialLeverage: number;
  /**
   * Fiscal Year End
   *
   * @type {number}
   * @memberof OperationRatio
   */
  fiscalYearEnd: number;
  /**
   * Fix Assets Turonver
   *
   * @type {number}
   * @memberof OperationRatio
   */
  fixAssetsTuronver: number;
  /**
   * Gross Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  grossMargin: number;
  /**
   * Id
   *
   * @type {FinancialId}
   * @memberof OperationRatio
   */
  id: FinancialId;
  /**
   * Interest Coverage
   *
   * @type {number}
   * @memberof OperationRatio
   */
  interestCoverage: number;
  /**
   * Inventory Turnover
   *
   * @type {number}
   * @memberof OperationRatio
   */
  inventoryTurnover: number;
  /**
   * Is Calculated
   *
   * @type {boolean}
   * @memberof OperationRatio
   */
  isCalculated: boolean;
  /**
   * Long Term Debt Equity Ratio
   *
   * @type {number}
   * @memberof OperationRatio
   */
  longTermDebtEquityRatio: number;
  /**
   * Long Term Debt Total Capital Ratio
   *
   * @type {number}
   * @memberof OperationRatio
   */
  longTermDebtTotalCapitalRatio: number;
  /**
   * Net Income Cont Ops Growth
   *
   * @type {number}
   * @memberof OperationRatio
   */
  netIncomeContOpsGrowth: number;
  /**
   * Net Income Growth
   *
   * @type {number}
   * @memberof OperationRatio
   */
  netIncomeGrowth: number;
  /**
   * Net Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  netMargin: number;
  /**
   * Normalized Net Profit Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  normalizedNetProfitMargin: number;
  /**
   * Normalized Roic
   *
   * @type {number}
   * @memberof OperationRatio
   */
  normalizedRoic: number;
  /**
   * Operation Income Growth
   *
   * @type {number}
   * @memberof OperationRatio
   */
  operationIncomeGrowth: number;
  /**
   * Operation Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  operationMargin: number;
  /**
   * Operation Revenue Growth3 Month Avg
   *
   * @type {number}
   * @memberof OperationRatio
   */
  operationRevenueGrowth3MonthAvg: number;
  /**
   * Payment Turnover
   *
   * @type {number}
   * @memberof OperationRatio
   */
  paymentTurnover: number;
  /**
   * Pretax Margin
   *
   * @type {number}
   * @memberof OperationRatio
   */
  pretaxMargin: number;
  /**
   * Quick Ratio
   *
   * @type {number}
   * @memberof OperationRatio
   */
  quickRatio: number;
  /**
   * Receivable Turnover
   *
   * @type {number}
   * @memberof OperationRatio
   */
  receivableTurnover: number;
  /**
   * Revenue Growth
   *
   * @type {number}
   * @memberof OperationRatio
   */
  revenueGrowth: number;
  /**
   * Roa
   *
   * @type {number}
   * @memberof OperationRatio
   */
  roa: number;
  /**
   * Roe
   *
   * @type {number}
   * @memberof OperationRatio
   */
  roe: number;
  /**
   * Roic
   *
   * @type {number}
   * @memberof OperationRatio
   */
  roic: number;
  /**
   * Sales Per Employee
   *
   * @type {number}
   * @memberof OperationRatio
   */
  salesPerEmployee: number;
  /**
   * Tax Rate
   *
   * @type {number}
   * @memberof OperationRatio
   */
  taxRate: number;
  /**
   * Total Debt Equity Ratio
   *
   * @type {number}
   * @memberof OperationRatio
   */
  totalDebtEquityRatio: number;
}

/**
 * Valuation ratio
 *
 * @export
 * @interface ValuationRatio
 */
export interface ValuationRatio {
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  bookValuePerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  bookValueYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  buyBackYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  cashReturn: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  cfYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  cfoPerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  earningYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  evToEbitda: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  fcfPerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  fcfRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  fcfYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  forwardDividend: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  forwardDividendYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  forwardEarningYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  forwardPeRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  id: InstrumentIdentifier;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  normalizedPeRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  payoutRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  pbRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  pcfRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  peRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  pegPayback: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  pegRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  priceChange1M: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  pricetoEbitda: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  psRatio: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  ratioPe5YearAverage: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  salesPerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  salesYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  sustainableGrowthRate: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  tangibleBookValuePerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  tangibleBvPerShare3YrAvg: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  tangibleBvPerShare5YrAvg: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  totalYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  trailingDividendYield: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  workingCapitalPerShare: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  workingCapitalPerShare3YrAvg: number;
  /**
   * @type {number}
   * @memberof ValuationRatio
   */
  workingCapitalPerShare5YrAvg: number;
}

/**
 * Complete financials data
 *
 * @export
 * @interface Financials
 */
export interface Financials {
  /**
   * @type {AlphaBeta[]}
   * @memberof Financials
   */
  alphaBeta: AlphaBeta[];

  /**
   * @type {AssetClassification}
   * @memberof Financials
   */
  assetClassification: AssetClassification;

  /**
   * @type {Company}
   * @memberof Financials
   */
  company: Company;

  /**
   * @type {CompanyProfile}
   * @memberof Financials
   */
  companyProfile: CompanyProfile;

  /**
   * @type {EarningRatio[]}
   * @memberof Financials
   */
  earningRatios: EarningRatio[];

  /**
   * @type {EarningReport[]}
   * @memberof Financials
   */
  earningReports: EarningReport[];

  /**
   * @type {string}
   * @memberof Financials
   */
  error?: string;

  /**
   * @type {Financial[]}
   * @memberof Financials
   */
  financials: Financial[];

  /**
   * ID of the financials object
   *
   * @type {string}
   * @memberof Financials
   */
  id: string;

  /**
   * @type {string}
   * @memberof Financials
   */
  idType: string;

  /**
   * @type {OperationRatio[]}
   * @memberof Financials
   */
  operationRatios: OperationRatio[];

  /**
   * @type {ShareClass}
   * @memberof Financials
   */
  shareClass: ShareClass;

  /**
   * @type {ShareClassProfile}
   * @memberof Financials
   */
  shareClassProfile: ShareClassProfile;

  /**
   * @type {StockSymbol}
   * @memberof Financials
   */
  symbol: StockSymbol;

  /**
   * @type {ValuationRatio[]}
   * @memberof Financials
   */
  valuationRatios: ValuationRatio[];
}

export type FinancialsPeriod = '3M' | '12M';
export type AsOf = `${number}-${number}-${number}`;

/**
 * Financials request query
 *
 * @export
 * @interface FinancialsQuery
 */
export interface FinancialsQuery {
  /**
   * Period of the query
   *
   * @type {AsOf}
   * @memberof FinancialsQuery
   */
  asOf?: AsOf;

  /**
   * CSV symbols list for filtering
   *
   * @type {StockSymbol}
   * @memberof FinancialsQuery
   */
  symbols: StockSymbol;

  /**
   * Period of the query
   *
   * @type {FinancialsPeriod}
   * @memberof FinancialsQuery
   */
  period: FinancialsPeriod;
}

export interface Ownership {
  daysToCoverShort: number;
  id: InstrumentIdentifier;
  insiderPercentOwned: number;
  insiderSharesBought: number;
  insiderSharesOwned: number;
  insiderSharesSold: number;
  institutionHolderNumber: number;
  institutionPercentHeld: number;
  institutionSharesBought: number;
  institutionSharesHeld: number;
  institutionSharesSold: number;
  numberOfInsiderBuys: number;
  numberOfInsiderSellers: number;
  shareClassLevelSharesOutstandingBalanceSheet: number;
  shareClassLevelSharesOutstandingInterim: number;
  shareFloat: number;
  sharesOutstanding: number;
  sharesOutstandingWithBalanceSheetEndingDate: number;
  shortInterest: number;
  shortInterestsPercentageChange: number;
  shortPercentageOfFloat: number;
  shortPercentageOfSharesOutstanding: number;
}

export interface Peer {
  dividend?: number;
  dividendYield?: number;
  exchange: string;
  forwardPERatio: number;
  marketCap: number;
  name: string;
  pe: number;
  revenueTTM: number;
  shareFloat: number;
  sharesOutstanding: any; // TODO
  symbol: StockSymbol;
}

/**
 * Request params for get logos
 *
 * @export
 * @interface GetQuotesLogoParams
 */
export interface GetQuotesLogoParams {
  /**
   * A comma (,) separated list of returned fields
   *
   * @exampleValue mark_light,background_light
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  fields: string;

  /**
   * Specified as the WIDTHxHEIGHT to scale the image down in pixels.
   * Images will only be scaled down, never up, and fit within the bounds set.
   * In CSS terms, the object-fit property is set to `contain`
   * Scale will be applied to: logo_light, logo_dark, mark_light, mark_dark, mark_composite_light, mark_composite_dark
   *
   * @exampleValue 300x600
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  scale: string;

  /**
   * The type of identifier being searched.
   * Supported types are currently a security symbol and CIK.
   *
   * @type {string}
   * @memberof GetQuotesLogoParams
   */
  search_keys_type: string;
}

export interface Logos {
  logos: Logo[];
}

/**
 * @export
 * @interface Logo
 */
export interface Logo {
  id: string;
  search_key: string;
  files: LogoFile;
  created_at: Date;
  updated_at: Date;
}

/**
 * @export
 * @interface LogoFile
 */
export interface LogoFile {
  logo_dark: string;
  logo_light: string;
  logo_vector_dark: string;
  logo_vector_light: string;
  mark_composite_dark: string;
  mark_composite_light: string;
  mark_dark: string;
  mark_light: string;
  mark_vector_dark: string;
  mark_vector_light: string;
}
