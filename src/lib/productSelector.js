import seedrandom from 'seedrandom';
import productsData from '@/constatns/products.json';
import categoryData from '@/constatns/categoryData';

const TOTAL_PRODUCTS = 500;

// Number of products to assign each flag
const NEW_ARRIVAL_COUNT = 50;
const BEST_SELLING_COUNT = 50;
const TRENDING_COUNT = 50;

function seededShuffle(array, seed) {
  const rng = seedrandom(seed);
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

function selectFromCategory(
  categoryProducts,
  count,
  seed
) {
  if (categoryProducts.length <= count) {
    return [...categoryProducts];
  }
  
  const shuffled = seededShuffle(categoryProducts, seed);
  return shuffled.slice(0, count);
}

// export function selectProducts(siteNumber) {
//   const products = productsData;
//   const categories = categoryData;
  
//   // If no products or categories, return empty array
//   if (!products || !Array.isArray(products) || products.length === 0) {
//     console.warn('productsData is empty or invalid');
//     return [];
//   }
  
//   if (!categories || !Array.isArray(categories) || categories.length === 0) {
//     console.warn('categoryData is empty or invalid');
//     return [];
//   }
  
//   const quotaPerCategory = Math.floor(TOTAL_PRODUCTS / categories.length);
//   const selectedProducts = [];
//   const usedProductIds = new Set();
  
//   const categorySeed = `site-${siteNumber}-category`;
//   const globalSeed = `site-${siteNumber}-global`;
//   const finalSeed = `site-${siteNumber}-final`;
  
//   const productsByCategory = new Map();
  
//   categories.forEach(category => {
//     productsByCategory.set(
//       category.id,
//       products.filter(p => p.categoryId === category.id)
//     );
//   });
  
//   categories.forEach(category => {
//     const categoryProducts = productsByCategory.get(category.id) || [];
//     const availableProducts = categoryProducts.filter(p => !usedProductIds.has(p.id));
    
//     const needed = quotaPerCategory;
//     const selected = selectFromCategory(
//       availableProducts,
//       needed,
//       `${categorySeed}-${category.id}`
//     );
    
//     selected.forEach(product => {
//       selectedProducts.push(product);
//       usedProductIds.add(product.id);
//     });
//   });
  
//   const remainingNeeded = TOTAL_PRODUCTS - selectedProducts.length;
  
//   if (remainingNeeded > 0) {
//     const availableProducts = products.filter(p => !usedProductIds.has(p.id));
//     const shuffled = seededShuffle(availableProducts, globalSeed);
//     const additional = shuffled.slice(0, remainingNeeded);
    
//     selectedProducts.push(...additional);
//   }
  
//   // If we still don't have enough products, just return what we have (up to TOTAL_PRODUCTS)
//   const finalProducts = selectedProducts.length > 0 
//     ? seededShuffle(selectedProducts, finalSeed)
//     : products.slice(0, Math.min(TOTAL_PRODUCTS, products.length));
  
//   // Randomly assign flags based on site number
//   const flagsSeed = `site-${siteNumber}-flags`;
//   const flagsRng = seedrandom(flagsSeed);
  
//   // Reset all flags first
//   finalProducts.forEach(product => {
//     product.isNewArrival = false;
//     product.isBestSelling = false;
//     product.isTrending = false;
//   });
  
//   // Create a shuffled copy of indices for flag assignment
//   const indices = finalProducts.map((_, index) => index);
//   for (let i = indices.length - 1; i > 0; i--) {
//     const j = Math.floor(flagsRng() * (i + 1));
//     [indices[i], indices[j]] = [indices[j], indices[i]];
//   }
  
//   // Assign new arrival flag
//   for (let i = 0; i < Math.min(NEW_ARRIVAL_COUNT, indices.length); i++) {
//     finalProducts[indices[i]].isNewArrival = true;
//   }
  
//   // Assign best selling flag (skip already assigned new arrivals)
//   let bestSellingAssigned = 0;
//   for (let i = 0; i < indices.length && bestSellingAssigned < BEST_SELLING_COUNT; i++) {
//     if (!finalProducts[indices[i]].isNewArrival) {
//       finalProducts[indices[i]].isBestSelling = true;
//       bestSellingAssigned++;
//     }
//   }
  
//   // Assign trending flag (skip already assigned new arrivals and best selling)
//   let trendingAssigned = 0;
//   for (let i = 0; i < indices.length && trendingAssigned < TRENDING_COUNT; i++) {
//     if (!finalProducts[indices[i]].isNewArrival && !finalProducts[indices[i]].isBestSelling) {
//       finalProducts[indices[i]].isTrending = true;
//       trendingAssigned++;
//     }
//   }
  
//   return finalProducts;
// }


export function selectProducts(siteNumber) {
  // ✅ clone source once so we can safely write flags
  const products = productsData.map((p) => ({
    ...p,
    // ensure flags always exist
    isNewArrival: false,
    isBestSelling: false,
    isTrending: false,
  }));

  const categories = categoryData;

  if (!products.length) {
    console.warn("productsData is empty or invalid");
    return [];
  }
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    console.warn("categoryData is empty or invalid");
    return [];
  }

  const quotaPerCategory = Math.floor(TOTAL_PRODUCTS / categories.length);
  const selectedProducts = [];
  const usedProductIds = new Set();

  const categorySeed = `site-${siteNumber}-category`;
  const globalSeed = `site-${siteNumber}-global`;
  const finalSeed = `site-${siteNumber}-final`;

  const productsByCategory = new Map();
  categories.forEach((category) => {
    productsByCategory.set(
      category.id,
      products.filter((p) => p.categoryId === category.id)
    );
  });

  categories.forEach((category) => {
    const categoryProducts = productsByCategory.get(category.id) || [];
    const availableProducts = categoryProducts.filter(
      (p) => !usedProductIds.has(p.id)
    );

    const selected = selectFromCategory(
      availableProducts,
      quotaPerCategory,
      `${categorySeed}-${category.id}`
    );

    selected.forEach((product) => {
      selectedProducts.push(product);
      usedProductIds.add(product.id);
    });
  });

  const remainingNeeded = TOTAL_PRODUCTS - selectedProducts.length;
  if (remainingNeeded > 0) {
    const availableProducts = products.filter((p) => !usedProductIds.has(p.id));
    const shuffled = seededShuffle(availableProducts, globalSeed);
    selectedProducts.push(...shuffled.slice(0, remainingNeeded));
  }

  const finalProducts =
    selectedProducts.length > 0
      ? seededShuffle(selectedProducts, finalSeed)
      : products.slice(0, Math.min(TOTAL_PRODUCTS, products.length));

  // ✅ assign flags on cloned objects (safe)
  const flagsSeed = `site-${siteNumber}-flags`;
  const flagsRng = seedrandom(flagsSeed);

  const indices = finalProducts.map((_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(flagsRng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  for (let i = 0; i < Math.min(NEW_ARRIVAL_COUNT, indices.length); i++) {
    finalProducts[indices[i]].isNewArrival = true;
  }

  let bestSellingAssigned = 0;
  for (let i = 0; i < indices.length && bestSellingAssigned < BEST_SELLING_COUNT; i++) {
    const p = finalProducts[indices[i]];
    if (!p.isNewArrival) {
      p.isBestSelling = true;
      bestSellingAssigned++;
    }
  }

  let trendingAssigned = 0;
  for (let i = 0; i < indices.length && trendingAssigned < TRENDING_COUNT; i++) {
    const p = finalProducts[indices[i]];
    if (!p.isNewArrival && !p.isBestSelling) {
      p.isTrending = true;
      trendingAssigned++;
    }
  }

  return finalProducts;
}

/**
 * Select popular products based on review count, using SITE_NUMBER for seeded selection
 * @param {number} siteNumber - The site number from SITE_NUMBER env variable
 * @param {Array} products - Array of products (optional, if not provided uses all products from selectProducts)
 * @param {number} count - Number of popular products to return (default: 8)
 * @returns {Array} Array of popular products
 */
export function selectPopularProducts(siteNumber, products = null, count = 8) {
  // If products not provided, get all products for the site
  const allProducts = products || selectProducts(siteNumber);
  
  if (!allProducts || allProducts.length === 0) {
    return [];
  }
  
  // Filter products with reviews and sort by review count
  const productsWithReviews = allProducts
    .filter(p => {
      // Check if product has reviews (can be number or array)
      const reviewCount = Array.isArray(p.reviews) ? p.reviews.length : (p.reviews || 0);
      return reviewCount > 0;
    })
    .sort((a, b) => {
      // Sort by number of reviews (descending)
      const aReviews = Array.isArray(a.reviews) ? a.reviews.length : (a.reviews || 0);
      const bReviews = Array.isArray(b.reviews) ? b.reviews.length : (b.reviews || 0);
      
      if (bReviews !== aReviews) {
        return bReviews - aReviews; // More reviews first
      }
      // If reviews count is same, sort by rating (descending)
      return (b.rating || 0) - (a.rating || 0);
    });
  
  // Get top products (top 50 with most reviews) for selection pool
  const topProducts = productsWithReviews.slice(0, 50);
  
  if (topProducts.length === 0) {
    return [];
  }
  
  // Use seeded shuffle to select products based on SITE_NUMBER
  // This ensures different sites show different popular products
  const seed = `site-${siteNumber}-popular-products`;
  console.log(`selectPopularProducts - Site: ${siteNumber}, Seed: ${seed}, Top products: ${topProducts.length}`);
  
  const shuffled = seededShuffle(topProducts, seed);
  const selectedProducts = shuffled.slice(0, Math.min(count, shuffled.length));
  
  console.log(`selectPopularProducts - Selected ${selectedProducts.length} products for site ${siteNumber}`);
  if (selectedProducts.length > 0) {
    console.log(`selectPopularProducts - First product ID: ${selectedProducts[0].id || selectedProducts[0]._id}`);
  }
  
  return selectedProducts;
}

/**
 * Select clothing products by category, using SITE_NUMBER for seeded selection
 * @param {number} siteNumber - The site number from SITE_NUMBER env variable
 * @param {Array} products - Array of products (optional, if not provided uses all products from selectProducts)
 * @param {string} category - Category filter: 'all', 'men', 'women', 'kids' (default: 'all')
 * @param {number} count - Number of products to return (default: 8)
 * @returns {Array} Array of clothing products
 */
export function selectClothingProducts(siteNumber, products = null, category = 'all', count = 8) {
  // Clothing category IDs from categoryData.ts
  const CLOTHING_CATEGORIES = {
    all: [7, 8, 9], // Men's Wear, Women's Wear, Kids's Wear
    men: [7],       // Men's Wear
    women: [8],     // Women's Wear
    kids: [9],      // Kids's Wear
  };
  
  // If products not provided, get all products for the site
  const allProducts = products || selectProducts(siteNumber);
  
  if (!allProducts || allProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Get category IDs to filter
  const categoryIds = CLOTHING_CATEGORIES[category.toLowerCase()] || CLOTHING_CATEGORIES.all;
  
  // Filter clothing products by category
  let clothingProducts = allProducts.filter(p => {
    // Check if product belongs to clothing categories
    const productCategoryId = p.categoryId || p.category?.id || p.category?._id;
    if (typeof productCategoryId === 'string') {
      return categoryIds.includes(parseInt(productCategoryId, 10));
    }
    return categoryIds.includes(productCategoryId);
  });
  
  const totalCount = clothingProducts.length;
  
  if (clothingProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Use seeded shuffle to select products based on SITE_NUMBER and category
  // This ensures different sites show different products for the same category
  const seed = `site-${siteNumber}-clothing-${category.toLowerCase()}`;
  const shuffled = seededShuffle(clothingProducts, seed);
  const selectedProducts = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return { products: selectedProducts, totalCount };
}

/**
 * Variant configurations for product collection sections
 * Each variant defines: title, subtitle, tabs, and category mappings
 */
export const PRODUCT_COLLECTION_VARIANTS = {
  1: {
    title: "Dress Collections",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Man Wear", "Women Wear", "Kids Wear"],
    categoryMap: {
      'All Collection': { ids: [7, 8, 9], slug: null },
      'Man Wear': { ids: [7], slug: 'men-s-wear' },
      'Women Wear': { ids: [8], slug: 'women-s-wear' },
      'Kids Wear': { ids: [9], slug: 'kids-s-wear' },
    },
  },
  2: {
    title: "Electronics Collection",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Mobile Accessories", "Smart Gadgets", "Computer Accessories"],
    categoryMap: {
      'All Collection': { ids: [1, 2, 3], slug: null },
      'Mobile Accessories': { ids: [1], slug: 'mobile-accessories' },
      'Smart Gadgets': { ids: [2], slug: 'smart-gadgets' },
      'Computer Accessories': { ids: [3], slug: 'computer-accessories' },
    },
  },
  3: {
    title: "Home & Office",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Home Electronics", "Books", "Stationery"],
    categoryMap: {
      'All Collection': { ids: [4, 5, 6], slug: null },
      'Home Electronics': { ids: [4], slug: 'home-electronics' },
      'Books': { ids: [5], slug: 'books' },
      'Stationery': { ids: [6], slug: 'stationery' },
    },
  },
  4: {
    title: "Fashion Accessories",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Fashion Accessories", "Man Wear", "Women Wear"],
    categoryMap: {
      'All Collection': { ids: [10, 7, 8], slug: null },
      'Fashion Accessories': { ids: [10], slug: 'fashion-accessories' },
      'Man Wear': { ids: [7], slug: 'men-s-wear' },
      'Women Wear': { ids: [8], slug: 'women-s-wear' },
    },
  },
  5: {
    title: "Tech Essentials",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Mobile Accessories", "Computer Accessories", "Smart Gadgets"],
    categoryMap: {
      'All Collection': { ids: [1, 3, 2], slug: null },
      'Mobile Accessories': { ids: [1], slug: 'mobile-accessories' },
      'Computer Accessories': { ids: [3], slug: 'computer-accessories' },
      'Smart Gadgets': { ids: [2], slug: 'smart-gadgets' },
    },
  },
  6: {
    title: "Lifestyle Collection",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Women Wear", "Kids Wear", "Fashion Accessories"],
    categoryMap: {
      'All Collection': { ids: [8, 9, 10], slug: null },
      'Women Wear': { ids: [8], slug: 'women-s-wear' },
      'Kids Wear': { ids: [9], slug: 'kids-s-wear' },
      'Fashion Accessories': { ids: [10], slug: 'fashion-accessories' },
    },
  },
  7: {
    title: "Office Supplies",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Books", "Stationery", "Computer Accessories"],
    categoryMap: {
      'All Collection': { ids: [5, 6, 3], slug: null },
      'Books': { ids: [5], slug: 'books' },
      'Stationery': { ids: [6], slug: 'stationery' },
      'Computer Accessories': { ids: [3], slug: 'computer-accessories' },
    },
  },
  8: {
    title: "Smart Home",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Home Electronics", "Smart Gadgets", "Mobile Accessories"],
    categoryMap: {
      'All Collection': { ids: [4, 2, 1], slug: null },
      'Home Electronics': { ids: [4], slug: 'home-electronics' },
      'Smart Gadgets': { ids: [2], slug: 'smart-gadgets' },
      'Mobile Accessories': { ids: [1], slug: 'mobile-accessories' },
    },
  },
  9: {
    title: "Men's Fashion",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Man Wear", "Fashion Accessories", "Mobile Accessories"],
    categoryMap: {
      'All Collection': { ids: [7, 10, 1], slug: null },
      'Man Wear': { ids: [7], slug: 'men-s-wear' },
      'Fashion Accessories': { ids: [10], slug: 'fashion-accessories' },
      'Mobile Accessories': { ids: [1], slug: 'mobile-accessories' },
    },
  },
  10: {
    title: "Complete Collection",
    subtitle: "Product Collection",
    tabs: ["All Collection", "Electronics", "Fashion", "Books & Stationery"],
    categoryMap: {
      'All Collection': { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], slug: null },
      'Electronics': { ids: [1, 2, 3, 4], slug: null },
      'Fashion': { ids: [7, 8, 9, 10], slug: null },
      'Books & Stationery': { ids: [5, 6], slug: null },
    },
  },
};

/**
 * Select products by variant configuration, using SITE_NUMBER for seeded selection
 * @param {number} siteNumber - The site number from SITE_NUMBER env variable
 * @param {number} variantId - Variant ID (1-10)
 * @param {Array} products - Array of products (optional, if not provided uses all products from selectProducts)
 * @param {string} category - Category tab name (e.g., 'All Collection', 'Man Wear')
 * @param {number} count - Number of products to return (default: 8)
 * @returns {Object} Object with products array and totalCount
 */
export function selectProductsByVariant(siteNumber, variantId, products = null, category = 'All Collection', count = 8) {
  const variant = PRODUCT_COLLECTION_VARIANTS[variantId];
  
  if (!variant) {
    console.warn(`Variant ${variantId} not found, using variant 1`);
    return selectProductsByVariant(siteNumber, 1, products, category, count);
  }
  
  // If products not provided, get all products for the site
  const allProducts = products || selectProducts(siteNumber);
  
  if (!allProducts || allProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Get category configuration
  const categoryConfig = variant.categoryMap[category];
  
  if (!categoryConfig) {
    console.warn(`Category "${category}" not found in variant ${variantId}, using "All Collection"`);
    const allConfig = variant.categoryMap['All Collection'];
    if (!allConfig) {
      return { products: [], totalCount: 0 };
    }
    return selectProductsByVariant(siteNumber, variantId, products, 'All Collection', count);
  }
  
  // Get category IDs to filter
  const categoryIds = categoryConfig.ids;
  
  // Filter products by category IDs
  let filteredProducts = allProducts.filter(p => {
    const productCategoryId = p.categoryId || p.category?.id || p.category?._id;
    const numId = typeof productCategoryId === 'string' 
      ? parseInt(productCategoryId, 10) 
      : productCategoryId;
    return categoryIds.includes(numId);
  });
  
  const totalCount = filteredProducts.length;
  
  if (filteredProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Use seeded shuffle to select products based on SITE_NUMBER, variant, and category
  const seed = `site-${siteNumber}-variant-${variantId}-${category.toLowerCase().replace(/\s+/g, '-')}`;
  const shuffled = seededShuffle(filteredProducts, seed);
  const selectedProducts = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return { products: selectedProducts, totalCount };
}

/** Count of products per section (Discount / Featured / Selling) on home-4 */
const DISCOUNT_FEATURED_SELLING_COUNT = 3;

/** Default number of products for Deal of the Day */
const DEAL_OF_THE_DAY_COUNT = 10;

/**
 * Select "Deal of the Day" products: each day a different set of discounted products,
 * and each site (siteNumber) gets a different set. Uses dateString (YYYY-MM-DD, ideally UTC)
 * so the selection is stable for the whole day.
 *
 * @param {number} siteNumber - Site number from SITE_NUMBER env
 * @param {Array} products - Transformed products (from getProducts())
 * @param {string} dateString - Date string YYYY-MM-DD (e.g. from new Date().toISOString().slice(0, 10))
 * @param {number} count - Number of products to return (default 10)
 * @returns {Array}
 */
export function selectDealOfTheDayProducts(siteNumber, products = null, dateString = '', count = DEAL_OF_THE_DAY_COUNT) {
  const all = products && Array.isArray(products) ? products : [];
  const withDiscount = all.filter((p) => (p.discount ?? 0) > 0);
  if (withDiscount.length === 0) return [];
  const daySeed = dateString || new Date().toISOString().slice(0, 10);
  const seed = `site-${siteNumber}-deal-${daySeed}`;
  const shuffled = seededShuffle(withDiscount, seed);
  return shuffled.slice(0, Math.max(0, count));
}

/**
 * Select products for Discount, Featured, and Selling sections (e.g. home-4 ProductSmArea).
 * Each site shows different products based on siteNumber (seeded selection).
 * Works on already-transformed products (with discount, isNewArrival, isBestSelling, isTrending).
 *
 * @param {number} siteNumber - Site number from SITE_NUMBER env
 * @param {Array} products - Transformed products (from getProducts())
 * @param {number} countPerSection - Number of products per section (default 3)
 * @returns {{ discountProducts: Array, featuredProducts: Array, sellingProducts: Array }}
 */
export function selectDiscountFeaturedSelling(siteNumber, products = null, countPerSection = DISCOUNT_FEATURED_SELLING_COUNT) {
  const all = products && Array.isArray(products) ? products : [];
  if (all.length === 0) {
    return { discountProducts: [], featuredProducts: [], sellingProducts: [] };
  }

  const count = Math.max(0, countPerSection);

  const withDiscount = all.filter((p) => (p.discount ?? 0) > 0);
  const featuredPool = all.filter((p) => p.isTrending || p.isNewArrival);
  const sellingPool = all.filter((p) => p.isBestSelling);

  const discountProducts = selectFromPool(withDiscount, all, count, `site-${siteNumber}-discount`);
  const featuredProducts = selectFromPool(featuredPool, all, count, `site-${siteNumber}-featured`);
  const sellingProducts = selectFromPool(sellingPool, all, count, `site-${siteNumber}-selling`);

  return { discountProducts, featuredProducts, sellingProducts };
}

function selectFromPool(pool, fallbackPool, count, seed) {
  if (count <= 0) return [];
  const shuffled = seededShuffle(pool.length ? pool : fallbackPool, seed);
  return shuffled.slice(0, count);
}

/** Number of products per Trending tab (New, Featured, TopSellers) on home-4 */
const TRENDING_TAB_COUNT = 8;

/**
 * Select 8 products for each Trending Products tab: New, Featured, TopSellers.
 * Each site (siteNumber) gets different products via seeded selection.
 *
 * @param {number} siteNumber - Site number from SITE_NUMBER env
 * @param {Array} products - Transformed products (from getProducts())
 * @param {number} count - Products per tab (default 8)
 * @returns {{ newProducts: Array, featuredProducts: Array, topSellersProducts: Array }}
 */
export function selectTrendingTabsProducts(siteNumber, products = null, count = TRENDING_TAB_COUNT) {
  const all = products && Array.isArray(products) ? products : [];
  if (all.length === 0) {
    return { newProducts: [], featuredProducts: [], topSellersProducts: [] };
  }
  const n = Math.max(0, count);
  const newProducts = selectFromPool(
    all.filter((p) => p.isNewArrival),
    all,
    n,
    `site-${siteNumber}-trending-new`
  );
  const featuredProducts = selectFromPool(
    all.filter((p) => p.isTrending),
    all,
    n,
    `site-${siteNumber}-trending-featured`
  );
  const topSellersProducts = selectFromPool(
    all.filter((p) => p.isBestSelling),
    all,
    n,
    `site-${siteNumber}-trending-topsellers`
  );
  return { newProducts, featuredProducts, topSellersProducts };
}

/**
 * Select new arrival products by variant configuration, using SITE_NUMBER for seeded selection
 * @param {number} siteNumber - The site number from SITE_NUMBER env variable
 * @param {number} variantId - Variant ID (1-10)
 * @param {Array} products - Array of products (optional, if not provided uses all products from selectProducts)
 * @param {number} count - Number of products to return (default: 8)
 * @returns {Object} Object with products array and totalCount
 */
export function selectNewArrivalsByVariant(siteNumber, variantId, products = null, count = 8) {
  const variant = PRODUCT_COLLECTION_VARIANTS[variantId];
  
  if (!variant) {
    console.warn(`Variant ${variantId} not found, using variant 1`);
    return selectNewArrivalsByVariant(siteNumber, 1, products, count);
  }
  
  // If products not provided, get all products for the site
  const allProducts = products || selectProducts(siteNumber);
  
  if (!allProducts || allProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Get all category IDs from the variant (combine all categories)
  const allCategoryIds = new Set();
  Object.values(variant.categoryMap).forEach(config => {
    config.ids.forEach(id => allCategoryIds.add(id));
  });
  
  // Filter new arrival products that belong to variant categories
  let newArrivalProducts = allProducts.filter(p => {
    // Must be a new arrival
    if (!p.isNewArrival) {
      return false;
    }
    
    // Must belong to one of the variant categories
    const productCategoryId = p.categoryId || p.category?.id || p.category?._id;
    const numId = typeof productCategoryId === 'string' 
      ? parseInt(productCategoryId, 10) 
      : productCategoryId;
    return allCategoryIds.has(numId);
  });
  
  const totalCount = newArrivalProducts.length;
  
  if (newArrivalProducts.length === 0) {
    return { products: [], totalCount: 0 };
  }
  
  // Use seeded shuffle to select products based on SITE_NUMBER and variant
  const seed = `site-${siteNumber}-new-arrivals-variant-${variantId}`;
  const shuffled = seededShuffle(newArrivalProducts, seed);
  const selectedProducts = shuffled.slice(0, Math.min(count, shuffled.length));
  
  return { products: selectedProducts, totalCount };
}