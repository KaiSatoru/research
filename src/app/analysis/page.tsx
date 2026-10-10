import { FolderView } from "@/components/FolderView";

export default function AnalysisPage() {
  return (
    <FolderView
      folder="analysis"
      title="Folder: Analysis"
      subtitle="Arsip analisis teknikal intraday dan swing. Menampilkan tangkapan layar grafik beresolusi tinggi, mitigasi Fair Value Gaps (FVG), dan sapuan likuiditas pada latar belakang polos agar chart terbaca maksimal."
    />
  );
}
