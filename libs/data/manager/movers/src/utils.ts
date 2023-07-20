import { Session } from '@benzinga/session';
import { MoversQuery, Movers, Mover } from './entities';
import { MoversManager } from './manager';

/**
 * Combine gainers and losers into an "all" array
 *
 * @param {Session} session
 * @param {MoversQuery} query
 */
export const getAllMovers = async (session: Session, query: MoversQuery): Promise<Movers | null> => {
  const res = await session.getManager(MoversManager).getMovers(query);
  if (res.ok) {
    const movers = res?.ok as Movers;
    if (movers) {
      movers.all = [...(movers?.gainers ?? []), ...(movers?.losers ?? [])].sort((a: Mover, b: Mover) => {
        if (Math.abs(a.changePercent) > Math.abs(b.changePercent)) return -1;
        if (Math.abs(a.changePercent) < Math.abs(b.changePercent)) return 1;
        return 0;
      });
    }
    return movers;
  }
  return null;
};
