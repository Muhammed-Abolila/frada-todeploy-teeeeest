
import SingleProduct from "../../../../../../../../components/SingleProduct/SingleProduct";
export default async function Product({params}) {
  let param=await params
  return <SingleProduct productID={param?.ProductID}/>;
}
