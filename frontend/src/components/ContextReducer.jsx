import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          quantity: action.quantity,
          size: action.size,
          price: action.price,
          image: action.image,
        },
      ];
    case "Remove":
      let new_arr = [...state];
      new_arr.splice(action.index, 1);
      return new_arr;
    case "Drop":
      return [];
    case "Update":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            quantity: item.quantity + parseInt(action.quantity),
            price: item.price + action.price,
          };
        }
        return item;
      });
    default:
      console.log("Error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useDispatchCart = () => useContext(CartDispatchContext);
export const useCart = () => useContext(CartStateContext);
