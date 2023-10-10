import type { TypedDocumentString } from "@/gql/graphql";
import pThrottle from "p-throttle";

type GraphqlResponse<T> =
  | { data?: undefined; errors: { message: string }[] }
  | { data: T; errors?: undefined };

export async function executeQraphql<TResult, TVariables>({
  query,
  variables,
  cache,
  next,
  headers,
}: {
  query: TypedDocumentString<TResult, TVariables>;
  cache?: RequestCache;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
  ? { variables?: never }
  : { variables: TVariables })): Promise<TResult> {
  if (!process.env.GRAPHQL_URL) {
    throw TypeError("GRAPHQL_URL is not defined");
  }
  const res = await throttledFetch({
    query,
    variables,
    cache,
    next,
    headers,
  });
  // const res = await fetch(process.env.GRAPHQL_URL, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     query,
  //     variables,
  //   }),
  //   cache,
  //   next,
  //   headers: {
  //     ...headers,
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.TOKEN}`,
  //   },
  // });

  const graphqlResponse =
    (await res.json()) as GraphqlResponse<TResult>;

  if (graphqlResponse.errors) {
    console.log(JSON.stringify(graphqlResponse.errors));
    throw TypeError(`GraphQL Error`, {
      cause: graphqlResponse.errors,
    });
  }

  return graphqlResponse.data;
}

export const paginationToFirstSkip = (
  pageNumber: number,
  pageSize: number
) => ({
  first: pageSize,
  skip: pageSize * (pageNumber - 1),
});

const throttle = pThrottle({ limit: 5, interval: 1100 });
export const throttledFetch = throttle(
  async (args: any) => {
    const { query, variables, cache, next, headers } = args;

    const res = await fetch(
			process.env.GRAPHQL_URL as string,
      {
				method: "POST",
        body: JSON.stringify({
          query,
          variables,
        }),
        cache,
        next,
        headers: {
          ...headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    return res;
  }
);
