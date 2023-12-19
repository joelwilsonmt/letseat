import React, { useState } from 'react';

const NavbarSearch = () => {
  const [searchValue, setSearchValue] = useState('');

//   const clearInput = () => {
//     setSearchValue('');
//   };

  return (
    <form className="searchForm">
      <input
        type="search"
        required
        className="input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <i className="fa fa-search" />
      {/* <a href="javascript:void(0)" onClick={clearInput} className={styles.clearBtn}>
        Clear
      </a> */}
    </form>
  );
};

export default NavbarSearch;
