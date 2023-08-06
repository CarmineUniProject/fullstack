import React, { Component } from 'react';
import Navbar from '../components/navbar';
import CartCard from '../components/cartCard';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      userEmail: '',
      error: '',
    };
  }

  componentDidMount() {
    this.fetchShoppingCartData();
  }

  async fetchShoppingCartData() {
    try {
      const response = await fetch('http://localhost:8000/api/shoppingcart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Not authorized.');
      }

      const data = await response.json();
      this.setState({ cartData: data });
    } catch (error) {
      console.error('Error fetching shopping cart data:', error);
      this.setState({ error: 'Not authorized, please login first' });
    }
  }

  handleRemoveFromCart = async (itemName) => {
    try {
      const response = await fetch('http://localhost:8000/api/removeFromCart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productName: itemName }),
      });

      if (!response.ok) {
        throw new Error('Error removing from the cart');
      }

      this.fetchShoppingCartData();
    } catch (error) {
      console.error(error);
    }
  };

  handleCheckoutClick = () => {
    const { cartData } = this.state;

    if (cartData.length === 0) {
      alert('Empty cart. Cannot proceed to checkout.');
    } else {
      this.removeAllItemsFromCart();
    }
  };

  removeAllItemsFromCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/checkout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error removing all items from the cart');
      }

      this.fetchShoppingCartData();
      alert('Checkout completed! Cart is now empty.');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { cartData, error } = this.state;

    return (
      <>
        <Navbar />
        <div className="container mt-4">
          {error && <p className="alert alert-danger">{error}</p>}
          {cartData.length === 0 ? (
            <p className="alert alert-info text-center">Empty cart</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {cartData.map((item) => (
                <CartCard
                  key={item.idCarrello}
                  name={item.nomeProdotto}
                  price={item.prezzoProdotto}
                  image={item.immagine}
                  onRemove={() => this.handleRemoveFromCart(item.nomeProdotto)}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={this.handleCheckoutClick}>
              Checkout
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ShoppingCart;
