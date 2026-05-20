import { apiSlice } from "../api/apiSlice";
import { selectProducts, selectPopularProducts, selectClothingProducts, selectProductsByVariant, selectNewArrivalsByVariant, selectDiscountFeaturedSelling, selectDealOfTheDayProducts, selectTrendingTabsProducts, PRODUCT_COLLECTION_VARIANTS } from "@/lib/productSelector";
import { getSiteNumber } from "@/lib/siteConfig";
import categoryData from "@/constatns/categoryData";

// Get all products using productSelector
const getAllProductsData = () => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      // Server-side: use default site number
      return selectProducts(1);
    }
    const siteNumber = getSiteNumber();
    return selectProducts(siteNumber);
  } catch (error) {
    // Fallback if selectProducts fails
    console.error('Error in selectProducts, trying fallback:', error);
    try {
      return selectProducts(1);
    } catch (fallbackError) {
      console.error('Error in selectProducts fallback:', fallbackError);
      // Last resort: return empty array instead of throwing
      console.warn('All product selection methods failed, returning empty array');
      return [];
    }
  }
};

// Transform product to match expected API format
const transformProduct = (product) => {
  // Find category by categoryId
  const category = categoryData.find(cat => cat.id === product.categoryId);
  
  // Calculate discount percentage
  // Ensure discountedPrice is the selling price (lower) and price is the original (higher)
  const originalPrice = product.price;
  const sellingPrice = product.discountedPrice && product.discountedPrice < product.price 
    ? product.discountedPrice 
    : product.price;
  
  const discountPercentage = originalPrice && sellingPrice && sellingPrice < originalPrice
    ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
    : 0;

  // Convert reviews number to array format (create mock reviews if needed)
  const reviewsArray = Array.isArray(product.reviews) 
    ? product.reviews 
    : Array.from({ length: product.reviews || 0 }, (_, i) => ({
        _id: `review-${product.id}-${i}`,
        rating: product.rating || 0,
        comment: "",
        user: { name: "Customer" },
        createdAt: new Date().toISOString(),
      }));

  return {
    _id: product.id.toString(),
    id: product.id.toString(),
    title: product.title,
    img: product.img,
    imageURLs: product.imageURLs || [product.img],
    price: originalPrice, // Original/higher price (shown with strikethrough if discounted)
    discountedPrice: sellingPrice, // Selling/lower price (what customer pays)
    discount: discountPercentage,
    rating: product.rating || 0,
    reviews: reviewsArray,
    description: product.description || "",
    category: category ? {
      _id: category.id.toString(),
      name: category.title,
      slug: category.slug,
    } : null,
    categoryId: product.categoryId,
    // Add parent field for shop page filtering (using category name)
    parent: category ? category.title : "",
    // Add children field (empty for now, can be populated if subcategories exist)
    children: product.children || "",
    // Add brand field (empty for now, can be populated if brands exist)
    brand: product.brand || { name: "" },
    // Add createdAt field for sorting
    createdAt: product.createdAt || new Date().toISOString(),
    tags: product.tags || [],
    status: product.status || (product.inStock ? "in stock" : "out of stock"),
    inStock: product.inStock !== undefined ? product.inStock : true,
    isNewArrival: product.isNewArrival || false,
    isBestSelling: product.isBestSelling || false,
    isTrending: product.isTrending || false,
    sku: product.sku || `SKU-${product.id}`,
    offerDate: product.offerDate || null,
  };
};

