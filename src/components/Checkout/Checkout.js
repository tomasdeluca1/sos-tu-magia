import { useState } from "react";
import { useCart } from "../../context/cartContext/CartContext";
import { useNotification } from "../../context/NotificationContext/Notification";
import "./checkout.css";
import CheckoutForm from "./Form/CheckoutForm";
import { createOrder } from "../../services/firebase/firestore";

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const { cart, getTotal } = useCart();
  const { setNotification } = useNotification();

  const totalPrice = getTotal();

  const generateOrder = (clientData) => {
    setLoading(true);
    try {
      createOrder(clientData, cart, totalPrice, setNotification);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h2 style={{ position: "relative", minHeight: "100vh" }}>
        Su orden se está generando
      </h2>
    );

  if (cart.length === 0) {
    return (
      <div
        style={{ position: "relative", minHeight: "100vh" }}
        className="checkoutBox"
      >
        <div>
          <h2>Para el checkout es necesario tener</h2>
        </div>
        <div>
          <h2 className="productsOnCartRequired">
            al menos 1 producto en el carrito de compras.
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="checkoutView">
        <h3 className="checkoutTitle">Datos del comprador:</h3>
        <CheckoutForm generateOrder={generateOrder} />
      </div>
    );
  }
};

export default Checkout;
