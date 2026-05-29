import { createService } from "@/lib/actions/services";
import { ServiceForm } from "@/components/admin/service-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">New Service</h1>
          <p className="text-gray-400 mt-1">Create a new service</p>
        </div>
      </div>

      <ServiceForm action={createService} />
    </div>
  );
}
