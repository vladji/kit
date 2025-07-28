import { useMutation } from '@tanstack/react-query';
import { getStore } from 'entities/store/api/requests.ts';
import { StoreRequest } from 'entities/store/api/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';

export const useGetStore = () => {
  const { mutateAsync, data } = useMutation<StoreProps, unknown, StoreRequest>({
    mutationFn: ({ storeId }) => getStore(storeId),
  });

  return {
    getStore: mutateAsync,
    store: data,
  };
};
