import { useState, useEffect } from "react";
import "./itemListContainer.css";
import { getProducts, getProductsByCategory } from "./../../asyncMock";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting, stock }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { categoryId } = useParams();

  useEffect(() => {
    const asyncFunction = categoryId ? getProductsByCategory : getProducts;

    asyncFunction(categoryId)
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (error) {
    return <h1>Hay un error, master</h1>;
  }

  const type = products.map((product) => product.type);

  return (
    <div className="itemListView">
      <h1 className="viewsTitle">
        {greeting}
        {categoryId ? (
          <strong style={{ marginTop: "10x" }}> {type[0]}</strong>
        ) : (
          ""
        )}
      </h1>

      {/* <h1>{stock}</h1> */}
      <ItemList items={products} />
      {/* </div> */}
    </div>
  );
};

export default ItemListContainer;
