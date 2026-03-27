import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from '../../styles/CartPage.module.css'

const CartPage = () => {
  const cart = useCart()
  const navigate = useNavigate()
  const [removingId, setRemovingId] = useState<number | null>(null)
  const handleRemove = (productId: number) => {
    setRemovingId(productId)
    setTimeout(() => {
      cart.removeItem(productId)
      setRemovingId(null)
    }, 300)
  }
  if (cart.items.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyCartInner}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartText}>
            Looks like you haven't added anything yet.<br />Start exploring our products!
          </p>
          <button onClick={() => navigate('/')} className={styles.emptyCartBtn}>
            Browse Products →
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <h1 className={styles.headerTitle}>🛒 Your Cart</h1>
        <p className={styles.headerSubtitle}>
          {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} · Free shipping on all orders
        </p>
      </div>

      <main className={styles.main}>
        <div className={styles.layout}>
          <div className={styles.itemsList}>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className={`${styles.itemCard} ${removingId === item.id ? styles.itemCardRemoving : ''}`}
              >
                <div
                  onClick={() => navigate(`/product/${item.id}/details`)}
                  className={styles.itemImage}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImg}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.categoryPill}>{item.category}</span>

                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      ₹{Math.round(item.price * 84).toLocaleString('en-IN')}
                    </span>

                    <div className={styles.qtyControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => cart.decreaseQuantity(item.id)}
                      >−</button>
                      <span className={styles.qtyCount}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => cart.increaseQuantity(item.id)}
                      >+</button>
                    </div>

                    {item.quantity > 1 && (
                      <span className={styles.subtotal}>
                        = ₹{Math.round(item.price * item.quantity * 84).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                  title="Remove item"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <p className={styles.summarySubtitle}>
                {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} in your cart
              </p>
            </div>

            <div className={styles.summaryBody}>
              <div className={styles.lineItems}>
                <div className={styles.lineItem}>
                  <span>Subtotal</span>
                  <span className={styles.lineItemValue}>₹{Math.round(cart.totalPrice * 84).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.lineItem}>
                  <span>Shipping</span>
                  <span className={styles.freeBadge}>FREE</span>
                </div>
                <div className={styles.lineItem}>
                  <span>Tax (5%)</span>
                  <span className={styles.lineItemValue}>₹{Math.round(cart.totalPrice * 84 * 0.05).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalPrice}>
                  ₹{Math.round(cart.totalPrice * 84 * 1.05).toLocaleString('en-IN')}
                </span>
              </div>

              <div className={styles.shippingBadge}>
                <span className={styles.shippingIcon}>🚚</span>
                <span className={styles.shippingText}>You qualify for FREE shipping!</span>
              </div>

              <button className={styles.checkoutBtn}>
                Proceed to Checkout →
              </button>

              <button onClick={() => navigate('/')} className={styles.continueBtn}>
                ← Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CartPage
