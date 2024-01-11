/* /context/AppContext.js */

import React, { createContext } from 'react';
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = createContext({
    isAuthenticated: true,
    cart: { items: [], total: 0 },
    addItem: () => {},
    removeItem: () => {},
    user: false,
    setUser: () => {},
    logout: () => {},
});

export default AppContext;
