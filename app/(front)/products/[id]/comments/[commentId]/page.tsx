export default async function ProductComment({
  params,
}: {
  params: Promise<{ id: string; commentId: string }>;
}) {
  const { id, commentId } = await params;
  return (
    <h1>
      Comment {commentId} for product {id}
    </h1>
  );
}
