import { getUniqueId } from 'react-native-device-info';
import { createUser } from 'app/providers/UserInitialize/lib/createUser.ts';
import { getUserByUniqueId } from 'entities/user/api/requests.ts';

export const checkUser = async () => {
  const uniqueId = await getUniqueId();
  let user = await getUserByUniqueId(uniqueId);

  if (!user) {
    user = await createUser(uniqueId);
  }

  return user;
};
