"use client";
import { useEffect, useState } from "react";
import "./CollectionsComp.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { GetAllCollections } from "../../src/Redux/Actions/CollectionActions";
import LoadingPage from "../Utilities/LoadingPage/LoadingPage";
import Link from "next/link";
import NoProduct from './../Utilities/NoProduct/NoProduct';
import { GetAllCollections } from "@/app/Redux/Actions/CollectionActions";
const CollectionsComp = () => {
  let dispatch = useDispatch();
  const [collectionLoading,setCollectionLoading]=useState(true)
  useEffect(() => {
    const getData=async()=>{
      setCollectionLoading(true)
      await dispatch(GetAllCollections());
      setCollectionLoading(false)
    }
    getData()
  }, []);
  let collectionRes = useSelector((state) => state.CollectionReducer);
  const [allCollectionData, setAllCollectionData] = useState(null);
  useEffect(() => {
    try {
      if (collectionRes.singleColletion) {
        setAllCollectionData(collectionRes.AllCollections);
      }
    } catch (e) {
      console.log(e);
    }
  }, [collectionRes]);  
  return (
    <>
      {collectionLoading==false ? (
        <section className="collections-container">
          <Container fluid>
            <Row style={{ justifyContent: " end" }}>
              {allCollectionData.length > 0
                ? allCollectionData.map((collection,index) => (
                    <Col  sm={6} md={4} lg={3} key={index}>
                      <Link
                        href={`/collection/${collection?.CollectionID}`}
                        style={{ textDecoration: "none", color: "unset" }}
                      >
                        <div className="collection-card">
                          <div className="image-container">
                            <img
                            loading="lazy"
                              src={`https://www.fradaksa.net/back/Laravel/public/Attachment//Collections/${collection?.CollectionID}/${collection?.CollectionsPhoto[0]?.image}`}
                              alt={collection?.CollectionName}
                            />
                            <span>وفر حتي {collection?.Discount} رس</span>
                          </div>
                          <div className="collection-products-image">
                            {collection?.products.map((product,index)=>
                             <div className="product-sub" key={index}>
                             <img loading="lazy" src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${product?.ProductID}/${product?.Colors&&product?.Colors[0]?.ColorID!=null?product?.Colors[0]?.ColorID:""}/${product?.MainPhoto?.Image}`}/>
                           </div>
                            )}
                          </div>
                          <div className="collection-card-footer">
                            <div className="collection-name">
                             {collection?.CollectionName}
                            </div>
                            <div className="collection-price">
                              <div className="price-after">
                                <span>{Number(collection?.Price)+Number(collection?.Discount)}</span>
                                <span>رس</span>
                              </div>
                              <div className="price-before">
                                <span>{collection?.Price}</span>
                                <span>رس</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))
                : <NoProduct text="لاتوجد عروض حالياً"/>}
            </Row>
          </Container>
        </section>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default CollectionsComp;
