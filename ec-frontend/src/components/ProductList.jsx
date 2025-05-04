import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const baseUrl = import.meta.env.VITE_API_URL;

    // 初回マウント時にAPIからデータ取得
    useEffect(() => {
        fetch(`${baseUrl}/products`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error('API呼び出しエラー', err));
    }, []);

  return (
    <div className="product-list">
        <h2>商品一覧</h2>
        {products.map((item) => (
            <div className="product-card" key={item.id}>
                <Link to={`/product/${item.id}`}>
                    {item.image_url &&(
                        <img src={item.image_url} alt={item.name} className="product-image" />
                    )}
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                </Link>
            </div>
        ))}
        <Link to="/cart" className="go-to-cart">🛒 カートを見る</Link>
    </div>
  );
}
export default ProductList