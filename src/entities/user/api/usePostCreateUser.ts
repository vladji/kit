import { useMutation } from '@tanstack/react-query';
import { createUser } from 'entities/user/api/requests.ts';
import {
  CreateUserDocument,
  UserDocumentResponse,
} from 'entities/user/api/types.ts';
import { UserProps } from 'entities/user/model/types.ts';

export const usePostCreateUser = () => {
  const { mutateAsync } = useMutation<
    UserDocumentResponse,
    unknown,
    CreateUserDocument
  >({
    mutationFn: (data) => createUser(data),
  });

  return {
    postCreateUser: mutateAsync,
  };
};
