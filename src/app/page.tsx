"use client";

import { useState } from "react";

type NavId =
  | "dashboard"
  | "appointments"
  | "customers"
  | "services"
  | "packages"
  | "memberships"
  | "pos"
  | "inventory"
  | "purchases"
  | "staff"
  | "attendance"
  | "commission"
  | "branches"
  | "franchise"
  | "reports"
  | "ai-assistant"
  | "settings";

type AppointmentStatus = "Confirmed" | "In Progress" | "Completed" | "Pending";
type FranchiseStatus = "Active" | "New" | "Under Review";
type KpiTone = "up" | "warning";

const NAV_ITEMS: { id: NavId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "appointments", label: "Appointments" },
  { id: "customers", label: "Customers" },
  { id: "services", label: "Services" },
  { id: "packages", label: "Packages" },
  { id: "memberships", label: "Memberships" },
  { id: "pos", label: "POS & Billing" },
  { id: "inventory", label: "Inventory" },
  { id: "purchases", label: "Purchases" },
  { id: "staff", label: "Staff" },
  { id: "attendance", label: "Attendance" },
  { id: "commission", label: "Commission" },
  { id: "branches", label: "Branches" },
  { id: "franchise", label: "Franchise" },
  { id: "reports", label: "Reports" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "settings", label: "Settings" },
];

const MODULE_CONTENT: Record<
  Exclude<NavId, "dashboard">,
  {
    tagline: string;
    highlights: string[];
    stats: { label: string; value: string }[];
  }
