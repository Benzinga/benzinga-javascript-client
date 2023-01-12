import moversExample from './examples/movers';
import securitiesExample from './examples/securities';
import wiimsExample from './examples/wiims';
import calendarsExample from './examples/calendar';

async function runAllExamples() {
  const list = {
    calendar: calendarsExample,
    movers: moversExample,
    securities: securitiesExample,
    wiims: wiimsExample,
  };

  for (const key in list) {
    console.log(`********** EXAMPLE ${key.toUpperCase()} **********`);

    await list[key]();

    console.log(`\n\n`);
  }
}

runAllExamples();
