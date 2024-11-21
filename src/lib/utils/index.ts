import { FXQLParserError } from '../exception/FXQLParser.error';

function validateRate(rate) {
  const ratePattern = /^\d+(\.\d+)?$/;
  return ratePattern.test(rate) && parseFloat(rate) > 0;
}

function validateCap(cap) {
  // CAP must be a whole non-negative number
  return Number.isInteger(cap) && cap >= 0;
}

export function FXQLParser(str: string) {
  // split on the \\n
  const fxqlStatements = str.split('\\n\\n');

  const parsedData = [];

  for (const [index, fxqlStatement] of fxqlStatements.entries()) {
    // validate each statement that was splitted

    const currPairArr = fxqlStatement.split('{\\n');

    //validate currency pair array
    if (!currPairArr[0]) {
      throw new FXQLParserError(
        `Invalid input currency code does not exist at fxl string with index ${index + 1}`,
      );
    }
    const currencyArray = currPairArr[0].trim().split('-');
    currencyArray.forEach((element) => {
      if (element.length !== 3 && /^[A-Z]+$/.test(element)) {
        // error occurred at the
        throw new FXQLParserError(
          `Invalid currency code for ${sourceCurrency}-${destinationCurrency} at ${index + 1} fxl string `,
        );
      }
    });

    const [sourceCurrency, destinationCurrency] = currencyArray;

    let ratesStringArr = currPairArr[1].replace('\\n}', '').trim().split('\\n');
    // BUY 0.85
    // SELL 0.90
    // CAP 1000
    // make sure length is 3
    if (ratesStringArr.length !== 3) {
      throw new FXQLParserError(
        `invalid fxl statement at at ${index + 1} fxl string with currency - ${sourceCurrency}-${destinationCurrency}... rate and cap are exceeding expectations`,
      );
    }
    const [mainStr, buyRate, sellRate, cap, ...rest] = [
      ...ratesStringArr
        .join('')
        .matchAll(
          /BUY\s*(\d+\.\d+|\d+)\s*SELL\s*(\d+\.\d+|\d+)\s*CAP\s*(\d+)/g,
        ),
    ][0];

    // Validate rates (BUY and SELL)
    if (!validateRate(buyRate)) {
      throw new FXQLParserError(
        `Invalid rate for ${sourceCurrency}-${destinationCurrency}. BUY: ${buyRate} `,
      );
    }

    if (!validateRate(sellRate)) {
      throw new FXQLParserError(
        `Invalid rate for ${sourceCurrency}-${destinationCurrency}. SELL: ${sellRate}`,
      );
    }

    // Validate CAP
    if (!validateCap(parseInt(cap))) {
      throw new FXQLParserError(
        `Invalid CAP for ${sourceCurrency}-${destinationCurrency}. CAP: ${cap}`,
      );
    }

    const currencyPair = {
      SourceCurrency: sourceCurrency,
      DestinationCurrency: destinationCurrency,
      BuyPrice: buyRate,
      SellPrice: sellRate,
      CapAmount: cap,
    };

    // Add the object to the parsed data array
    parsedData.push(currencyPair);
  }

  return parsedData;
}
