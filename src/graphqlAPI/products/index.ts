import {
  gql,
  QueryHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';
import { QueryProductsArgs } from '../types-graphql';
import {
  Query,
  Mutation,
  MutationCreateProductArgs,
} from '../types-graphql';

export type TDataProducts = Pick<Query, 'products' | '__typename'>;
export const PRODUCTS_QUERY = gql`
  query ($pagination: Pagination, $category: String) {
    products(pagination: $pagination, category: $category) {
      data {
        id
        name
        image
        description
        price
        amount
      }
      cursor {
        after
        count
      }
    }
  }
`;

type UseProductsProps = QueryHookOptions<
  TDataProducts,
  QueryProductsArgs
>;

export const useProducts = (props?: UseProductsProps) => {
  return useQuery<TDataProducts, QueryProductsArgs>(
    PRODUCTS_QUERY,
    props,
  );
};

export const CREATE_PRODUCT_MUTATION = gql`
  mutation ($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
    }
  }
`;

export const useCreateProduct = () => {
  return useMutation<
    Pick<Mutation, 'createProduct'>,
    MutationCreateProductArgs
  >(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });
};
