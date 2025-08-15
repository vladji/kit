import { memo, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { REACT_ADMIN_LOGIN_PHRASE } from '@env';
import { Search as SearchIcon } from 'lucide-react-native';
import { AdminLogin } from 'features/AdminLogin';
import { TextInputAction } from 'shared/ui/TextInputAction';

export const Search = memo(() => {
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
      Keyboard.dismiss();
      toggleShowAdmin();
      setSearchValue('');
    }
  }, [searchValue]);

  return (
    <>
      <TextInputAction
        inputValue={searchValue}
        onChangeText={setSearchValue}
        onPress={onSearchPress}
        Icon={SearchIcon}
        inputMode="search"
      />
      <AdminLogin show={showAdminLogin} onClose={toggleShowAdmin} />
    </>
  );
});
