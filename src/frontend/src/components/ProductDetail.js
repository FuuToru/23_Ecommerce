import logo from '../logo.svg';
import bg from '../bg-1.avif';
import { Link } from 'react-router-dom';
import SingleTagProduct from './SingleTagProduct';
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import {useState, useEffect, useContext} from 'react';

import { UserContext, CartContext } from '../Context';
=======
import {useState,useEffect, useContext} from 'react';
import { UserContext, CartContext, CurrencyContext } from '../Context';
>>>>>>> tri-dev

function ProductDetail(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData,setproductData] = useState([]);
    const [productImgs, setproductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedProducts, setrelatedProducts]=useState([]);
    const {product_slug,product_id} = useParams();
<<<<<<< HEAD
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const {cartData, setCartData} = useContext(CartContext);
=======
    const [cartButtonClickStatus,setcartButtonClickStatus] = useState(false);
    const {cartData, setCartData}= useContext(CartContext);
    const {CurrencyData, setCurrencyData} = useContext(CurrencyContext);
    console.log(CurrencyData)
>>>>>>> tri-dev

    useEffect ( () =>{
        fetchData(baseUrl+'/product/'+product_id+'/');
        fetchRelatedData(baseUrl+'/related-products/'+product_id);
        checkProductIncart(product_id);
    },[]);

    function checkProductIncart(product_id){
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        if(cartJson!=null){
            cartJson.map((cart) =>{
                if(cart!=null && cart.product.id == product_id){
                    setcartButtonClickStatus(true);
                }
            });
        }
    }
    
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
        setproductData(data);
        setproductImgs(data.product_imgs);
        setproductTags(data.tag_list);
        
        });
    
    }
    function changeUrl(baseurl){
        fetchData(baseurl);
    }

    function fetchRelatedData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setrelatedProducts(data.results);
        
        });
    
    }
    function changerelatedUrl(baseurl){
        fetchRelatedData(baseurl);
    }

    const tagsLinks = []
    for(let i=0; i<productTags.length; i++){
        let tag=productTags[i].trim();
        tagsLinks.push(<Link className='badge bg-secondary text-white me-1' to={`/products/${tag}`}>{tag}</Link>)
    }

    const cartAddButtonHandler = () =>{
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        
        var cartData={
                'product':{
                    'id': productData.id,
                    'price':productData.price,
                    'usd_price':productData.usd_price,
                    'title': productData.title,
                    'image':productData.image
                
                },
                'user':{
                    'id':1
                }

        }
        if(cartJson!=null){
            cartJson.push(cartData);
            var cartString = JSON.stringify(cartJson);
            localStorage.setItem('cartData',cartString);
            setCartData(cartJson);

        }
        else{
            var newCartList=[];
            newCartList.push(cartData);
            var cartString = JSON.stringify(newCartList);
            localStorage.setItem('cartData',cartString);

        }

        setcartButtonClickStatus(true);

    }

    const cartRemoveButtonHandler= () =>{
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id == productData.id){
                // delete cartJson[index];
                cartJson.splice(index,1);
            }
        });
        var cartString = JSON.stringify(cartJson);
        localStorage.setItem('cartData', cartString);
        setcartButtonClickStatus(false);
        setCartData(cartJson);

    }
    return(
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="true">
                <div className="carousel-indicators">
                    {productImgs.map((img,index)=>{
                        if(index == 0){
                            return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label='Slide 1'>
                            </button>
                        }else{
                            return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label='Slide 1'>
                            </button>
                        }
                    })}
                </div>
                <div className="carousel-inner">
                    {
                        productImgs.map((img,index)=>{
                            if(index==0){
                                return <div className='carousel-item active'>
                                    <img src={img.image} className='img-thumbnail mb-5' alt={index}></img></div>
                            }else{
                                return <div className='carousel-item'>
                                    <img src={img.image} className='img-thumbnail mb-5' alt={index}></img></div>
                            }
                        })
                    }

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>

                </div>
                <div className="col-8">
                    <h3>{productData.title}</h3>
                    <p>{productData.detail}</p>
                    {
                        CurrencyData!='usd' &&                    <h5 className="card-title">Price:  {productData.price} VND</h5>
                    }
                    {
                        CurrencyData =='usd' &&                    
                        <h5 className="card-title">Price: ${productData.usd_price}</h5>
                    }

                    <p className='mt-3'>
                        {!cartButtonClickStatus  && 
                        <button title = "Add to Cart" type ="button" onClick={cartAddButtonHandler}className='btn btn-primary btn-sm'><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
                        }
                        {cartButtonClickStatus && 
                        <button title = "Add to Cart" type ="button" onClick={cartRemoveButtonHandler}className='btn btn-warning btn-sm'><i className="fa-solid fa-cart-plus"></i> Remove from Cart</button>
                        }
                        <button title = "Buy Now" className='btn btn-warning btn-sm ms-1'><i className="fa-solid fa-bag-shopping"></i> Buy Now</button>
                        <button title = "Add to Wishlist" className='btn btn-danger btn-sm ms-1'><i className="fa fa-heart"></i> Wishlist</button>
                    </p>
                    <div className='producttags mt-4'>
                        <h5>Tags</h5>
                        <p >
                            {tagsLinks}

                        </p>
                    </div>

                </div>
            </div>
            {/* Related product */}
            <h5 className='mt-5 mb-3 text-center'>Related Products</h5>
            <div id="relatedProductsSlider" className="carousel
            carousel-dark slide " data-bs-ride="true">
                <div className="carousel-indicators">
                {relatedProducts.map((product,index)=>{
                        if(index == 0){
                            return <button type="button" data-bs-target="#relatedProductsSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label='Slide 1'>

                            </button>
                        }else{
                            return <button type="button" data-bs-target="#relatedProductsSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label='Slide 1'>

                            </button>
                        }
                    })}
                </div>
                <div className="carousel-inner">
    {/* Sử dụng dấu ngoặc nhọn thay vì dấu ngoặc vuông */}
    {relatedProducts && relatedProducts.map((product, index) => {
        if (index === 0) {
            // Thêm class 'active' vào div của carousel-item đầu tiên
            return (
                <div className='carousel-item active' key={index} onClick={() => {
                    changeUrl(baseUrl + `/product/${product.id}/`);
                    changerelatedUrl(baseUrl + `/related-products/${product.id}`);
                }}>
                    <SingleTagProduct product={product} />
                </div>
            );
        } else {
            // Không cần thêm 'active' cho các carousel-item còn lại
            return (
                <div className='carousel-item' key={index} onClick={() => {
                    changeUrl(baseUrl + `/product/${product.id}/`);
                    changerelatedUrl(baseUrl + `/related-products/${product.id}`);
                }}>
                    <SingleTagProduct product={product} />
                </div>
            );
        }
    })}
</div>

                {/* <button className="carousel-control-prev" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#relatedProductsSlider" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
                </div>

            {/* end related product */}



        </section>

    );
}

export default ProductDetail;