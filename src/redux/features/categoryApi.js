import { apiSlice } from "../api/apiSlice";
import categoryData from "@/constatns/categoryData";
import { selectProducts } from "@/lib/productSelector";
import { getSiteNumber } from "@/lib/siteConfig";

// Get all products using productSelector
const getAllProductsData = () => {
  try {
    const siteNumber = getSiteNumber();
    return selectProducts(siteNumber);
  } catch (error) {
    // Fallback if SITE_NUMBER is not set
    return selectProducts(1);
  }
};

// Transform categoryData to match the expected API format with product counts
const transformCategoryData = () => {
  const products = getAllProductsData();
  
  return categoryData.map((item) => {
    // Filter products by categoryId and get the array
    const categoryProducts = products.filter((p) => p.categoryId === item.id);
    
    return {
      _id: item.id.toString(),
      parent: item.title,
      img: item.img,
      slug: item.slug,
      products: categoryProducts, // Array of products for this category
    };
  });
};

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getShowCategory: builder.query({
      queryFn: () => {
        try {
          const transformedData = transformCategoryData();
          return {
            data: {
              result: transformedData,
            },
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message,
            },
          };
        }
      },
    }),
    getProductTypeCategory: builder.query({
      queryFn: (type) => {
        try {
          // Filter categories based on type if needed, or return all
          // For now, returning all categories regardless of type
          const transformedData = transformCategoryData();
          return {
            data: {
              result: transformedData,
            },
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useGetProductTypeCategoryQuery,
  useGetShowCategoryQuery,
} = categoryApi;
