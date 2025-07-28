import api from 'app/api/api.ts';
import { ApiResponse } from 'app/api/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';

export const getStore = (
  storeId: string | null,
): Promise<ApiResponse<StoreProps>> =>
  api({
    url: `/store/${storeId}`,
  });
