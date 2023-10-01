export default async function SingleProductPage({}) {
  const response = await fetch(process.env.HYGRAPH_ENDPOINT || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query Collections {
        products {
          id
          name
          price
          images(first: 1) {
            id
            url
          }
        }
      }`,
    }),
  });

  const json = response.json();
  return <pre className="text-slate-800">{JSON.stringify(json, null, 4)}</pre>;
}
