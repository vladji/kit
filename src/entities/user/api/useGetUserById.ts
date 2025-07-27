import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/api/constants.ts';
import { useGetAsyncStorage } from 'app/storage/lib/useGetAsyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { getUserById } from 'entities/user/api/requests.ts';

export const useGetUserById = () => {
  const { data: userDbId } = useGetAsyncStorage<string>(
    AsyncStorageKeys.UserDbId,
  );

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userDbId],
    queryFn: () => getUserById(userDbId),
    enabled: !!userDbId,
    refetchOnWindowFocus: true,
  });

  return {
    data,
    isLoading,
  };
};
