import { useEffect } from "react";
const TabbyCheckout = ({price}) => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://checkout.tabby.ai/tabby-card.js";
    script1.async = true;
    const loadTabbyCard = () => {
      if (window.TabbyCard) {
        new TabbyCard({
          selector: "#tabbyCard",
          currency:"SAR",
          lang:"ar",
          price,
          size:"narrow",
          theme:"black",
          header:false,
        });
      }
    };
    script1.onload = loadTabbyCard;
    document.body.appendChild(script1)
    return () => {
      document.body.removeChild(script1)
    };
  }, [price]);
  return (
    <div id="tabbyCard" className="tabby-card"></div>
  );
};

export default TabbyCheckout;
