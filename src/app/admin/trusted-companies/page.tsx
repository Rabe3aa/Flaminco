import { getTrustedCompanies } from "@/lib/actions/trusted-companies";
import { TrustedCompaniesClient } from "@/components/admin/trusted-companies-client";

export default async function AdminTrustedCompaniesPage() {
  const companies = await getTrustedCompanies();

  return (
    <TrustedCompaniesClient
      initialCompanies={companies.map((c) => ({
        id: c.id,
        name: c.name,
        logo: c.logo,
        url: c.url || "",
        order: c.order,
        published: c.published,
      }))}
    />
  );
}
