"use client";
import CategoryProducts from "../../../../../../components/Category/CategoryProducts";
export default function Subcategory({params}) {
  return <CategoryProducts categoryID={params.CategoryID} subCategoryID={params.SubcategoryID}/>;
}