> = {
  appointments: {
    tagline:
      "Book, reschedule and track every client visit across all branches.",
    highlights: [
      "Calendar view by staff, chair and branch",
      "Automated reminders via SMS/WhatsApp",
      "Waitlist and walk-in handling",
    ],
    stats: [
      { label: "Today", value: "32 booked" },
      { label: "This week", value: "214 booked" },
      { label: "No-show rate", value: "3.2%" },
    ],
  },
  customers: {
    tagline:
      "Unified customer profiles with visit history, preferences and loyalty.",
    highlights: [
      "360° client profile & visit history",
      "Loyalty points and membership tracking",
      "Segmented marketing lists",
    ],
    stats: [
      { label: "Total customers", value: "1,284" },
      { label: "New this month", value: "96" },
      { label: "Loyalty members", value: "418" },
    ],
  },
  services: {
    tagline:
      "Service catalogue with pricing, duration and staff skill mapping.",
    highlights: [
      "Category-wise service menu",
      "Duration & pricing per branch",
      "Skill-based staff assignment",
    ],
    stats: [
      { label: "Active services", value: "58" },
      { label: "Categories", value: "9" },
      { label: "Avg price", value: "₹950" },
    ],
  },
  packages: {
    tagline: "Bundled service packages and prepaid deals for repeat clients.",
    highlights: [
      "Combo & bundle builder",
      "Prepaid balance tracking",
      "Expiry and usage rules",
    ],
    stats: [
      { label: "Active packages", value: "24" },
      { label: "Redeemed this month", value: "142" },
      { label: "Package revenue", value: "₹3.1L" },
    ],
  },
  memberships: {
    tagline: "Recurring membership plans with tiered client benefits.",
    highlights: [
      "Tiered membership plans",
      "Auto-renewal & billing cycle",
      "Member-only pricing",
    ],
    stats: [
      { label: "Active members", value: "418" },
      { label: "Renewals due", value: "27" },
      { label: "MRR", value: "₹2.4L" },
    ],
  },
  pos: {
    tagline: "Point-of-sale billing with GST-ready invoicing.",
    highlights: [
      "Fast checkout & split payments",
      "GST-ready invoices & receipts",
      "Discounts, tips and refunds",
    ],
    stats: [
      { label: "Today's bills", value: "46" },
      { label: "Avg bill value", value: "₹1,540" },
      { label: "Refunds today", value: "1" },
    ],
  },
  inventory: {
    tagline: "Real-time stock visibility across products and branches.",
    highlights: [
      "Multi-branch stock ledger",
      "Low-stock and expiry alerts",
      "Batch and SKU tracking",
    ],
    stats: [
      { label: "SKUs tracked", value: "312" },
      { label: "Low stock items", value: "6" },
      { label: "Stock value", value: "₹18.6L" },
    ],
  },
  purchases: {
    tagline: "Vendor purchase orders, receiving and cost tracking.",
    highlights: [
      "Vendor & PO management",
      "Goods received & reconciliation",
      "Cost and margin tracking",
    ],
    stats: [
      { label: "Open POs", value: "9" },
      { label: "Vendors", value: "27" },
      { label: "This month spend", value: "₹4.8L" },
    ],
  },
  staff: {
    tagline: "Employee records, roles, shifts and performance.",
    highlights: [
      "Role-based access control",
      "Shift scheduling",
      "Performance scorecards",
    ],
    stats: [
      { label: "Active staff", value: "38" },
      { label: "Branches staffed", value: "4" },
      { label: "Open shifts", value: "3" },
    ],
  },
  attendance: {
    tagline: "Biometric-ready attendance, leaves and shift compliance.",
    highlights: [
      "Daily check-in/out logs",
      "Leave & shift compliance",
      "Overtime tracking",
    ],
    stats: [
      { label: "Present today", value: "34/38" },
      { label: "On leave", value: "2" },
      { label: "Late check-ins", value: "1" },
    ],
  },
  commission: {
    tagline: "Automated staff commission on services and retail sales.",
    highlights: [
      "Service & product commission rules",
      "Tiered incentive slabs",
      "Payout-ready reports",
    ],
    stats: [
      { label: "This month payout", value: "₹2.1L" },
      { label: "Top earner", value: "Priya · ₹28.4K" },
      { label: "Pending approvals", value: "5" },
    ],
  },
  branches: {
    tagline: "Branch-level operations, targets and health monitoring.",
    highlights: [
      "Branch performance scorecards",
      "Target vs achievement tracking",
      "Local inventory & staff view",
    ],
    stats: [
      { label: "Total branches", value: "6" },
      { label: "Active", value: "5" },
      { label: "Under setup", value: "1" },
    ],
  },
  franchise: {
    tagline: "Central oversight across franchise-owned locations.",
    highlights: [
      "Consolidated franchise P&L",
      "Royalty and compliance tracking",
      "Central governance controls",
    ],
    stats: [
      { label: "Franchise partners", value: "4" },
      { label: "Total outlets", value: "11" },
      { label: "Compliance score", value: "92%" },
    ],
  },
  reports: {
    tagline: "Business intelligence and consolidated reporting suite.",
    highlights: [
      "Revenue & sales analytics",
      "Customer & retention insights",
      "Custom export & scheduling",
    ],
    stats: [
      { label: "Saved reports", value: "14" },
      { label: "Scheduled exports", value: "3" },
      { label: "Data range", value: "Last 12 months" },
    ],
  },
  "ai-assistant": {
    tagline:
      "Natural-language assistant for operational Q&A across every module.",
    highlights: [
      "Ask questions in plain language",
      "Cross-module data summaries",
      "Actionable daily briefings",
    ],
    stats: [
      { label: "Queries today", value: "—" },
      { label: "Status", value: "Preview only" },
      { label: "Data connected", value: "None" },
    ],
  },
  settings: {
    tagline: "Business configuration, roles, taxes and integrations.",
    highlights: [
      "User roles & permissions",
      "Tax, currency & branch config",
      "Notification preferences",
    ],
    stats: [
      { label: "Active users", value: "12" },
      { label: "Roles configured", value: "5" },
      { label: "Integrations", value: "0 connected" },
    ],
  },
};

const kpis: { label: string; value: string; delta: string; tone: KpiTone }[] = [
  {
    label: "Today's Revenue",
    value: "₹48,250",
    delta: "+12.4% vs yesterday",
    tone: "up",
  },
  {
    label: "Appointments Today",
    value: "32",
    delta: "6 upcoming · 4 in progress",
    tone: "up",
  },
  {
    label: "Customers",
    value: "1,284",
    delta: "+18 new this week",
    tone: "up",
  },
  {
    label: "Low Stock Alerts",
    value: "6 items",
    delta: "Reorder recommended",
    tone: "warning",
  },
];

const appointments: {
  time: string;
  customer: string;
  service: string;
  staff: string;
  status: AppointmentStatus;
}[] = [
  { time: "09:30 AM", customer: "Ananya Rao", service: "Gel Extension - Almond", staff: "Priya", status: "Completed" },
  { time: "10:15 AM", customer: "Meera Nair", service: "Classic Manicure", staff: "Divya", status: "In Progress" },
  { time: "11:00 AM", customer: "Kavya Singh", service: "Nail Art - Chrome", staff: "Priya", status: "Confirmed" },
  { time: "12:30 PM", customer: "Isha Kapoor", service: "Pedicure Spa", staff: "Ritu", status: "Confirmed" },
  { time: "02:00 PM", customer: "Riya Sharma", service: "Acrylic Refill", staff: "Divya", status: "Pending" },
  { time: "03:45 PM", customer: "Sanya Malhotra", service: "Gel Polish Change", staff: "Priya", status: "Pending" },
];

