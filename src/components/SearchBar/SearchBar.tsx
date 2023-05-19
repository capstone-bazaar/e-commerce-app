import styled from 'styled-components';
import { SearchIcon } from '../../assests/icons';
import { Button } from '../Buttons/Button';
import { Input } from '../Input/Input';
import { useState } from 'react';
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function SearchBar({
  onSearch,
}: {
  //eslint-disable-next-line
  onSearch: (text: string) => any;
}) {
  const [searchString, setSearchString] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchString);
  };

  const handlePressedEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchBarContainer>
      <Input
        placeholder="Search"
        style={{
          width: '35%',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={(e) => handlePressedEnterKey(e)}
      />
      <Button
        onClick={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderRight: '0px solid',
          width: '150px',
        }}
      >
        <SearchIcon />
        Search
      </Button>
    </SearchBarContainer>
  );
}
