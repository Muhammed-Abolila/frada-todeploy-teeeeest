"use client"
import { useEffect } from "react";
let TabbyPromo = ({ price }) => {
  useEffect(() => {
    new window.TabbyPromo({
      selector: "#tabbyPromo",
      price: price,
      currency: "SAR",
      installmentsCount: 4,
      lang: "ar",
      publicKey: "pk_68a1fb28-e65b-40ce-82ff-3838c0e6a43a",
      merchantCode: "frada",
    });
  }, [price]);
  return <div id="tabbyPromo" className="tabby-promo"></div>;
};
export default TabbyPromo;
