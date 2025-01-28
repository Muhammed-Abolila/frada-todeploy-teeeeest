"use client";
import "./CollectionComp.css";
import TabbyPromo from "../Tabby/TabbyPromo/TabbyPromo";
import { useEffect, useState } from "react";
import ImageHolder from "./CollectionAtoms/ImageHolder/ImageHolder";
import { CollectionProducts } from "./CollectionAtoms/CollectionProducts/CollectionProducts";
import { useDispatch, useSelector } from "react-redux";
// import { GetSingleCollection } from "./../../src/Redux/Actions/CollectionActions";
import LoadingPage from "../Utilities/LoadingPage/LoadingPage";
import { useParams } from "next/navigation";
import { GetSingleCollection } from "@/app/Redux/Actions/CollectionActions";
const CollectionComp = () => {
  let params=useParams()
  let dispatch = useDispatch();
  const [tabbyPrice, setTabbyPrice] = useState(Number);
  // Get Single Collection Data
  useEffect(() => {
    const GetCollectionData = async () => {
      await dispatch(GetSingleCollection(params?.collectionID));
    };
    GetCollectionData();
  }, [params?.collectionID]);
  let collectionResponse = useSelector((state) => state.CollectionReducer);
  const [singleCollectionData, setSingleCollectionData] = useState(null);
  useEffect(() => {
    try {
      if (collectionResponse.singleColletion) {
        setSingleCollectionData(collectionResponse.singleColletion);
        setTabbyPrice(collectionResponse.singleColletion?.Price)
      }
    } catch (e) {
      console.log(e);
    }
  }, [collectionResponse]);
  // Start Tabby Logic
  const [scriptLoading, setScriptLoading] = useState(true);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.tabby.ai/tabby-promo.js";
    document.body.appendChild(script);
    script.onload = () => {
      setScriptLoading(false);
    };
  }, []);
  return (
    <>
      {singleCollectionData ? (
        <section className="collection-comp">
          <div className="collection-details">
            <div className="collection-content">
              <h5>{singleCollectionData?.CollectionName}</h5>
              <div className="price-container">
                <h6>:السعر</h6>
                <div>
                  <span>{singleCollectionData?.Price}</span>
                  <span>ر.س</span>
                </div>
              </div>
              {!scriptLoading ? <TabbyPromo price={tabbyPrice} /> : null}
              <h6 className="discription" dangerouslySetInnerHTML={{ __html: singleCollectionData.Discription }}></h6>
              <div className="customize-alert">
                <p>قم بتخصيص منتجاتك داخل العرص</p>
                <span className="icon-cheveron-down"></span>
              </div>
            </div>
            <ImageHolder collectionId={params?.collectionID} collectionImages={singleCollectionData?.CollectionsPhoto} />
          </div>
          {singleCollectionData.products&&
          <CollectionProducts 
          collectionId={params?.collectionID}
          collectionProducts={singleCollectionData.products}
          />
          }
        </section>
      ) : <LoadingPage/>}
    </>
  );
};
export default CollectionComp;
