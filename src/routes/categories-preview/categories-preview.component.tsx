import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category-selector";
import { CategoryPreviewContainer } from "./categories-preview.styles";

const CategoriesPreview = () => {
    const categoriesArray = useSelector(selectCategoriesMap);
return(
    <CategoryPreviewContainer>
        {
            Object.keys(categoriesArray).map((title) => {
                const products = categoriesArray[title];
                return (<CategoryPreview key={title} title={title} products={products} />)
            })    
       }
    </CategoryPreviewContainer>
   
)
}

export default CategoriesPreview;