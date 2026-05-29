import { getServices } from "@/lib/actions/services";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import { DeleteServiceButton } from "./delete-service-button";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-1">{services.length} total services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Service
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No services yet. Create your first service.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Service</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Order</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Images</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{service.title}</p>
                    <p className="text-gray-500 text-sm truncate max-w-xs">{service.description || "No description"}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{service.order}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{service.images.length} images</span>
                  </td>
                  <td className="px-6 py-4">
                    {service.published ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-sm">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-yellow-400 text-sm">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-2 text-gray-500 hover:text-[#0072BB] hover:bg-[#0072BB]/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteServiceButton id={service.id} title={service.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
