import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category-selector';
import { CategoryItem } from '../../store/categories/catergory-types';
import { CategoryTitle, CategoryContainer } from './category.styles';

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    if (category) {
      setProducts(categories[category]);
    }
  }, [category, categories]);

  return (
    <Fragment>
      <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;