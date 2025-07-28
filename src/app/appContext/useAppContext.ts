import { useCallback, useEffect, useReducer } from 'react';
import { ColorSchemeName } from 'react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { initialState, reducer } from 'app/appContext/reducer.ts';
import { setInitialLocale, setInitialTheme } from 'app/appContext/utils.ts';
import { Locales } from 'app/locales/types.ts';
import { setAsyncStorageValue } from 'app/storage/lib/asyncStorage.ts';
import { AsyncStorageKeys } from 'app/storage/model/types.ts';
import { ChatProfileProps } from 'entities/chat/model/types.ts';
import { UserRolesProps } from 'entities/user/model/types.ts';

export const useAppContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocale = useCallback(async (locale: Locales) => {
    dispatch({ type: 'SET_LOCALE', payload: locale });
    await setAsyncStorageValue(AsyncStorageKeys.Locale, locale);
  }, []);

  const setTheme = useCallback(async (theme: ColorSchemeName) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    await setAsyncStorageValue(AsyncStorageKeys.Theme, theme);
  }, []);

  const setChatProfile = useCallback((profile: ChatProfileProps | null) => {
    dispatch({ type: 'SET_CHAT_PROFILE', payload: profile });
  }, []);

  const setUserAuthProfile = useCallback(
    (profile: FirebaseAuthTypes.User | null) => {
      dispatch({ type: 'SET_USER_AUTH_PROFILE', payload: profile });
    },
    [],
  );

  const setRoles = useCallback((roles: UserRolesProps) => {
    dispatch({ type: 'SET_ROLES', payload: roles });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await setInitialLocale({ localeState: state.locale, setLocale });
        await setInitialTheme({ themeState: state.theme, setTheme });
      } catch (error) {
        return null;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, [state.locale, state.theme, setLocale, setTheme]);

  return {
    contextLoading: state.contextLoading,
    locale: state.locale,
    theme: state.theme,
    chatProfile: state.chatProfile,
    userAuthProfile: state.userAuthProfile,
    roles: state.roles,
    setLocale,
    setTheme,
    setChatProfile,
    setUserAuthProfile,
    setRoles,
  };
};
