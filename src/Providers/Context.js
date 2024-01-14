/* /context/AppContext.js */

import React, { createContext, useState } from 'react';
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = createContext();

const defaultCart = { items: [], total: 0 };

// // TODO: maybe use this, and fix it
// const fixFloatingNumber = (num) => {
//     return parseFloat(num.toFixed(2));
// };

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(defaultCart);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // console.log('floating point', fixFloatingNumber(34.55555555));

    const addItem = (item) => {
        let { items } = cart;
        //check for item already in cart
        //if not in cart, add item if item is found increase quanity ++
        let foundItem = true;

        if (items.length > 0) {
            foundItem = items.find((i) => i.id === item.id);

            if (!foundItem) foundItem = false;
        } else {
            foundItem = false;
        }
        // if item is not new, add to cart, set quantity to 1
        if (!foundItem) {
            //set quantity property to 1

            let temp = JSON.parse(JSON.stringify(item));
            temp.quantity = 1;
            var newCart = {
                items: [...cart.items, temp],
                total: cart.total + item.price,
            };
            setCart(newCart);
        } else {
            // we already have it so just increase quantity ++
            newCart = {
                items: items.map((item) => {
                    if (item.id === foundItem.id) {
                        return Object.assign({}, item, { quantity: item.quantity + 1 });
                    } else {
                        return item;
                    }
                }),
                total: cart.total + item.price,
            };
        }
        setCart(newCart); // problem is this is not updated yet
    };

    const removeItem = (item) => {
        let { items } = cart;
        //check for item already in cart
        const foundItem = items.find((i) => i.id === item.id);
        if (foundItem.quantity > 1) {
            var newCart = {
                items: items.map((item) => {
                    if (item.id === foundItem.id) {
                        return Object.assign({}, item, { quantity: item.quantity - 1 });
                    } else {
                        return item;
                    }
                }),
                total: cart.total - item.price,
            };
            //console.log(`NewCart after remove: ${JSON.stringify(newCart)}`)
        } else {
            // only 1 in the cart so remove the whole item
            console.log(`Try remove item ${JSON.stringify(foundItem)}`);
            const index = items.findIndex((i) => i.id === foundItem.id);
            items.splice(index, 1);
            var newCart = { items: items, total: cart.total - item.price };
        }
        setCart(newCart);
    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        cart,
        addItem,
        removeItem,
        user,
        setUser,
        logout: () => {},
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function useApp() {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within a CountProvider');
    }
    return context;
}

export { useApp, AppProvider };
export default AppContext;
