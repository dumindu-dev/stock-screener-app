export const parameterConfig = {
    "fullTimeEmployees": {
        'type': 'int',
        'min': 0,
        'max': 10000,
        'description': 'The number of full-time employees working for the company.'
    },
    "previousClose": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The previous day\'s closing price of the stock.'
    },
    "dividendRate": {
        'type': 'float',
        'min': 0.0,
        'max': 10.0,
        'description': 'The dividend rate per share for the company.'
    },
    "dividendYield": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The dividend yield expressed as a percentage.'
    },
    "payoutRatio": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The payout ratio of the company.'
    },
    "trailingPE": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The trailing price-to-earnings (P/E) ratio.'
    },
    "volume": {
        'type': 'int',
        'min': 0,
        'max': 10000000,
        'description': 'The trading volume of the stock.'
    },
    "averageVolume": {
        'type': 'int',
        'min': 0,
        'max': 10000000,
        'description': 'The average trading volume of the stock over a specified period.'
    },
    "averageVolume10days": {
        'type': 'int',
        'min': 0,
        'max': 10000000,
        'description': 'The average trading volume of the stock over the past 10 days.'
    },
    "marketCap": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The market capitalization of the company.'
    },
    "fiftyTwoWeekLow": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The 52-week low price of the stock.'
    },
    "fiftyTwoWeekHigh": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The 52-week high price of the stock.'
    },
    "priceToSalesTrailing12Months": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The trailing price-to-sales (P/S) ratio over the past 12 months.'
    },
    "fiftyDayAverage": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The 50-day moving average of the stock price.'
    },
    "twoHundredDayAverage": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The 200-day moving average of the stock price.'
    },
    "trailingAnnualDividendRate": {
        'type': 'float',
        'min': 0.0,
        'max': 10.0,
        'description': 'The trailing annual dividend rate per share.'
    },
    "trailingAnnualDividendYield": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The trailing annual dividend yield expressed as a percentage.'
    },
    "enterpriseValue": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The enterprise value of the company.'
    },
    "profitMargins": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The profit margin of the company.'
    },
    "floatShares": {
        'type': 'int',
        'min': 0,
        'max': 10000000,
        'description': 'The number of floating shares available for trading.'
    },
    "sharesOutstanding": {
        'type': 'int',
        'min': 0,
        'max': 10000000,
        'description': 'The total number of shares outstanding for the company.'
    },
    "bookValue": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The book value of the company per share.'
    },
    "priceToBook": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The price-to-book (P/B) ratio of the company.'
    },
    "earningsQuarterlyGrowth": {
        'type': 'float',
        'min': -100.0,
        'max': 100.0,
        'description': 'The quarterly growth rate of earnings for the company.'
    },
    "netIncomeToCommon": {
        'type': 'float',
        'min': 0.0,
        'max': 10000000000.0,
        'description': 'The net income available to common shareholders.'
    },
    "trailingEps": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The trailing earnings per share (EPS) of the company.'
    },
    "pegRatio": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The price/earnings-to-growth (PEG) ratio of the company.'
    },
    "enterpriseToRevenue": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The enterprise-to-revenue ratio of the company.'
    },
    "enterpriseToEbitda": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The enterprise-to-EBITDA ratio of the company.'
    },
    "52WeekChange": {
        'type': 'float',
        'min': -100.0,
        'max': 100.0,
        'description': 'The percentage change in the stock price over the past 52 weeks.'
    },
    "lastDividendValue": {
        'type': 'float',
        'min': 0.0,
        'max': 10.0,
        'description': 'The value of the last dividend paid by the company.'
    },
    "currentPrice": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The current trading price of the stock.'
    },
    "totalCash": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The total cash holdings of the company.'
    },
    "totalCashPerShare": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The total cash holdings per share of the company.'
    },
    "ebitda": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The earnings before interest, taxes, depreciation, and amortization (EBITDA) of the company.'
    },
    "totalDebt": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The total debt of the company.'
    },
    "quickRatio": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The quick ratio of the company.'
    },
    "currentRatio": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The current ratio of the company.'
    },
    "totalRevenue": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The total revenue generated by the company.'
    },
    "debtToEquity": {
        'type': 'float',
        'min': 0.0,
        'max': 100.0,
        'description': 'The debt-to-equity ratio of the company.'
    },
    "revenuePerShare": {
        'type': 'float',
        'min': 0.0,
        'max': 1000.0,
        'description': 'The revenue per share of the company.'
    },
    "operatingCashflow": {
        'type': 'float',
        'min': 0.0,
        'max': 1000000000000.0,
        'description': 'The operating cash flow of the company.'
    },
    "earningsGrowth": {
        'type': 'float',
        'min': -100.0,
        'max': 100.0,
        'description': 'The growth rate of earnings for the company.'
    },
    "revenueGrowth": {
        'type': 'float',
        'min': -100.0,
        'max': 100.0,
        'description': 'The growth rate of revenue for the company.'
    },
    "grossMargins": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The gross profit margin of the company.'
    },
    "ebitdaMargins": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The EBITDA margin of the company.'
    },
    "operatingMargins": {
        'type': 'float',
        'min': 0.0,
        'max': 1.0,
        'description': 'The operating profit margin of the company.'
    },
}
