const CartCollectionItem = ({
  cartCollctionItems,
  onDeleteItemPopup,
  setShowTabbyCard,
}) => {
  return (
    <>
      {cartCollctionItems.map((collection, index) => {
        return (
          <div className="cart-details collection-details" key={index}>
            <span
              className="icon-trash"
              onClick={() => {
                onDeleteItemPopup(collection, event), setShowTabbyCard(false);
              }}
            ></span>
            <div className="price-qty-container">
              <div className="price-qty-content">
                <div className="price-container">
                  <div>رس</div>
                  <div className="price">{collection?.price}</div>
                </div>
              </div>
            </div>
            <div className="caption-img-container">
              <div className="caption">
                <h5 className="title">{collection?.CollectionName}</h5>
                <div className="collection-subimg">
                    {collection?.CollectionProducts.map((item,index)=>
                    <div className="collection-subimg-container" key={index}>
                    <img src={`https://www.fradaksa.net/back/Laravel/public/Attachment/${item?.productID}/${item?.colorID!=null?item?.colorID:""}/${item?.MainPhoto?.Image}`} alt="" />
                    </div>
                    )}
                    
                </div>
              </div>
              <div className="img-container">
                <img
                  loading="lazy"
                  src={` https://www.fradaksa.net/back/Laravel/public/Attachment/Collections/${collection.CollectionID}/${collection?.MainPhoto?.image}`}
                  alt={collection?.CollectionName}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CartCollectionItem;
