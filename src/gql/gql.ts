/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListFragment on Product {\n  id\n  name\n  description\n  price\n  slug\n  images(first: 1) {\n    url\n  }\n  categories {\n    id\n    name\n  }\n}": types.ProductListFragmentFragmentDoc,
    "query ProductSearchList($search: String!) {\n  products(where: {name_contains: $search}) {\n    ...ProductListFragment\n  }\n  productsConnection(where: {name_contains: $search}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductSearchListDocument,
    "query ProductVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductSizeVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductColorVariant {\n        __typename\n        id\n        name\n      }\n    }\n  }\n}": types.ProductVariantsListDocument,
    "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListFragment\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "mutation AddProductToCart($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}": types.AddProductToCartDocument,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CreateCart {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}": types.CreateCartDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        ...ProductListFragment\n      }\n    }\n  }\n}": types.CartGetByIdDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "query GetCategoriesList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.GetCategoriesListDocument,
    "query GetCategoryBySlug($slug: String!) {\n  categories(where: {slug_contains: $slug}, first: 1) {\n    id\n    name\n    slug\n  }\n}": types.GetCategoryBySlugDocument,
    "query CollectionBySlug($slug: String!) {\n  collections(first: 1, where: {slug: $slug}) {\n    id\n    name\n    description\n    updatedAt\n    image {\n      url\n    }\n    products {\n      ...ProductListFragment\n    }\n  }\n}": types.CollectionBySlugDocument,
    "query CollectionsGetList {\n  collections(first: 10) {\n    id\n    name\n    description\n    slug\n    image {\n      url\n    }\n  }\n}": types.CollectionsGetListDocument,
    "mutation AddReviewToProduct($productId: ID!, $headline: String!, $name: String!, $content: String!, $email: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, content: $content, email: $email, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}": types.AddReviewToProductDocument,
    "query GetReviewsByProductId($productId: ID!) {\n  reviews(where: {product: {id: $productId}}) {\n    id\n    name\n    rating\n    content\n    email\n    headline\n  }\n}": types.GetReviewsByProductIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListFragment on Product {\n  id\n  name\n  description\n  price\n  slug\n  images(first: 1) {\n    url\n  }\n  categories {\n    id\n    name\n  }\n}"): typeof import('./graphql').ProductListFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductSearchList($search: String!) {\n  products(where: {name_contains: $search}) {\n    ...ProductListFragment\n  }\n  productsConnection(where: {name_contains: $search}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductSearchListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductSizeVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductColorVariant {\n        __typename\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductVariantsListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListFragment\n    }\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddProductToCart($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {quantity: 1, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').AddProductToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCart {\n  createOrder(data: {total: 0}) {\n    id\n  }\n}"): typeof import('./graphql').CreateCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    id\n    orderItems {\n      id\n      quantity\n      total\n      product {\n        ...ProductListFragment\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoriesList {\n  categories {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').GetCategoriesListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoryBySlug($slug: String!) {\n  categories(where: {slug_contains: $slug}, first: 1) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').GetCategoryBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionBySlug($slug: String!) {\n  collections(first: 1, where: {slug: $slug}) {\n    id\n    name\n    description\n    updatedAt\n    image {\n      url\n    }\n    products {\n      ...ProductListFragment\n    }\n  }\n}"): typeof import('./graphql').CollectionBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections(first: 10) {\n    id\n    name\n    description\n    slug\n    image {\n      url\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddReviewToProduct($productId: ID!, $headline: String!, $name: String!, $content: String!, $email: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, content: $content, email: $email, rating: $rating, product: {connect: {id: $productId}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').AddReviewToProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetReviewsByProductId($productId: ID!) {\n  reviews(where: {product: {id: $productId}}) {\n    id\n    name\n    rating\n    content\n    email\n    headline\n  }\n}"): typeof import('./graphql').GetReviewsByProductIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
