import { useMutation } from '@tanstack/react-query';
import { createUser } from 'app/providers/UserInitialize/api/requests.ts';
import {
  CreateUserDocument,
  UserDocumentResponse,
} from 'app/providers/UserInitialize/api/types.ts';
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
