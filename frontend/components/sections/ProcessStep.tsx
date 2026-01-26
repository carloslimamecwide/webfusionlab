import Card from "@/components/ui/Card";

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export default function ProcessStep({ step, title, description, icon, className = "" }: ProcessStepProps) {
  return (
    <Card className={`text-center h-full ${className}`}>
      <div className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)] mb-3">{step}</div>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 tracking-tight text-[color:var(--foreground)]">{title}</h3>
      <p className="text-sm text-[color:var(--muted)] leading-relaxed">{description}</p>
    </Card>
  );
}
