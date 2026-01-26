import Card from "@/components/ui/Card";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  showFeatures?: boolean;
  className?: string;
}

export default function ServiceCard({ service, showFeatures = false, className = "" }: ServiceCardProps) {
  return (
    <Card hover className={`h-full ${className}`}>
      <div className="flex items-start gap-4">
        <div className="text-3xl">{service.icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2 tracking-tight text-[color:var(--foreground)]">{service.title}</h3>
          <p className="text-[color:var(--muted)] text-sm leading-relaxed">{service.description}</p>
        </div>
      </div>
      {showFeatures && (
        <div className="border-t border-white/10 pt-4 mt-5">
          <h3 className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent)] mb-3">
            O que entregamos
          </h3>
          <ul className="space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[color:var(--muted)]">
                <span className="text-[color:var(--accent)] mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
