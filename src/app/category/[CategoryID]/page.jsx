import CategoryProducts from "../../../../components/Category/CategoryProducts";
export default async function Category({params}) {
  let param=await params;
  console.log("param",param);
  
  return <CategoryProducts categoryID={params.CategoryID}/>;
}
