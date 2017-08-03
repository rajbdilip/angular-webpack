import { Currency } from './currency.class';

export class Amount {
  sendAmount;
  sendCurrency: Currency;
  deductAmount;
  deductCurrency: Currency;
  intent: string;
  get fx(): boolean {
    return !(this.sendCurrency === this.deductCurrency);
  };
}