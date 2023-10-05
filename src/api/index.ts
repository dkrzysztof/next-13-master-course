import type { TypedDocumentString } from "@/gql/graphql";

export const executeQraphql = async <TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables
): Promise<TResult> => {
  if (!process.env.GRAPHQL_URL) {
    throw TypeError("GRAPHQL_URL is not defined");
  }

  const res = await fetch(process.env.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  type GraphqlResponse<T> =
    | { data?: undefined; errors: { message: string }[] }
    | { data: T; errors?: undefined };

  const graphqlResponse =
    (await res.json()) as GraphqlResponse<TResult>;

  if (graphqlResponse.errors) {
    throw TypeError(`Grapgql Error`, {
      cause: graphqlResponse.errors[0]?.message,
    });
  }

  return graphqlResponse.data;
};

export const paginationToFirstSkip = (
  pageNumber: number,
  pageSize: number
) => ({
  first: pageSize,
  skip: pageSize * (pageNumber - 1),
});
