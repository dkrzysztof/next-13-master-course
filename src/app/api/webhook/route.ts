import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { validateHygraphRequest } from "./service";

export async function POST(
  request: NextRequest
): Promise<Response> {
  try {
    const signature = request.headers.get("gcms-signature");
    const body = await request.json();
    const isRequestAuthorized =
      await validateHygraphRequest(signature, body);
    if (!isRequestAuthorized) {
      return new Response("Not an authorized access", {
        status: 401,
      });
    }

    if (
      typeof body === "object" &&
      body &&
      "data" in body &&
      typeof body.data === "object" && 
			body.data.id 
    ) {
      console.debug(
        `Revalidating /product/${body.data?.id}`
      );
      revalidatePath(`/product/${body.data?.id}`);
      console.debug(`Revalidating /products`);
      revalidatePath(`/products`);
      return new Response(null, { status: 204 });
    } else {
      return new Response(null, { status: 400 });
    }
  } catch (error) {
    return new Response(null, {
      status: 401,
    });
  }
}
