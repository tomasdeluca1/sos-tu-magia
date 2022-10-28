import { createContext, useState, useContext } from "react";
import { useNotification } from "../NotificationContext/Notification";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { setNotification } = useNotification();

  const addItem = (productToAdd) => {
    if (!isInCart(productToAdd.id)) {
      setCart([...cart, productToAdd]);
      setNotification(
        "success",
        `Se agrego correctamente ${productToAdd.quantity} "${productToAdd.name}"`
      );
    } else {
      setNotification("fail", `"${productToAdd.name}" ya está agregado`);
    }
  };

  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  const removeList = () => {
    setCart([]);
    setNotification("fail", "Carrito de compras vaciado");
  };

  const deleteItem = (id) => {
    const cartWithoutItem = cart.filter((item) => item.id !== id);

    // console.log(cart.filter((item) => item.id === "1"));
    setNotification("fail", `Producto eliminado del carrito`);
    setCart(cartWithoutItem);
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;

    cart.forEach((prod) => (totalQuantity += prod.quantity));
    return totalQuantity;
  };

  const getTotal = () => {
    let totalPrice = 0;

    cart.forEach((prod) => (totalPrice += prod.quantity * prod.price));
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeList,
        deleteItem,
        getTotalQuantity,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => {
  return useContext(CartContext);
};
