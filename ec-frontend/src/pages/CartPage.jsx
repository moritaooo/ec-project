import { useCart } from "../contexts/CartContext";
import "./CartPage.css"

export default function CartPage() {
    const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>🛒カートの中身</h2>
            {cartItems.length === 0 ? (
                <p>カートは空です。</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.image_url} alt={item.name} className="cart-image" />
                            <div>
                                <h3>{item.name}</h3>
                                <p>価格：{ item.price }</p>
                                <p>数量：{item.quantity}</p>
                                <p>小計：{item.price * item.quantity}</p>
                                <button onClick={() => increaseQuantity(item.id)}>+</button>
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <h3>合計: ¥{ total }</h3>
        </div>
    )
}