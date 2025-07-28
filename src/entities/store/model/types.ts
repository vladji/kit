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
  userId: string;
  storeName: string;
  storeAvatarUrl: string;
  storeImageUrl: string[];
  workingTime?: StoreWorkingTime[];
  contacts?: StoreContactsProps;
  showcases?: ShowcaseProps[];
}
