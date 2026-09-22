import React from "react";
import { ArrowRight, Car, QrCode, Search, ShieldCheck, Zap } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Search & Filter Zones",
      description:
        "Select your arrival destination, flight terminal, or shopping concourse. Filter seamlessly for covered bays, oversized stalls, or high-output charging plugs.",
      badge: "Discovery",
      icon: Search,
    },
    {
      num: "02",
      title: "Reserve & Add Plate",
      description:
        "Confirm your reservation with one tap. Enter your vehicle license plate for instant smart gate synchronization and guaranteed spot allocation.",
      badge: "Instant Sync",
      icon: QrCode,
    },
    {
      num: "03",
      title: "Gate Entry & EV Plug-in",
      description:
        "Camera feeds lift barrier arms immediately on optical license plate detection. Pull directly into your assigned stall for autonomous metering.",
      badge: "Autonomous",
      icon: Zap,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-3 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          ZERO HASSLE ARRIVAL
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How SpotSync Operates
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
          From touchless digital reservation to automated gate lift, experience friction-free airport and retail parking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f7f2] text-[#0d5440] font-black text-sm">
                    {step.num}
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-[#0d5440]" />
                  <span>Sub-second response</span>
                </span>
                <span className="text-[#00d084] font-bold">✓ Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
