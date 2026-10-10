import { Suspense } from "react";
import { PostDetailView } from "@/components/PostDetailView";

export function generateStaticParams() {
  return [
    { id: "post-analysis-01" },
    { id: "post-analysis-02" },
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AnalysisDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500 font-mono text-xs">Memuat detail publikasi...</div>}>
      <PostDetailView id={id} folder="analysis" />
    </Suspense>
  );
}
