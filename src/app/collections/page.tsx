import { getCollectionsList } from "@/api/collections";

export default async function CollectionsPage() {
  const collections = await getCollectionsList();

  return (
    <section className="mx-auto max-w-2xl px-8 py-12 sm:px-6 sm:py-16 md:max-w-4xl lg:max-w-7xl">
      {collections.map((collection) => (
        <div className="text-slate-600" key={collection.id}>
          <h2>{collection.name}</h2>
          <p>{collection.description}</p>
          <div>
            <img width={520} src={collection.image.url}/>
            </div>
        </div>
      ))}
    </section>
  );
}
