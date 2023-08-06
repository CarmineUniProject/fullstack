import React, { Component } from 'react';

class Card extends Component {
  state = {
    isAddedToCart: false,
    errorMessage: '',
  };

  addToCart = () => {
    const { name, price } = this.props;

    fetch('http://localhost:8000/api/addToCart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nomeProdotto: name, prezzoProdotto: price }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json().then((data) => {
              this.setState({ errorMessage: data.message, isAddedToCart: false });
              setTimeout(() => this.setState({ errorMessage: '' }), 3000)
            });
          } else {
            throw new Error('Failed to add the item to the cart');
          }
        }
        //console.log('Item added to cart successfully.');
        this.setState({ isAddedToCart: true, errorMessage: '' });
        setTimeout(() => this.setState({ isAddedToCart: false }), 3000);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
        this.setState({ errorMessage: 'Error adding item to cart' });
        setTimeout(() => this.setState({ errorMessage: '' }), 3000);
      });
  };

  render() {
    const { isAddedToCart, errorMessage } = this.state;

    //console.log('Percorso immagine:', this.props.image);
    return (
      <>
        <div className="col">
          <div className="card" style={{ width: '18rem', textAlign: 'center' }}>
            <img src={'http://localhost:8000/api' + this.props.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">€{this.props.price}</p>
              <button className="btn btn-outline-success" onClick={this.addToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>

        {isAddedToCart && (
          <div style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>
            Item added to the cart
          </div>
        )}

        {errorMessage && (
          <div style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </>
    );
  }
}

export default Card;
