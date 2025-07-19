import { useContext } from 'react';
import { REACT_CHAT_ROOT_ADMIN } from '@env';
import { AppContext } from 'app/context';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';

export const useChatMember = () => {
  const { rootAdmin } = useContext(AppContext);
  const { data: uniqueId, isFetching } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UniqueId,
  );

  //TODO: implement authId (userAuthProfile)
  const member = rootAdmin ? REACT_CHAT_ROOT_ADMIN : uniqueId;

  return {
    member,
    loading: isFetching,
  };
};
