import React, { useState } from 'react';

const NavbarSearch = () => {
  const [searchValue, setSearchValue] = useState('');

//   const clearInput = () => {
//     setSearchValue('');
//   };

  return (
    <form className="search-form">
      <input
        type="search"
        required
        className="input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <i className="fa fa-search" />
    </form>
  );
};

export default NavbarSearch;
