import { useMutation } from '@tanstack/react-query';
import { getUserById } from 'entities/user/api/requests.ts';
import { UserByIdRequest } from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const useGetUserById = () => {
  const { mutateAsync, data } = useMutation<
    UserProps,
    unknown,
    UserByIdRequest
  >({
    mutationFn: ({ userId }) => getUserById(userId),
  });

  return {
    getUserById: mutateAsync,
    user: data,
  };
};
