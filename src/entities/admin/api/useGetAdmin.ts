import { useMutation } from '@tanstack/react-query';
import { getAdmin } from 'entities/admin/api/requests.ts';
import { AdminRequest } from 'entities/admin/api/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';

export const useGetAdmin = () => {
  const { mutateAsync, data } = useMutation<AdminProps, unknown, AdminRequest>({
    mutationFn: ({ adminId }) => getAdmin(adminId),
  });

  return {
    getAdmin: mutateAsync,
    admin: data,
  };
};
