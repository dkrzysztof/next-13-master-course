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
    "query CategoriesList {\n  categories {\n    id\n    name\n    slug\n  }\n}": types.CategoriesListDocument,
    "query CollectionsGetList {\n  collections(first: 10) {\n    id\n    name\n    description\n    updatedAt\n    image {\n      url\n    }\n  }\n}": types.CollectionsGetListDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n      slug\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListFragment on Product {\n  id\n  name\n  description\n  price\n  slug\n  images(first: 1) {\n    url\n  }\n  categories {\n    id\n    name\n  }\n}": types.ProductListFragmentFragmentDoc,
    "query ProductSearchList($search: String!) {\n  products(where: {name_contains: $search}) {\n    ...ProductListFragment\n  }\n  productsConnection(where: {name_contains: $search}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductSearchListDocument,
    "query ProductVariantsList($id: ID!) {\n  product(where: {id: $id}) {\n    variants {\n      ... on ProductSizeColorVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductSizeVariant {\n        __typename\n        id\n        name\n      }\n      ... on ProductColorVariant {\n        __typename\n        id\n        name\n      }\n    }\n  }\n}": types.ProductVariantsListDocument,
    "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListFragment\n    }\n  }\n  productsConnection(where: {slug: $slug}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesList {\n  categories {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetList {\n  collections(first: 10) {\n    id\n    name\n    description\n    updatedAt\n    image {\n      url\n    }\n  }\n}"): typeof import('./graphql').CollectionsGetListDocument;
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
export function graphql(source: "query ProductsGetByCategorySlug($first: Int!, $skip: Int!, $slug: String!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListFragment\n    }\n  }\n  productsConnection(where: {slug: $slug}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListFragment\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
