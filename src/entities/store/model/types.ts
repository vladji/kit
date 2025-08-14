import { createTypeGuard } from 'shared/lib/types/fabric.ts';
import { WeekDays } from 'shared/types/common.ts';

interface StoreWorkingTime {
  weekDay: WeekDays;
  time: string;
}

interface StoreContactsProps {
  phone?: string;
  whatsApp?: string;
  telegram?: string;
  zalo?: string;
  instagram?: string;
  facebook?: string;
}

interface ShowcaseProps {
  productName: string;
  productImageUrl: string[];
  productDescription: string;
  productPrice: number;
  group?: string;
  subGroup?: string;
}

export interface StoreProps {
  id: string;
  userId: string;
  storeName: string;
  storeAvatarUrl: string;
  storeImageUrl: string[];
  workingTime?: StoreWorkingTime[];
  contacts?: StoreContactsProps;
  showcases?: ShowcaseProps[];
}

export const isStore = createTypeGuard<StoreProps>({
  id: { type: 'string' },
  userId: { type: 'string' },
  storeName: { type: 'string' },
  storeAvatarUrl: { type: 'string' },
  storeImageUrl: { type: 'array' },
  workingTime: { type: 'array', optional: true },
  contacts: { type: 'object', optional: true },
  showcases: { type: 'array', optional: true },
});
