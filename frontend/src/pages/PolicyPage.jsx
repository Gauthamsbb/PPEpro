import { useParams, Navigate } from "react-router-dom";
import { POLICIES } from "@/data/policies";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const PolicyPage = () => {
  const { slug } = useParams();
  const policy = POLICIES[slug];
  if (!policy) return <Navigate to="/" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-16" data-testid={`policy-page-${slug}`}>
      <Breadcrumbs items={[{ label: policy.title }]} />
      <h1 className="font-head text-3xl sm:text-4xl font-bold tracking-tight text-ink mb-8">{policy.title}</h1>
      <div className="space-y-6">
        {policy.content.map((section, idx) => (
          <div key={idx}>
            <h2 className="font-head font-semibold text-lg text-ink mb-2">{section.h}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{section.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
