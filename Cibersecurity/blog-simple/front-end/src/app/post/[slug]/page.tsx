import Header from "@/components/Header";
import { api } from "@/utils/api";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data }: { data: Post } = await api.get(`/post/${slug}`);

  return (
    <>
      <Header />

      <main className="flex flex-col gap-4 items-center py-4 w-full px-6">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-zinc-400 w-full break-words">{data.content}</p>
      </main>
    </>
  );
}
