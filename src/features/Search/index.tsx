import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react-native';
import { LIGHT_COLOR } from 'shared/styles/constants/colors.ts';
import { TextInputAction } from 'shared/ui/TextInputAction';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onPress = () => {
    return;
  };

  return (
    <TextInputAction
      inputValue={searchValue}
      onChangeText={setSearchValue}
      onPress={onPress}
      Icon={<SearchIcon color={LIGHT_COLOR} />}
    />
  );
};