const lowStock: { name: string; remaining: number; threshold: number; unit: string }[] = [
  { name: "Gel Polish - Ruby Red", remaining: 3, threshold: 10, unit: "bottles" },
  { name: "Acrylic Powder - Clear", remaining: 2, threshold: 8, unit: "jars" },
  { name: "Nail Primer", remaining: 4, threshold: 12, unit: "bottles" },
  { name: "Cuticle Oil", remaining: 5, threshold: 15, unit: "bottles" },
  { name: "UV Top Coat", remaining: 1, threshold: 10, unit: "bottles" },
];

const revenueTrend: { day: string; value: number }[] = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 100 },
  { day: "Sun", value: 74 },
];

const snapshotStats: { label: string; value: string }[] = [
  { label: "Avg. Ticket Size", value: "₹1,540" },
  { label: "Repeat Customer Rate", value: "64%" },
  { label: "Avg Service Time", value: "52 min" },
];

const franchiseOverview: { name: string; city: string; status: FranchiseStatus; revenue: string }[] = [
  { name: "X Nail - Indiranagar", city: "Bengaluru", status: "Active", revenue: "₹1.24L" },
  { name: "X Nail - Koramangala", city: "Bengaluru", status: "Active", revenue: "₹98.6K" },
  { name: "X Nail - Banjara Hills", city: "Hyderabad", status: "New", revenue: "₹42.1K" },
  { name: "X Nail - Powai", city: "Mumbai", status: "Under Review", revenue: "₹76.3K" },
];

const aiSuggestions: string[] = [
  "Show today's top-performing branch",
  "Which customers are due for a follow-up?",
  "Summarize this week's inventory usage",
];

function NavIcon({ id }: { id: NavId }) {
  const cls = "h-5 w-5 shrink-0";
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cls,
  };

  switch (id) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "appointments":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 9.5h17" />
          <path d="M8 3v4M16 3v4" />
        </svg>
      );
    case "customers":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
          <circle cx="17" cy="8.5" r="2.3" />
          <path d="M15.2 14.8c2.6.2 4.8 2.3 4.8 5.2" />
        </svg>
      );
    case "services":
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.9L18.5 8l-4.1 3 1.6 4.9L12 13l-4 2.9 1.6-4.9L5.5 8l4.9-.1L12 3z" />
        </svg>
      );
    case "packages":
      return (
        <svg {...common}>
          <path d="M3.8 8.2 12 4l8.2 4.2v7.6L12 20l-8.2-4.2V8.2z" />
          <path d="M3.8 8.2 12 12l8.2-4.2M12 12v8" />
        </svg>
      );
    case "memberships":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <circle cx="8.2" cy="12" r="2" />
          <path d="M13 10.5h5M13 13.5h3.5" />
        </svg>
      );
    case "pos":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12.5" rx="2" />
          <path d="M3 10h18" />
          <path d="M6.5 14h4" />
        </svg>
      );
    case "inventory":
      return (
        <svg {...common}>
          <path d="M3.5 7.5 12 3.5l8.5 4v9l-8.5 4-8.5-4z" />
          <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5V20" />
        </svg>
      );
    case "purchases":
      return (
        <svg {...common}>
          <path d="M3.5 5.5h2.2l1.7 10.3a1.8 1.8 0 0 0 1.8 1.5h8a1.8 1.8 0 0 0 1.8-1.5l1.3-7.3H7" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
        </svg>
      );
    case "staff":
      return (
        <svg {...common}>
          <circle cx="12" cy="7.5" r="3.3" />
          <path d="M5 20c0-3.9 3.1-6.2 7-6.2s7 2.3 7 6.2" />
        </svg>
      );
    case "attendance":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.3" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "commission":
      return (
        <svg {...common}>
          <path d="M6 18 18 6" />
          <circle cx="7.5" cy="7.5" r="2.2" />
          <circle cx="16.5" cy="16.5" r="2.2" />
        </svg>
      );
    case "branches":
      return (
        <svg {...common}>
          <path d="M5 20V9.5L12 4l7 5.5V20" />
          <path d="M9.5 20v-5.5h5V20" />
        </svg>
      );
    case "franchise":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5.5" cy="19" r="2" />
          <circle cx="18.5" cy="19" r="2" />
          <path d="M12 7v4M12 11 5.5 17M12 11l6.5 6" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M4.5 20V10M11 20V4M17.5 20v-7" />
          <path d="M3.5 20.5h17" />
        </svg>
      );
    case "ai-assistant":
      return (
        <svg {...common}>
          <path d="M12 3.5l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" />
          <path d="M18.5 14l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" />
          <path d="M5.5 14l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7 6.3 6.3" />
        </svg>
      );
    default:
      return null;
  }
}

