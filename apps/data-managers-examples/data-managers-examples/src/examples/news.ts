import { getGlobalSession } from '../session';
import { NewsManager } from '@benzinga/news-manager';

export default async () => {
  //Obtain manager instance
  const newsManager = getGlobalSession().getManager(NewsManager);

  //First let's just fetch
  const categoriesResult = await newsManager.getCategories();

  if (categoriesResult.err) {
    console.error(`Categories error: `, categoriesResult.err);
    return;
  }

  const categories = categoriesResult.ok;

  console.log(categories);
};
