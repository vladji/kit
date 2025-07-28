import { useMutation } from '@tanstack/react-query';
import { getUserByUniqueId } from 'entities/user/api/requests.ts';
import { UserByUniqueIdRequest } from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const useGetUserByUniqueId = () => {
  const { mutateAsync } = useMutation<
    UserProps,
    unknown,
    UserByUniqueIdRequest
  >({
    mutationFn: ({ uniqueId }) => getUserByUniqueId(uniqueId),
  });

  return {
    getUserByUniqueId: mutateAsync,
  };
};
