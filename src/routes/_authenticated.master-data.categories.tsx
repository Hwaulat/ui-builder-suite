import { createFileRoute } from "@tanstack/react-router";
import { Hammer } from "lucide-react";

export const Route = createFileRoute("/_authenticated/master-data/categories")({
  component: ComingSoonPage,
});

function ComingSoonPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#f8fafc] h-full text-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center max-w-md w-full">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <Hammer className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Under Construction</h2>
        <p className="text-sm text-gray-500">
          The Master Data - Categories module is currently being built and will be available soon.
        </p>
      </div>
    </div>
  );
}
