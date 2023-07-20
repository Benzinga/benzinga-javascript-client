import { getGlobalSession } from '../session';
import { AdvancedNewsManager } from '@benzinga/advanced-news-manager';

export default async () => {
  //Obtain manager instance
  const advancedNewManager = getGlobalSession().getManager(AdvancedNewsManager);

  //First let's just fetch
  const categoriesResult = await advancedNewManager.getCategories();

  if (categoriesResult.err) {
    console.error(`Categories error: `, categoriesResult.err);
    return;
  }

  const categories = categoriesResult.ok;

  console.log(categories);
};
