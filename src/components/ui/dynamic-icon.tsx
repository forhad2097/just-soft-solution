import {
  Globe, Code2, ShoppingCart, MessageSquare, Users, ShieldCheck,
  Bug, Zap, BarChart3, Palette, TrendingUp, Lightbulb,
  Calculator, FileText, HeartPulse, Factory, Cog, UsersRound,
  Store, Briefcase, ShoppingBag, FileSignature, Banknote,
  Sparkles, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Globe, Code2, ShoppingCart, MessageSquare, Users, ShieldCheck,
  Bug, Zap, BarChart3, Palette, TrendingUp, Lightbulb,
  Calculator, FileText, HeartPulse, Factory, Cog, UsersRound,
  Store, Briefcase, ShoppingBag, FileSignature, Banknote,
};

export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
