import React, { Component } from 'react';

class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
    };
  }

  handleRemoveClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/removeFromCart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ productName: this.props.name }),
      });

      if (!response.ok) {
        throw new Error('Error removing from the cart');
      }

      this.setState({ showMessage: true });

      setTimeout(() => {
        this.setState({ showMessage: false });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { showMessage } = this.state;

    return (
      <>
        <div className="col">
          <div className="card" style={{ width: '18rem', textAlign: 'center' }}>
            <img src={this.props.image} className="card-img-top" alt={this.props.name} />
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">€{this.props.price}</p>
              <button className="btn btn-outline-danger" onClick={this.handleRemoveClick}>
                Remove
              </button>
            </div>
          </div>
          {showMessage && <div className="text-center mt-2 text-danger">Item removed</div>}
        </div>
      </>
    );
  }
}

export default CartCard;