function NavList({
  activeNav,
  onSelect,
}: {
  activeNav: NavId;
  onSelect: (id: NavId) => void;
}) {
  return (
    <div className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeNav;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
              isActive
                ? "border border-border-gold-strong bg-surface-alt text-gold"
                : "border border-transparent text-muted hover:border-border-gold hover:bg-surface-hover hover:text-bone"
            }`}
          >
            <NavIcon id={item.id} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-border-gold bg-surface-alt/60 px-4 py-3 text-xs leading-5 text-muted">
      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
      <span>{children}</span>
    </div>
  );
}

function Card({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border-gold bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-bone">{title}</h3>
        <span className="rounded-full border border-border-gold bg-ink px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-muted">
          {badge.toUpperCase()}
        </span>
      </div>
      {children}
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: KpiTone;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-gold bg-surface p-5">
      <div className="absolute inset-y-0 left-0 w-1 bg-gold" />
      <div className="pl-2">
        <div className="text-xs font-semibold tracking-[0.12em] text-muted">
          {label.toUpperCase()}
        </div>
        <div className="mt-2 font-display text-2xl font-semibold text-bone sm:text-3xl">
          {value}
        </div>
        <div
          className={`mt-2 text-xs font-medium ${
            tone === "warning" ? "text-warning" : "text-success"
          }`}
        >
          {delta}
        </div>
      </div>
    </div>
  );
}

function statusStyles(status: AppointmentStatus) {
  switch (status) {
    case "Completed":
      return "border-success/40 bg-success/10 text-success";
    case "In Progress":
      return "border-warning/40 bg-warning/10 text-warning";
    case "Confirmed":
      return "border-border-gold-strong bg-surface-alt text-gold";
    case "Pending":
      return "border-border-gold bg-ink text-muted";
  }
}

function franchiseStatusStyles(status: FranchiseStatus) {
  switch (status) {
    case "Active":
      return "border-success/40 bg-success/10 text-success";
    case "New":
      return "border-border-gold-strong bg-surface-alt text-gold";
    case "Under Review":
      return "border-warning/40 bg-warning/10 text-warning";
  }
}

function DashboardView() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <DemoNotice>
        All figures below are illustrative sample data for client-demo
        purposes only. No live backend or payment system is connected.
      </DemoNotice>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Today's Appointments" badge="Sample data">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border-gold text-left text-xs text-muted">
                    <th className="pb-2 pr-4 font-medium">Time</th>
                    <th className="pb-2 pr-4 font-medium">Customer</th>
                    <th className="pb-2 pr-4 font-medium">Service</th>
                    <th className="pb-2 pr-4 font-medium">Staff</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr
                      key={`${appt.time}-${appt.customer}`}
                      className="border-b border-border-gold/60 last:border-0"
                    >
                      <td className="py-3 pr-4 text-muted">{appt.time}</td>
                      <td className="py-3 pr-4 text-bone">{appt.customer}</td>
                      <td className="py-3 pr-4 text-muted">{appt.service}</td>
                      <td className="py-3 pr-4 text-muted">{appt.staff}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles(
                            appt.status,
                          )}`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Business Snapshot" badge="7-day trend · sample">
            <div className="flex items-end gap-3 sm:gap-4">
              {revenueTrend.map((point) => (
                <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-32 w-full items-end rounded-lg bg-ink">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-gold-deep to-gold"
                      style={{ height: `${point.value}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted">{point.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border-gold pt-5 sm:grid-cols-3">
              {snapshotStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xs text-muted">{stat.label}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-bone">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Low Stock Alerts" badge={`${lowStock.length} items`}>
            <div className="space-y-3">
              {lowStock.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border-gold bg-surface-alt/50 px-4 py-3"
                >
                  <div>
                    <div className="text-sm text-bone">{item.name}</div>
                    <div className="mt-0.5 text-xs text-muted">
                      Reorder threshold: {item.threshold} {item.unit}
                    </div>
                  </div>
                  <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning">
                    {item.remaining} left
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Franchise Overview" badge="Sample branches">
            <div className="space-y-3">
              {franchiseOverview.map((branch) => (
                <div
                  key={branch.name}
                  className="rounded-xl border border-border-gold bg-surface-alt/50 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-bone">{branch.name}</span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${franchiseStatusStyles(
                        branch.status,
                      )}`}
                    >
                      {branch.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted">
                    <span>{branch.city}</span>
                    <span>{branch.revenue} today</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="AI Assistant" badge="Preview">
            <p className="text-xs leading-5 text-muted">
              Ask questions about appointments, revenue, inventory or
              franchise performance in plain language. This preview is not
              connected to live data.
            </p>
            <div className="mt-4 space-y-2">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="rounded-xl border border-border-gold bg-surface-alt/50 px-3.5 py-2.5 text-xs text-bone"
                >
                  {suggestion}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-gold bg-ink px-3.5 py-2.5">
              <input
                disabled
                placeholder="Ask the AI Assistant (preview)…"
                className="w-full bg-transparent text-xs text-muted placeholder:text-muted focus:outline-none"
              />
              <span className="rounded-full border border-border-gold-strong px-2 py-0.5 text-[10px] font-semibold text-gold">
                DEMO
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ModuleView({ navId, label }: { navId: Exclude<NavId, "dashboard">; label: string }) {
  const content = MODULE_CONTENT[navId];

  return (
    <div className="space-y-6">
      <DemoNotice>
        Module preview only — sample layout and data shown. Backend
        functionality for {label} is not implemented in this demo.
      </DemoNotice>

      <div className="rounded-2xl border border-border-gold bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-bone">{label}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {content.tagline}
            </p>
          </div>
          <span className="rounded-full border border-border-gold-strong bg-ink px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-gold">
            SAMPLE DATA
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {content.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border-gold bg-surface-alt/50 px-4 py-3"
            >
              <div className="text-xs text-muted">{stat.label}</div>
              <div className="mt-1 font-display text-lg font-semibold text-bone">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-3">
          {content.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 rounded-xl border border-border-gold bg-surface-alt/50 px-4 py-3 text-sm text-bone"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavId>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeNav) ?? NAV_ITEMS[0];

  const handleSelect = (id: NavId) => {
    setActiveNav(id);
    setMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-ink text-bone">
      <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-border-gold bg-surface lg:flex">
        <div className="border-b border-border-gold p-6">
          <div className="font-display text-2xl font-semibold tracking-[0.06em] text-gold-gradient">
            X NAIL
          </div>
          <div className="mt-1 text-[11px] tracking-[0.28em] text-muted">
            ENTERPRISE ERP
          </div>
        </div>
        <nav className="gold-scrollbar flex-1 overflow-y-auto px-3 py-4">
          <NavList activeNav={activeNav} onSelect={handleSelect} />
        </nav>
        <div className="border-t border-border-gold p-4">
          <div className="rounded-xl border border-border-gold bg-surface-alt p-3 text-xs">
            <div className="font-semibold text-gold">Demo Environment</div>
            <div className="mt-1 leading-5 text-muted">
              Sample data shown. No live backend connected.
            </div>
          </div>
        </div>
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative z-10 flex h-full w-72 flex-col border-r border-border-gold bg-surface">
            <div className="flex items-center justify-between border-b border-border-gold p-5">
              <div className="font-display text-xl font-semibold text-gold-gradient">
                X NAIL
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg border border-border-gold p-1.5 text-muted hover:text-gold"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="gold-scrollbar flex-1 overflow-y-auto px-3 py-4">
              <NavList activeNav={activeNav} onSelect={handleSelect} />
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border-gold bg-ink/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg border border-border-gold p-2 text-gold lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <div className="font-display text-sm tracking-[0.1em] text-gold-gradient lg:hidden">
                X NAIL ERP
              </div>
              <h1 className="font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                {activeItem.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-border-gold-strong bg-surface px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-gold sm:inline-block">
              CLIENT DEMO
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border-gold-strong bg-surface-alt text-xs font-semibold text-gold">
              XN
            </div>
          </div>
        </header>

        <main className="gold-scrollbar flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          {activeNav === "dashboard" ? (
            <DashboardView />
          ) : (
            <ModuleView navId={activeNav} label={activeItem.label} />
          )}
        </main>
      </div>
    </div>
  );
}
