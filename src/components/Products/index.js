import React from "react";

const Products = (props) => {
    const { productsDetails } = props
    const { id, brand, title, price, images } = productsDetails

    return (
        <li className="product-item shadow p-2 pb-4">
            <div>
                <img src={images[0]} alt={id} />
            </div>
            <div className="text-center ">
                <div>{brand}</div>
                <div className="text-primary ">{title}</div>
                <div className="text-danger  fs-5">{price}</div>
                <button className="add-btn mt-2">Add to cart</button>
            </div>
        </li>
    )
}
export default Products;