// Get all products
const getProducts = () => {
  try {
    const products = getAllProductsData();
    if (!products || !Array.isArray(products)) {
      console.error('getAllProductsData returned invalid data:', products);
      return [];
    }
    if (products.length === 0) {
      console.warn('getAllProductsData returned empty array');
      return [];
    }
    const transformed = products.map(transformProduct);
    console.log(`Transformed ${transformed.length} products`);
    return transformed;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
};

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      // Fix #2: Make queryFn bulletproof - return empty array instead of error
      queryFn: () => {
        try {
          console.log('getAllProducts queryFn called');
          const products = getProducts();
          console.log('getProducts returned:', products?.length || 0, 'products');
          
          // Ensure we always return a valid array, even if empty
          const safe = Array.isArray(products) ? products : [];
          
          if (safe.length === 0) {
            console.warn('getProducts returned empty array - check productSelector and data files');
          }
          
          return {
            data: {
              data: safe,
              success: safe.length > 0,
              message: safe.length === 0 ? 'No products available' : undefined,
            },
          };
        } catch (e) {
          console.error('getAllProducts failed:', e);
          // Return empty data instead of error to avoid hard fail on navigation
          return {
            data: {
              data: [],
              success: false,
              message: e?.message ?? 'Failed to load products',
            },
          };
        }
      },
      providesTags: ['Products'],
    }),
    getProductType: builder.query({
      queryFn: ({ type, query }) => {
        try {
          // Get site number for seeded selection
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (error) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) {
                siteNumber = parsed;
              }
            }
          }
          
          // Special handling for clothing/jewelry type - use centralized selector
          if (type === 'jewelry' || type === 'clothing') {
            // Get transformed products
            const transformedProducts = getProducts();
            
            // Determine category from query or default to 'all'
            let category = 'all';
            if (query) {
              const params = new URLSearchParams(query);
              const categoryParam = params.get('category');
              if (categoryParam) {
                // Map category names to our category keys
                const categoryMap = {
                  'all collection': 'all',
                  'all': 'all',
                  'man wear': 'men',
                  'men': 'men',
                  "men's wear": 'men',
                  'women wear': 'women',
                  'women': 'women',
                  "women's wear": 'women',
                  'kids wear': 'kids',
                  'kids': 'kids',
                  "kids's wear": 'kids',
                };
                category = categoryMap[categoryParam.toLowerCase()] || 'all';
              }
            }
            
            // Use centralized clothing products selector
            const result = selectClothingProducts(siteNumber, transformedProducts, category, 8);
            
            return {
              data: {
                data: result.products,
                totalCount: result.totalCount,
                success: true,
              },
            };
          }
          
          // For other types, use existing logic
          let products = getProducts();
          
          // Apply query filters if provided
          if (query) {
            const params = new URLSearchParams(query);
            const category = params.get('category');
            const subCategory = params.get('subCategory');
            const search = params.get('search');
            const minPrice = params.get('minPrice');
            const maxPrice = params.get('maxPrice');
            
            if (category) {
              const categorySlug = category.toLowerCase().replace(/-/g, ' ');
              products = products.filter(p => 
                p.category?.name?.toLowerCase().includes(categorySlug) ||
                p.category?.slug === category
              );
            }
            
            if (subCategory) {
              // Filter by subcategory if needed
            }
            
            if (search) {
              products = products.filter(p => 
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
              );
            }
            
            if (minPrice) {
              products = products.filter(p => p.price >= parseFloat(minPrice));
            }
            
            if (maxPrice) {
              products = products.filter(p => p.price <= parseFloat(maxPrice));
            }
          }
          
          return {
            data: {
              data: products,
              success: true,
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
      providesTags: ['ProductType'],
    }),
    getProductsByVariant: builder.query({
      queryFn: ({ variantId, category, query }) => {
        try {
          // Get site number for seeded selection
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (error) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) {
                siteNumber = parsed;
              }
            }
          }
          
          // Get transformed products
          const transformedProducts = getProducts();
          
          // Determine category from query or use provided category
          let selectedCategory = category || 'All Collection';
          if (query) {
            const params = new URLSearchParams(query);
            const categoryParam = params.get('category');
            if (categoryParam) {
              // Map query param to tab name
              const variant = PRODUCT_COLLECTION_VARIANTS[variantId];
              if (variant) {
                // Find matching tab name
                const matchingTab = variant.tabs.find(tab => {
                  const config = variant.categoryMap[tab];
                  return config && config.slug === categoryParam;
                });
                if (matchingTab) {
                  selectedCategory = matchingTab;
                }
              }
            }
          }
          
          // Use variant-based product selector
          const result = selectProductsByVariant(siteNumber, variantId, transformedProducts, selectedCategory, 8);
          
          return {
            data: {
              data: result.products,
              totalCount: result.totalCount,
              variantConfig: PRODUCT_COLLECTION_VARIANTS[variantId],
              success: true,
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
      providesTags: ['ProductVariant'],
    }),
    getNewArrivalsByVariant: builder.query({
      queryFn: () => {
        try {
          // Get site number for seeded selection
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (error) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) {
                siteNumber = parsed;
              }
            }
          }
          
          // Calculate variant ID from SITE_NUMBER (modulo 10)
          const mod = siteNumber % 10;
          const variantId = mod === 0 ? 10 : mod;
          
          // Get transformed products
          const transformedProducts = getProducts();
          
          // Use variant-based new arrivals selector
          const result = selectNewArrivalsByVariant(siteNumber, variantId, transformedProducts, 8);
          
          return {
            data: {
              data: result.products,
              totalCount: result.totalCount,
              variantConfig: PRODUCT_COLLECTION_VARIANTS[variantId],
              success: true,
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
      providesTags: ['NewArrivals'],
      keepUnusedDataFor: 0, // Don't cache - always recalculate based on current SITE_NUMBER
    }),
    getOfferProducts: builder.query({
      queryFn: (type) => {
        try {
          let products = getProducts();
          
          // Filter products with maximum discount
          products = products
            .filter(p => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 50); // Return top 50 products with highest discount
          
          return {
            data: {
              data: products,
              success: true,
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
      providesTags: ['OfferProducts'],
    }),
    getDealOfTheDay: builder.query({
      queryFn: () => {
        try {
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (e) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) siteNumber = parsed;
            }
          }
          const dateString = new Date().toISOString().slice(0, 10);
          const products = getProducts();
          const data = selectDealOfTheDayProducts(siteNumber, products, dateString, 10);
          return {
            data: {
              data,
              success: true,
            },
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error?.message ?? "Failed to load deal of the day",
            },
          };
        }
      },
      providesTags: ['DealOfTheDay'],
      keepUnusedDataFor: 0,
    }),
    getDiscountFeaturedSelling: builder.query({
      queryFn: () => {
        try {
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (e) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) siteNumber = parsed;
            }
          }
          const products = getProducts();
          const { discountProducts, featuredProducts, sellingProducts } = selectDiscountFeaturedSelling(siteNumber, products, 3);
          return {
            data: {
              discountProducts,
              featuredProducts,
              sellingProducts,
              success: true,
            },
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error?.message ?? "Failed to load discount/featured/selling products",
            },
          };
        }
      },
      providesTags: ['DiscountFeaturedSelling'],
      keepUnusedDataFor: 0,
    }),
    getTrendingTabsProducts: builder.query({
      queryFn: () => {
        try {
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (e) {
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) siteNumber = parsed;
            }
          }
          const products = getProducts();
          const { newProducts, featuredProducts, topSellersProducts } = selectTrendingTabsProducts(siteNumber, products, 8);
          return {
            data: {
              newProducts,
              featuredProducts,
              topSellersProducts,
              success: true,
            },
          };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error?.message ?? "Failed to load trending tab products",
            },
          };
        }
      },
      providesTags: ['TrendingTabsProducts'],
      keepUnusedDataFor: 0,
    }),
    getPopularProductByType: builder.query({
      queryFn: (type) => {
        try {
          // Get site number for seeded selection
          // Try to get it directly from env if getSiteNumber fails
          let siteNumber = 1;
          try {
            siteNumber = getSiteNumber();
          } catch (error) {
            // Fallback: try to read directly from env
            const envSiteNumber = process.env.NEXT_PUBLIC_SITE_NUMBER || process.env.SITE_NUMBER;
            if (envSiteNumber) {
              const parsed = parseInt(envSiteNumber, 10);
              if (!isNaN(parsed) && parsed >= 1 && parsed <= 40) {
                siteNumber = parsed;
              }
            }
            console.warn('getSiteNumber failed, using fallback:', siteNumber, error);
          }
          
          console.log('getPopularProductByType - Using site number:', siteNumber);
          console.log('getPopularProductByType - Env vars:', {
            NEXT_PUBLIC_SITE_NUMBER: process.env.NEXT_PUBLIC_SITE_NUMBER,
            SITE_NUMBER: process.env.SITE_NUMBER
          });
          
          // Get transformed products (with reviews as arrays)
          const transformedProducts = getProducts();
          
          // Use productSelector to get popular products based on SITE_NUMBER
          // Pass transformed products so reviews are already in array format
          const popularProducts = selectPopularProducts(siteNumber, transformedProducts, 8);
          
          console.log(`getPopularProductByType - Selected ${popularProducts.length} popular products for site ${siteNumber}`);
          if (popularProducts.length > 0) {
            console.log('getPopularProductByType - Product IDs:', popularProducts.map(p => p.id || p._id).slice(0, 3));
          }
          
          return {
            data: {
              data: popularProducts,
              success: true,
            },
          };
        } catch (error) {
          console.error('Error in getPopularProductByType:', error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message,
            },
          };
        }
      },
      providesTags: ['PopularProducts'],
      // Don't cache - always recalculate based on current SITE_NUMBER
      keepUnusedDataFor: 0,
    }),
    getTopRatedProducts: builder.query({
      queryFn: () => {
        try {
          let products = getProducts();
          
          // Filter products with high rating and more reviews
          products = products
            .filter(p => (p.rating || 0) >= 4.0 && (p.reviews?.length || 0) > 0)
            .sort((a, b) => {
              // Sort by rating first, then by number of reviews
              const ratingDiff = (b.rating || 0) - (a.rating || 0);
              if (ratingDiff !== 0) return ratingDiff;
              return (b.reviews?.length || 0) - (a.reviews?.length || 0);
            })
            .slice(0, 50); // Return top 50 rated products
          
          return {
            data: {
              data: products,
              success: true,
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
      providesTags: ['TopRatedProducts'],
    }),
    // get single product
    getProduct: builder.query({
      queryFn: (id) => {
        try {
          const products = getProducts();
          const product = products.find(p => p._id === id.toString() || p.id === id.toString());
          
          if (!product) {
            return {
              error: {
                status: "NOT_FOUND",
                error: "Product not found",
              },
            };
          }
          
          return {
            data: product,
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
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      queryFn: (id) => {
        try {
          const products = getProducts();
          const currentProduct = products.find(p => p._id === id.toString() || p.id === id.toString());
          
          if (!currentProduct) {
            return {
              data: {
                data: [],
                success: true,
              },
            };
          }
          
          // Get products from the same category, excluding the current product
          const relatedProducts = products
            .filter(p => 
              (p.categoryId === currentProduct.categoryId || 
               p.category?._id === currentProduct.category?._id) &&
              p._id !== currentProduct._id
            )
            .slice(0, 8); // Return up to 8 related products
          
          return {
            data: {
              data: relatedProducts,
              success: true,
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
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetProductsByVariantQuery,
  useGetNewArrivalsByVariantQuery,
  useGetOfferProductsQuery,
  useGetDealOfTheDayQuery,
  useGetTrendingTabsProductsQuery,
  useGetDiscountFeaturedSellingQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
