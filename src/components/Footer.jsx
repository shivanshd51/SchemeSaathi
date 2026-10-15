import React from 'react';
import { Compass, ShieldCheck, Heart, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ 
  onNavigate, 
  selectedPilot,
  language 
}) {
  const isHindi = language === 'hi';

  return (
    <footer className="no-print bg-cream-50 border-t border-cream-300 pt-12 pb-10 text-xs text-ink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-leaf-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-ink-950">
                Scheme<span className="text-leaf-600">Saathi</span>
              </span>
            </div>
            
            <p className="text-xs text-ink-600 leading-relaxed max-w-sm">
              A student innovation project developed for <strong>YUVA SHAKTI THINK TANK</strong>. 
              Helping students, first-time applicants, and families discover welfare schemes, understand requirements, prepare document checklists, and finish their applications.
            </p>

            <div className="pt-2 text-[11px] text-ink-500 flex items-center gap-1.5">
              <span>Active Field Pilot:</span>
              <span className="font-bold text-ink-800">{selectedPilot.district} District ({selectedPilot.state})</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-[11px]">
              Explore
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-leaf-700 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-leaf-700 transition">
                  Eligibility Finder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse')} className="hover:text-leaf-700 transition">
                  Browse Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checklist')} className="hover:text-leaf-700 transition">
                  Document Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Guidance & Support */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-[11px]">
              Guidance
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('guide')} className="hover:text-leaf-700 transition">
                  Application Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide')} className="hover:text-leaf-700 transition">
                  Jargon Buster
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('impact')} className="hover:text-leaf-700 transition">
                  Impact Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-leaf-700 transition">
                  Admin Data Schema
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Pilot Helpdesk */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-bold text-ink-900 uppercase tracking-wider text-[11px]">
              Campus Pilot Helpdesk
            </h4>
            <p className="text-[11px] text-ink-600">
              Yuva Shakti Student Support Cell<br />
              Pune Innovation Hub, Shivajinagar
            </p>
            <p className="text-[11px] text-ink-700 font-semibold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-leaf-600" />
              <span>saathi@yuvashaktithinktank.org</span>
            </p>
            <p className="text-[11px] text-ink-500">
              Hours: Mon–Fri, 10:00 AM – 5:00 PM IST
            </p>
          </div>

        </div>

        {/* Official Statutory Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-cream-200/60 border border-cream-300 text-[11px] leading-relaxed text-ink-700 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-ink-900">
            <ShieldCheck className="w-4 h-4 text-leaf-600" />
            <span>Official Government Source Disclaimer & Legal Notice</span>
          </div>
          <p>
            SchemeSaathi is an independent, non-commercial public service innovation developed by students of Yuva Shakti Think Tank. 
            SchemeSaathi does NOT represent, operate, or speak on behalf of any government ministry or department. 
            We never charge fees, collect processing money, or promise government approvals. All scheme matches are informational suggestions. 
            Final eligibility, verification, and payment disbarment are the exclusive statutory domain of the respective government authorities. 
            Always confirm active rules and application deadlines with the respective official portals.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-cream-200 text-[11px] text-ink-500">
          <div>
            © {new Date().getFullYear()} SchemeSaathi • Yuva Shakti Think Tank. Released for public benefit.
          </div>
          <div className="flex items-center gap-4">
            <span>Zero personal identifiers stored</span>
            <span>•</span>
            <span>WCAG 2.1 AA Accessible</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
