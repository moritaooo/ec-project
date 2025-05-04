import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams(); //URLのID部分を取得
    const [product, setProduct] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${baseUrl}/products/${id}/`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error('詳細の取得失敗：', err))
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setShowMessage(true); // メッセージ表示

        setTimeout(() => {
            setShowMessage(false); //メッセージを消す
            navigate('/cart'); // 遷移
        }, 1000); // 1000ミリ秒後に移動
    };

    if (!product) return <div>読み込み中...</div>

    return (
        <div className="product-detail">
            {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: "200px"}} className="product-detail-image" />}
            <h2>{product.name}</h2>
            <p className="product-price">価格：¥{product.price}</p>
            <p className="product-description">{product.description}</p>
            <button className="add-to-cart" onClick={handleAddToCart}>🛒カートに追加</button>

            {showMessage && <p style={{ color: "green"}}>✅カートに追加しました！</p>}
        </div>
    );
}

