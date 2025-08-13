import { useCallback, useReducer } from 'react';
import { initialState, reducer } from 'app/appContext/reducer.ts';
import { Locales } from 'app/locales/types.ts';
import { AdminProps } from 'entities/admin/model/types.ts';
import { StoreProps } from 'entities/store/model/types.ts';
import { UserProps, UserRolesProps } from 'entities/user/model/types.ts';

export const useAppContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocale = useCallback((locale: Locales) => {
    dispatch({ type: 'SET_LOCALE', payload: locale });
  }, []);

  const setUserProfile = useCallback((profile: UserProps | null) => {
    dispatch({ type: 'SET_USER_PROFILE', payload: profile });
  }, []);

  const setAdminProfile = useCallback((profile: AdminProps | null) => {
    dispatch({ type: 'SET_ADMIN_PROFILE', payload: profile });
  }, []);

  const setStoreProfile = useCallback((profile: StoreProps | null) => {
    dispatch({ type: 'SET_STORE_PROFILE', payload: profile });
  }, []);

  const setRoles = useCallback((roles: UserRolesProps) => {
    dispatch({ type: 'SET_ROLES', payload: roles });
  }, []);

  return {
    locale: state.locale,
    userProfile: state.userProfile,
    adminProfile: state.adminProfile,
    storeProfile: state.storeProfile,
    roles: state.roles,
    setLocale,
    setUserProfile,
    setAdminProfile,
    setStoreProfile,
    setRoles,
  };
};
