export interface AppNamesI {
  bz: string;
  india: string;
  money: string;
}

export const appName: AppNamesI = {
  bz: 'default',
  india: 'india',
  money: 'money',
};

export interface AppConfigI {
  app: AppNamesI[keyof AppNamesI];
  url: string;
  zone: string;
}

export const appConfig: AppConfigI[] = [
  { app: appName.bz, url: `${process.env.BASE_URL}`, zone: 'America/New_York' },
  { app: appName.money, url: `${process.env.BASE_URL}`, zone: 'America/New_York' },
  { app: appName.india, url: 'https://in.benzinga.com', zone: 'Asia/Kolkata' },
];

export const appEnvironment = () => {
  const app = () => {
    return process.env.NX_TASK_TARGET_PROJECT?.toLowerCase();
  };

  // Returns appConfig object
  const config = () => {
    const result = appConfig.find(item => {
      return item.app.toLowerCase() === app();
    });
    return result ? result : appConfig[0];
  };

  // Returns app type - "default" appName
  const isApp = (app: AppNamesI[keyof AppNamesI] = appName.bz) => {
    return config().app === app.toLowerCase();
  };

  return { app, config, isApp };
};
