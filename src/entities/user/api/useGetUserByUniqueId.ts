import { useMutation } from '@tanstack/react-query';
import { getUserByUniqueId } from 'entities/user/api/requests.ts';
import {
  UserByUniqueIdRequest,
  UserDocumentResponse,
} from 'entities/user/api/types.ts';

export const useGetUserByUniqueId = () => {
  const { mutateAsync } = useMutation<
    UserDocumentResponse,
    unknown,
    UserByUniqueIdRequest
  >({
    mutationFn: ({ uniqueId }) => getUserByUniqueId(uniqueId),
  });

  return {
    getUserByUniqueId: mutateAsync,
  };
};
