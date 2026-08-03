import React from 'react';
import { ShieldCheck, Lock, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-700">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" /> Legal & Trust Transparency
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: August 3, 2026 | Star Safety Enterprises
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-500" /> 1. Information We Collect
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            At <strong>Star Safety Enterprises</strong>, we collect personal information solely to process measurement appointments, provide customized safety net quotes, and deliver installation services in Chennai and Tamil Nadu. Information collected via our site forms or WhatsApp includes:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
            <li>Full Name</li>
            <li>Mobile / WhatsApp Phone Number</li>
            <li>City & Locality Address</li>
            <li>Requested Service Type (e.g. Balcony Safety Nets, Pigeon Nets, Invisible Grills)</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" /> 2. How We Use Your Information
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Your contact information is strictly used for:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
            <li>Scheduling free on-site balcony measurement visits with certified technicians.</li>
            <li>Sending customized price estimates via SMS or WhatsApp.</li>
            <li>Providing warranty certificates and post-installation support.</li>
          </ul>
          <p className="text-sm leading-relaxed font-semibold text-slate-800 pt-2">
            We DO NOT sell, rent, trade, or share your personal phone numbers or lead form details with third-party telemarketers or advertisers.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Google Ads & Analytics Compliance</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Our website uses standard website analytics and conversion tracking tools to optimize user experience and measure Google Ads performance. These tools collect non-personally identifiable technical data (such as browser type, device specifications, and page visit duration) using cookies.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Contact & Data Correction</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            If you have questions about our privacy practices, wish to update your inquiry details, or request data deletion, contact our privacy compliance officer:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 space-y-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span><strong>Address:</strong> Star Safety Enterprises, No 14/22, Flat F2, 1st Floor, Bharathiar Street, West Mambalam, Chennai, TN 600033</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span><strong>Phone:</strong> +91 90437 17064</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span><strong>Email:</strong> dudaprasad12345@gmail.com</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
