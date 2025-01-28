import { ShowProductDetailsAsideProvider } from "@/context/showProductDetailsAside";
import HeroSection from "../../components/HomeComps/1-HeroSection/HeroSection";
import CategorySlider from "../../components/HomeComps/2-CategorySlider/CategorySlider";
import HomeProductsSlider from "../../components/HomeComps/3-HomeProductsSlider/HomeProductsSlider";
import HomeLayerPhone from "../../components/HomeComps/HomeLayerPhone/HomeLayerPhone";
import Services from "../../components/Services/Services";
import ProductDetailsMenu from "../../components/Utilities/ProductDetailsMenu/ProductDetailsMenu";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// function to get home page data
const getHomeData = async () => {
  try {
    const productsResponse = await fetch(`${API_URL}/home-page`, {
      cache: "no-store",
    });
    console.log("productsResponse===>", productsResponse);

    if (!productsResponse.ok) {
      throw new Error("تأكد من الإتصال بالإنترنت");
    }
    const { data: productsResponseData } = await productsResponse.json();
    return productsResponseData;
  } catch (error) {
    throw error;
  }
};
export default async function Home() {
  const homeData = await getHomeData();
  console.log("home" , homeData)
  return (
    <ShowProductDetailsAsideProvider>
      <HeroSection bannerData={homeData.banner} />
      <CategorySlider homeData={homeData.banner}  />
      <div className="lg:hidden">
        <Services offer={homeData.counter_offer} />
      </div>
      <HomeProductsSlider slidersData={homeData.sliders} />
      {/* Small Home Layer */}
      <HomeLayerPhone />
      <ProductDetailsMenu/>
    
    </ShowProductDetailsAsideProvider>
  );
}
