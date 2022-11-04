export type Sound = '' | 'alarm' | 'droplet' | 'glass' | 'morsecode' | 'opencan' | 'pot' | 'shatter' | 'siren';

export interface SoundAlert {
  id: Sound;
  name: string;
}

export const soundAlerts: SoundAlert[] = [
  {
    id: '',
    name: 'None',
  },
  {
    id: 'alarm',
    name: 'Alarm',
  },
  {
    id: 'droplet',
    name: 'Droplet',
  },
  {
    id: 'glass',
    name: 'Glass',
  },
  {
    id: 'morsecode',
    name: 'Morsecode',
  },
  {
    id: 'opencan',
    name: 'Opencan',
  },
  {
    id: 'pot',
    name: 'Pot',
  },
  {
    id: 'shatter',
    name: 'Shatter',
  },
  {
    id: 'siren',
    name: 'Siren',
  },
];
