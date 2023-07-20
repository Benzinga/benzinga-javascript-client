import { getGlobalSession } from '../session';
import { WiimsManager } from '@benzinga/wiims-manager';

/*
  WIIMs or Why Is It Moving API example
*/
export default async () => {
  //Obtain manager instance
  const manager = await getGlobalSession().getManager(WiimsManager);

  //Fetch WIIM data
  const box = await manager.getWiims({
    country: 'US',
    searchKeys: 'MRNA',
    searchKeysType: 'symbol',
  });

  if (box.err) {
    console.error(`Wiims errors: ${box.err}`);
    return;
  }

  console.log(box.ok);
};
