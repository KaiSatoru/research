import { FolderView } from "@/components/FolderView";

export default function BacktestingPage() {
  return (
    <FolderView
      folder="backtesting"
      title="Backtesting"
      subtitle="Evaluasi kuantitatif model ICT (Silver Bullet, SMT Divergence, External vs Internal Range Liquidity) dengan ratusan sampel sesi historis dan kurva probabilitas."
    />
  );
}
