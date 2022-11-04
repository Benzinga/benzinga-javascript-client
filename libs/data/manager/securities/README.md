# Securities manager

This manager and respectful API provide access to data that is usually not going to change after publishing like financial statements, financial ratios, earning reports, asset classification, and share class profile history.

## Getting started

Obtain manager instance via session:

```ts
import { createSession } from '@benzinga/session';
import { ConferenceCallsManager } from '@benzinga/securities-manager';

const session = createSession({
  'benzinga-authentication': {
    apiKey: '<YOUR BENZINGA API KEY GOES HERE>'
  }
});

const manager = session.getManager(SecuritiesManager);
```

Now you can get a full financials report for a given company by ticker symbol:

```ts
const financialsResponse = await manager.getFinancials({
  symbol: 'TSMG'
});

if (financialsResponse.err) {
  //handle error
} else {
  console.log(financialsResponse.result);
}
```

When querying for financials multiple times, manager will emit event `financials_updated`, in case if new financials report contains new data, compared to old one.

Processing event example:

```ts
manager.subscribe(ev => {
  if (ev.type === 'financials_updated') {
    console.log(ev.financials); // new data
  }
})
```

# Classes
## SecuritiesManager
Static-like securities data manager

To use, obtain an instance by calling session.getManager(SecuritiesManager)

### Methods: 
```ts
compareFinancials (lhs: Financials[], rhs: Financials[]): boolean
```
Compares two financials by IDs

Returns true if they are equal

*Returns:* boolean


```ts
getFinancials (query: FinancialsQuery): SafePromise<Financials[]>
```
Fetches financials by given query

Caches value when possible

