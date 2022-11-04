import { getGlobalSession } from '../session';
import { MoversManager } from '@benzinga/movers-manager';

export default async () => {
  const moversManager = await getGlobalSession().getManager(MoversManager);

  const moversBox = await moversManager.getMovers({
    from: '-15m',
    session: 'REGULAR',
  });

  if (moversBox.err) {
    console.error(`Movers error: `, moversBox.err);
    return;
  }

  const movers = moversBox.result;

  console.log(
    `Movers gainers from ${movers?.fromDate} to ${movers?.toDate}:\n${movers?.gainers
      .map(g => `${g.companyName} (${g.symbol}) -> ${g.change}`)
      .join('\n')}`,
  );
};
