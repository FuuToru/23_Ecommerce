//Packages
import { Link } from 'react-router-dom';
//Assets
import logo from '../logo.svg';
import ProductDetail from './ProductDetail';
import {useState,useContext} from 'react';
import { CartContext } from '../Context';
function Checkout(props){
    const {cartData, setCartData}= useContext(CartContext);
    const [cartButtonClickStatus,setcartButtonClickStatus] = useState(false);
    const [productData,setproductData] = useState([]);
    if(cartData == null){
        var cartItems = 0;
    }else{
        var cartItems = cartData.length;
    }

    const cartRemoveButtonHandler= (product_id) =>{
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id == product_id){
                // delete cartJson[index];
                cartJson.splice(index,1);
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString);
        setcartButtonClickStatus(false);
        setCartData(cartJson);

    }
    var sum=0;
    cartData.map((item,index)=>{
        sum+=parseFloat(item.product.price);
    });
    return(
        <div className='container mt-4'>
            <h1 className='mb-4'>All Items ({cartItems})</h1>
            {cartData &&
            <div className='row'>
                <div className='col-12'>
                <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Action</th>

                        </tr>

                    </thead>
                    <tbody>
                        { cartData &&
                            cartData.map((item,index)=>{
                                return (
                                <tr>
                                <td>{index+1}</td>
                                <td>
                                    <Link>
                                    <img src={item.product.image} className='img-thumbnail' width ='80' alt='...'></img>
                                    <p>{item.product.title}</p></Link>
    
    
                                </td>
                                <td>
                                    {item.product.price}
                                </td>
                                <td>
                        
                                    <button title="Add to Cart" type="button" onClick={() => cartRemoveButtonHandler(item.product.id)} className='btn btn-warning btn-sm'>
                                    <i className="fa-solid fa-cart-plus"></i> Remove from Cart
                                    </button>


                                
                                </td>
                            </tr>
                                )

                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>

                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                {sum}
                            </th>

                        </tr>
                        <tr>
                                <td colSpan='3' align="center" >
                                    <Link to='/categories' className='btn btn-secondary'>  Continue Shopping</Link>
                                    <Link to='/confirm-order' className='btn btn-primary ms-1'>Proceed to Payment</Link>


                                </td>
                        </tr>

                    </tfoot>

                </table>
            </div>

                </div>

            </div>
            }
            {!cartData &&
                <Link to="/categories" className='btn btn-success'>Home</Link>

            }
        </div>


    );
}

export default Checkout;