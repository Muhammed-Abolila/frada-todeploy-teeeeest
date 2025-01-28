import { useEffect } from "react";
import { useState } from "react";

const TabbyPromoHook = () => {
  // Start Tabby Logic
  const [tabbyPrice, setTabbyPrice] = useState(Number);
  const [scriptLoading, setScriptLoading] = useState(true);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.tabby.ai/tabby-promo.js";
    document.body.appendChild(script);
    script.onload = () => {
      setScriptLoading(false);
    };
  }, []);
  return[scriptLoading,tabbyPrice,setTabbyPrice]
}

export default TabbyPromoHook