import logo from '../logo.svg';
function SingleProduct(props){
    return(
        <>
        {/* product box */}
        <div className="col-12 col-md-3 mb-2"  >
            <div className="card">
                <img src={logo} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    <h5 className="card-title text-muted">Price: $500</h5>
                </div>
                <div className='card-footer'>
                    <button title = "Add to Cart" className='btn btn-primary btn-sm'><i className="fa-solid fa-cart-plus"></i></button>
                    <button title = "Add to Wishlist" className='btn btn-danger btn-sm ms-2'><i className="fa fa-heart"></i></button>
                </div>

            </div>
        </div>
        {/* product box end */}
        </>

    );
}

export default SingleProduct;