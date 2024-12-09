import "./App.css";
import React, { useEffect, useState } from "react";
import Products from "./components/Products";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");

    try {
      if (response.ok) {
        const getProducts = await response.json();
        setProductsList(getProducts.products);

        if (getProducts.length < 15) {
          setHasMore(false);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 5);
  };

  return (
    <div className="App-container">
      <div className="p-3 ps-4 fw-bold products-heading fs-3">
        The Best Products
      </div>
      {loading ? (
        <div className="vh-100 d-flex justify-content-center">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div>
          <ul className="p-1">
            <InfiniteScroll
              className="products-container p-3"
              dataLength={productsList.length} 
              next={fetchMoreData} 
              hasMore={hasMore} 
              loader={
                <div className="d-flex justify-content-center vw-100">
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              } 
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more items to display.</b>
                </p>
              }
            >
              {productsList.map((eachProduct,index) => (
                <Products key={index} productsDetails={eachProduct} />
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;