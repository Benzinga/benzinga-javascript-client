import { getGlobalSession } from '../session';
import { SecuritiesManager } from '@benzinga/securities-manager';

export default async () => {
  const manager: SecuritiesManager = await getGlobalSession().getManager(SecuritiesManager);

  //Financials report is quite extensive
  //So we just print everything out
  const finsBox = await manager.getFinancials({
    period: '3M',
    symbols: 'AAPL',
  });

  console.log(`Apple Financials:`);

  console.log(finsBox.ok);
};
