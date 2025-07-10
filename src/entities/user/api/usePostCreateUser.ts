import { useMutation } from '@tanstack/react-query';
import { createUser } from 'entities/user/api/requests.ts';
import { UserByUniqueIdResponse } from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const usePostCreateUser = () => {
  const { mutateAsync } = useMutation<
    UserByUniqueIdResponse,
    unknown,
    UserProps
  >({
    mutationFn: (data) => createUser(data),
  });

  return {
    postCreateUser: mutateAsync,
  };
};
