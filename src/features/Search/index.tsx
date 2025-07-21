import { useEffect, useState } from 'react';
import { REACT_ADMIN_LOGIN_PHRASE } from '@env';
import { Search as SearchIcon } from 'lucide-react-native';
import { AdminLogin } from 'features/AdminLogin';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { TextInputAction } from 'shared/ui/TextInputAction';

export const Search = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onSearchPress = () => {
    return;
  };

  const toggleShowAdmin = () => {
    setShowAdminLogin((prev) => !prev);
  };

  useEffect(() => {
    if (searchValue === REACT_ADMIN_LOGIN_PHRASE) {
      toggleShowAdmin();
    }
  }, [searchValue]);

  return (
    <>
      <TextInputAction
        inputValue={searchValue}
        onChangeText={setSearchValue}
        onPress={onSearchPress}
        Icon={<SearchIcon color={LIGHT_COLOR} />}
        inputMode="search"
      />
      <AdminLogin show={showAdminLogin} onClose={toggleShowAdmin} />
    </>
  );
};
