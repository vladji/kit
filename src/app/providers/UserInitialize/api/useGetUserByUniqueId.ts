import { useMutation } from '@tanstack/react-query';
import { getUserByUniqueId } from 'app/providers/UserInitialize/api/requests.ts';
import {
  UserByUniqueIdRequest,
  UserDocumentResponse,
} from 'app/providers/UserInitialize/api/types.ts';

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
