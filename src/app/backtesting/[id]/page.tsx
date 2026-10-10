import { Suspense } from "react";
import { PostDetailView } from "@/components/PostDetailView";

export function generateStaticParams() {
  return [
    { id: "post-backtesting-01" },
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BacktestingDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500 font-mono text-xs">Memuat detail backtesting...</div>}>
      <PostDetailView id={id} folder="backtesting" />
    </Suspense>
  );
}
