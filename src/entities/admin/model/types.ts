import { createTypeGuard } from 'shared/lib/types/fabric.ts';

export interface AdminProps {
  id: string;
  uniqId: string;
  name: string;
  avatarUrl: string;
  disabled: boolean;
  chatEnabled: boolean;
  chatNotificationEnabled: boolean;
}

export const isAdmin = createTypeGuard<AdminProps>({
  id: { type: 'string' },
  uniqId: { type: 'string' },
  name: { type: 'string' },
  avatarUrl: { type: 'string' },
  disabled: { type: 'boolean' },
  chatEnabled: { type: 'boolean' },
  chatNotificationEnabled: { type: 'boolean' },
});