*Returns:* SafePromise<[Financials](#financials)[]>




# Interfaces
## InstrumentIdentifier
Instrument identifier

* `asOf` (string) 

* `shareClassId` (string) 

## AlphaBeta
Alpha beta

* `alpha` (number) - Alpha value

* `beta` (number) - Beta value

* `id` ([InstrumentIdentifier](#instrumentidentifier)) - ID

## FinancialId
Financial ID

* `aorRestate` (string) 

* `asOf` (string) 

* `companyId` (string) 

* `period` (string) 

* `reportType` (string) 

## BalanceSheet
Financials balance sheet

* `accountsPayable` (number) - Accounts Payable

* `accountsReceivable` (number) - Accounts Receivable

* `accumulatedDepreciation` (number) - Accumulated Depreciation

* `capitalStock` (number) - Capital Stock

* `cashAndCashEquivalents` (number) - Cash And Cash Equivalents

* `cashCashEquivalentsAndMarketableSecurities` (number) - Cash Cash Equivalents And Marketable Securities

* `commercialPaper` (number) - Commercial Paper

* `commonStock` (number) - Common Stock

* `commonStockEquity` (number) - Common Stock Equity

* `currencyId` (string) - Currency Id

* `currentAccruedExpenses` (number) - Current Accrued Expenses

* `currentAssets` (number) - Current Assets

* `currentDebt` (number) - Current Debt

* `currentDebtAndCapitalLeaseObligation` (number) - Current Debt And Capital Lease Obligation

* `currentDeferredLiabilities` (number) - Current Deferred Liabilities

* `currentDeferredRevenue` (number) - Current Deferred Revenue

* `currentLiabilities` (number) - Current Liabilities

* `fiscalYearEnd` (number) - Fiscal Year End

* `gainsLossesNotAffectingRetainedEarnings` (number) - Gains Losses Not Affecting Retained Earnings

* `goodwill` (number) - Goodwill

* `goodwillAndOtherIntangibleAssets` (number) - Goodwill And Other Intangible Assets

* `grossPpe` (number) - Gross Ppe

* `id` ([FinancialId](#financialid)) - Id

* `inventory` (number) - Inventory

* `investedCapital` (number) - Invested Capital

* `investmentsAndAdvances` (number) - Investments And Advances

* `isCalculated` (false) - Is Calculated

* `landAndImprovements` (number) - Land And Improvements

* `leases` (number) - Leases

* `longTermDebt` (number) - Long Term Debt

* `longTermDebtAndCapitalLeaseObligation` (number) - Long Term Debt And Capital Lease Obligation

* `machineryFurnitureEquipment` (number) - Machinery Furniture Equipment

* `netDebt` (number) - Net Debt

* `netPpe` (number) - Net Ppe

* `netTangibleAssets` (number) - Net Tangible Assets

* `nonCurrentDeferredLiabilities` (number) - Non Current Deferred Liabilities

* `nonCurrentDeferredRevenue` (number) - Non Current Deferred Revenue

* `nonCurrentDeferredTaxesLiabilities` (number) - Non Current Deferred Taxes Liabilities

* `ordinarySharesNumber` (number) - Ordinary Shares Number

* `otherCapitalStock` (number) - Other Capital Stock

* `otherCurrentAssets` (number) - Other Current Assets

* `otherCurrentBorrowings` (number) - Other Current Borrowings

* `otherCurrentLiabilities` (number) - Other Current Liabilities

* `otherIntangibleAssets` (number) - Other Intangible Assets

* `otherNonCurrentAssets` (number) - Other Non Current Assets

* `otherNonCurrentLiabilities` (number) - Other Non Current Liabilities

* `otherPayable` (number) - Other Payable

* `otherProperties` (number) - Other Properties

* `otherReceivables` (number) - Other Receivables

* `otherShortTermInvestments` (number) - Other Short Term Investments

* `payables` (number) - Payables

* `payablesAndAccruedExpenses` (number) - Payables And Accrued Expenses

* `periodEndingDate` (string) - Period Ending Date

* `receivables` (number) - Receivables

* `retainedEarnings` (number) - Retained Earnings

* `shareIssued` (number) - Share Issued

* `stockholdersEquity` (number) - Stockholders Equity

* `tangibleBookValue` (number) - Tangible Book Value

* `totalAssets` (number) - Total Assets

* `totalCapitalization` (number) - Total Capitalization

* `totalDebt` (number) - Total Debt

* `totalEquity` (number) - Total Equity

* `totalEquityGrossMinorityInterest` (number) - Total Equity Gross Minority Interest

* `totalLiabilities` (number) - Total Liabilities

* `totalLiabilitiesNetMinorityInterest` (number) - Total Liabilities Net Minority Interest

* `totalNonCurrentAssets` (number) - Total Non Current Assets

* `totalNonCurrentLiabilities` (number) - Total Non Current Liabilities

* `totalNonCurrentLiabilitiesNetMinorityInterest` (number) - Total Non Current Liabilities Net Minority Interest

* `workingCapital` (number) - Working Capital

## CashFlowStatement
Cash flow statement

* `beginningCashPosition` (number) - Beginning Cash Position

* `capitalExpenditure` (number) - Capital Expenditure

* `cashDividendsPaid` (number) - Cash Dividends Paid

* `changeInAccountPayable` (number) - Change In Account Payable

* `changeInInventory` (number) - Change In Inventory

* `changeInOtherWorkingCapital` (number) - Change In Other Working Capital

* `changeInPayable` (number) - Change In Payable

* `changeInPayablesAndAccruedExpense` (number) - Change In Payables And Accrued Expense

* `changeInReceivables` (number) - Change In Receivables

* `changeInWorkingCapital` (number) - Change In Working Capital

* `changesInAccountReceivables` (number) - Changes In Account Receivables

* `changesInCash` (number) - Changes In Cash

* `commonStockIssuance` (number) - Common Stock Issuance

* `commonStockPayments` (number) - Common Stock Payments

* `currencyId` ("USD") - Currency Id

* `deferredIncomeTax` (number) - Deferred Income Tax

* `deferredTax` (number) - Deferred Tax

* `depreciationAmortizationDepletion` (number) - Depreciation Amortization Depletion

* `depreciationAndAmortization` (number) - Depreciation And Amortization

* `endCashPosition` (number) - End Cash Position

* `financingCashFlow` (number) - Financing Cash Flow

* `fiscalYearEnd` (number) - Fiscal Year End

* `freeCashFlow` (number) - Free Cash Flow

* `id` ([FinancialId](#financialid)) - Id

* `incomeTaxPaidSupplementalData` (number) - Income Tax Paid Supplemental Data

* `interestPaidSupplementalData` (number) - Interest Paid Supplemental Data

* `investingCashFlow` (number) - Investing Cash Flow

* `isCalculated` (boolean) - Is Calculated

* `issuanceOfCapitalStock` (number) - Issuance Of Capital Stock

* `longTermDebtPayments` (number) - Long Term Debt Payments

* `netBusinessPurchaseAndSale` (number) - Net Business Purchase And Sale

* `netCommonStockIssuance` (number) - Net Common Stock Issuance

* `netIncome` (number) - Net Income

* `netIncomeFromContinuingOperations` (number) - Net Income From Continuing Operations

* `netIntangiblesPurchaseAndSale` (number) - Net Intangibles Purchase And Sale

* `netInvestmentPurchaseAndSale` (number) - Net Investment Purchase And Sale

* `netIssuancePaymentsOfDebt` (number) - Net Issuance Payments Of Debt

* `netLongTermDebtIssuance` (number) - Net Long Term Debt Issuance

* `netOtherFinancingCharges` (number) - Net Other Financing Charges

* `netOtherInvestingChanges` (number) - Net Other Investing Changes

* `netPpePurchaseAndSale` (number) - Net Ppe Purchase And Sale

* `netShortTermDebtIssuance` (number) - Net Short Term Debt Issuance

* `operatingCashFlow` (number) - Operating Cash Flow

* `otherNonCashItems` (number) - Other Non Cash Items

* `periodEndingDate` (string) - Period Ending Date

* `purchaseOfBusiness` (number) - Purchase Of Business

* `purchaseOfIntangibles` (number) - Purchase Of Intangibles

* `purchaseOfInvestment` (number) - Purchase Of Investment

* `purchaseOfPpe` (number) - Purchase Of Ppe

* `purchaseOfShortTermInvestments` (number) - Purchase Of Short Term Investments

* `repaymentOfDebt` (number) - Repayment Of Debt

* `repurchaseOfCapitalStock` (number) - Repurchase Of Capital Stock

* `saleOfInvestment` (number) - Sale Of Investment

* `saleOfShortTermInvestments` (number) - Sale Of Short Term Investments

* `stockBasedCompensation` (number) - Stock Based Compensation

## IncomeStatement
Income statement

* `costOfRevenue` (number) - Cost Of Revenue

* `currencyId` (string) - Currency Id

* `ebit` (number) - Ebit

* `ebitda` (number) - Ebitda

* `fiscalYearEnd` (number) - Fiscal Year End

* `grossProfit` (number) - Gross Profit

* `id` ([FinancialId](#financialid)) - Id

* `interestExpense` (number) - Interest Expense

* `interestExpenseNonOperating` (number) - Interest Expense Non Operating

* `interestIncome` (number) - Interest Income

* `interestIncomeNonOperating` (number) - Interest Income Non Operating

* `interestandSimilarIncome` (number) - Interestand Similar Income

* `isCalculated` (boolean) - Is Calculated

* `netIncome` (number) - Net Income

* `netIncomeCommonStockholders` (number) - Net Income Common Stockholders

* `netIncomeContinuousOperations` (number) - Net Income Continuous Operations

* `netIncomeFromContinuingAndDiscontinuedOperation` (number) - Net Income From Continuing And Discontinued Operation

* `netIncomeFromContinuingOperationNetMinorityInterest` (number) - Net Income From Continuing Operation Net Minority Interest

* `netIncomeIncludingNoncontrollingInterests` (number) - Net Income Including Noncontrolling Interests

* `netInterestIncome` (number) - Net Interest Income

* `netNonOperatingInterestIncomeExpense` (number) - Net Non Operating Interest Income Expense

* `nonOperatingExpenses` (number) - Non Operating Expenses

* `nonOperatingIncome` (number) - Non Operating Income

* `normalizedEbitda` (number) - Normalized Ebitda

* `normalizedIncome` (number) - Normalized Income

* `operatingExpense` (number) - Operating Expense

* `operatingIncome` (number) - Operating Income

* `operatingRevenue` (number) - Operating Revenue

* `otherIncomeExpense` (number) - Other Income Expense

* `periodEndingDate` (string) - Period Ending Date

* `pretaxIncome` (number) - Pretax Income

* `reconciledCostOfRevenue` (number) - Reconciled Cost Of Revenue

* `reconciledDepreciation` (number) - Reconciled Depreciation

* `researchAndDevelopment` (number) - Research And Development

* `sellingGeneralAndAdministration` (number) - Selling General And Administration

* `taxProvision` (number) - Tax Provision

* `totalExpenses` (number) - Total Expenses

* `totalRevenue` (number) - Total Revenue

## Financial
Financial report

* `aorRestate` (string) - AOR Restate

* `asOf` (string) - Date of report

* `balanceSheet` ([BalanceSheet](#balancesheet)) - Balance sheet

* `cashFlowStatement` ([CashFlowStatement](#cashflowstatement)) - Cash flow statement

* `incomeStatement` ([IncomeStatement](#incomestatement)) - Income statement

* `period` (string) - Period of report

* `reportType` (string) - Report type

## EarningRatio
Earning ratio

* `dilutedContEpsGrowth` (number) 

* `dilutedEpsGrowth` (number) 

* `dpsGrowth` (number) 

* `equityPerShareGrowth` (number) 

* `fiscalYearEnd` (number) 

## EarningReport
Earning report

* `basicAverageShares` (number) - Basic Average Shares

* `basicContinuousOperations` (number) - Basic Continuous Operations

* `basicEps` (number) - Basic Eps

* `continuingAndDiscontinuedBasicEps` (number) - Continuing And Discontinued Basic Eps

* `continuingAndDiscontinuedDilutedEps` (number) - Continuing And Discontinued Diluted Eps

* `currencyId` (string) - Currency Id

* `dilutedAverageShares` (number) - Diluted Average Shares

* `dilutedContinuousOperations` (number) - Diluted Continuous Operations

* `dilutedEps` (number) - Diluted Eps

* `dividendPerShare` (number) - Dividend Per Share

* `fiscalYearEnd` (number) - Fiscal Year End

* `id` ([FinancialId](#financialid)) - Id

* `normalizedBasicEps` (number) - Normalized Basic Eps

* `normalizedDilutedEps` (number) - Normalized Diluted Eps

## Company
Company info

* `cik` (string) - Company CIK

* `countryId` (string) - ID of the company country

* `cusip` (string) - CUSIP

* `isin` (string) - ISIN

* `primaryExchange` (string) - Primary exchange for company

* `primarySymbol` (StockSymbol) - Primary company symbol on exchange

* `sedol` (string) - SEDOL

* `standardName` (string) - Standard company name

* `valoren` (string) - Valoren

## CompanyProfile
Company profile

* `address1` (string) - Address

* `city` (string) - City

* `companyStatus` (string) - Company Status

* `country` (string) - Country

* `countryId` (string) - Country Id

* `fax` (string) - Fax

* `fiscalYearEnd` (string) - Fiscal Year End

* `homepage` (string) - Homepage

* `legalName` (string) - Legal Name

* `longDescription` (string) - Long Description

* `phone` (string) - Phone

* `postalCode` (string) - Postal Code

* `province` (string) - Province

* `shortDescription` (string) - Short Description

* `shortName` (string) - Short Name

* `standardName` (string) - Standard Name

## AssetClassification
Asset classification

* `msGroupCode` (number) 

* `msGroupName` (string) 

* `msIndustryCode` (number) 

* `msIndustryName` (string) 

* `msSectorCode` (number) 

* `msSectorName` (string) 

* `msSuperSectorCode` (number) 

* `msSuperSectorName` (string) 

* `naics` (string) 

* `naicsName` (string) 

* `sic` (string) 

* `sicName` (string) 

## ShareClass
Share class

* `currency` (string) 

* `ipoDate` (number) 

* `isDepositaryReceipt` (boolean) 

* `isPrimary` (true) 

* `securityType` (string) 

* `shareClassId` (string) 

## ShareClassProfile
Share class profile

* `asOf` (string) 

* `enterpriseValue` (number) 

* `marketCap` (number) 

## OperationRatio
Operation ratio

* `assetsTurnover` (number) - Assets Turnover

* `cashConversionCycle` (number) - Cash Conversion Cycle

* `commonEquityToAssets` (number) - Common Equity To Assets

* `currentRatio` (number) - Current Ratio

* `daysInInventory` (number) - Days In Inventory

* `daysInPayment` (number) - Days In Payment

* `daysInSales` (number) - Days In Sales

* `debttoAssets` (number) - Debt to Assets

* `ebitMargin` (number) - Ebit Margin

* `ebitdaMargin` (number) - Ebitda Margin

* `financialLeverage` (number) - Financial Leverage

* `fiscalYearEnd` (number) - Fiscal Year End

* `fixAssetsTuronver` (number) - Fix Assets Turonver

* `grossMargin` (number) - Gross Margin

* `id` ([FinancialId](#financialid)) - Id

* `interestCoverage` (number) - Interest Coverage

* `inventoryTurnover` (number) - Inventory Turnover

* `isCalculated` (boolean) - Is Calculated

* `longTermDebtEquityRatio` (number) - Long Term Debt Equity Ratio

* `longTermDebtTotalCapitalRatio` (number) - Long Term Debt Total Capital Ratio

* `netIncomeContOpsGrowth` (number) - Net Income Cont Ops Growth

* `netIncomeGrowth` (number) - Net Income Growth

* `netMargin` (number) - Net Margin

* `normalizedNetProfitMargin` (number) - Normalized Net Profit Margin

* `normalizedRoic` (number) - Normalized Roic

* `operationIncomeGrowth` (number) - Operation Income Growth

* `operationMargin` (number) - Operation Margin

* `operationRevenueGrowth3MonthAvg` (number) - Operation Revenue Growth3 Month Avg

* `paymentTurnover` (number) - Payment Turnover

* `pretaxMargin` (number) - Pretax Margin

* `quickRatio` (number) - Quick Ratio

* `receivableTurnover` (number) - Receivable Turnover

* `revenueGrowth` (number) - Revenue Growth

* `roa` (number) - Roa

* `roe` (number) - Roe

* `roic` (number) - Roic

* `salesPerEmployee` (number) - Sales Per Employee

* `taxRate` (number) - Tax Rate

* `totalDebtEquityRatio` (number) - Total Debt Equity Ratio

## ValuationRatio
Valuation ratio

* `bookValuePerShare` (number) 

* `bookValueYield` (number) 

* `buyBackYield` (number) 

* `cashReturn` (number) 

* `cfYield` (number) 

* `cfoPerShare` (number) 

* `earningYield` (number) 

* `evToEbitda` (number) 

* `fcfPerShare` (number) 

* `fcfRatio` (number) 

* `fcfYield` (number) 

* `forwardDividend` (number) 

* `forwardDividendYield` (number) 

* `forwardEarningYield` (number) 

* `forwardPeRatio` (number) 

* `id` ([InstrumentIdentifier](#instrumentidentifier)) 

* `normalizedPeRatio` (number) 

* `payoutRatio` (number) 

* `pbRatio` (number) 

* `pcfRatio` (number) 

* `peRatio` (number) 

* `pegPayback` (number) 

* `pegRatio` (number) 

* `priceChange1M` (number) 

* `pricetoEbitda` (number) 

* `psRatio` (number) 

* `ratioPe5YearAverage` (number) 

* `salesPerShare` (number) 

* `salesYield` (number) 

* `sustainableGrowthRate` (number) 

* `tangibleBookValuePerShare` (number) 

* `tangibleBvPerShare3YrAvg` (number) 

* `tangibleBvPerShare5YrAvg` (number) 

* `totalYield` (number) 

* `trailingDividendYield` (number) 

* `workingCapitalPerShare` (number) 

* `workingCapitalPerShare3YrAvg` (number) 

* `workingCapitalPerShare5YrAvg` (number) 

## Financials
Complete financials data

* `alphaBeta` ([AlphaBeta](#alphabeta)[]) 

* `assetClassification` ([AssetClassification](#assetclassification)) 

* `company` ([Company](#company)) 

* `companyProfile` ([CompanyProfile](#companyprofile)) 

* `earningRatios` ([EarningRatio](#earningratio)[]) 

* `earningReports` ([EarningReport](#earningreport)[]) 

* `error` (string) 

* `financials` ([Financial](#financial)[]) 

* `id` (string) - ID of the financials object

* `idType` (string) 

* `operationRatios` ([OperationRatio](#operationratio)[]) 

* `shareClass` ([ShareClass](#shareclass)) 

* `shareClassProfile` ([ShareClassProfile](#shareclassprofile)) 

* `symbol` (StockSymbol) 

* `valuationRatios` ([ValuationRatio](#valuationratio)[]) 

## FinancialsQuery
Financials request query

* `symbols` (string) - CSV symbols list for filtering

* `period` (string) - Period of the query

