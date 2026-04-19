import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Database, 
  History, 
  PlusCircle, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  CreditCard,
  MessageSquare
} from 'lucide-react';

// Design Recipe 1 & 8 Implementation
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'logs' | 'settings'>('dashboard');

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#141414] flex">
      {/* Sidebar - Technical Grid feel */}
      <aside className="w-64 border-r border-[#141414]/10 bg-white flex flex-col">
        <div className="p-6 border-b border-[#141414]/10">
          <h1 className="font-mono text-xl font-bold tracking-tighter flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> CRTYCON
          </h1>
          <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mt-1">v1.0.0-PRO-VERSION</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<BarChart3 size={18} />} 
            label="الرئيسية" 
          />
          <NavItem 
            active={activeTab === 'inventory'} 
            onClick={() => setActiveTab('inventory')} 
            icon={<Database size={18} />} 
            label="المخزون" 
          />
          <NavItem 
            active={activeTab === 'logs'} 
            onClick={() => setActiveTab('logs')} 
            icon={<History size={18} />} 
            label="السجلات" 
          />
          <NavItem 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
            icon={<Settings size={18} />} 
            label="الإعدادات" 
          />
        </nav>

        <div className="p-4 border-t border-[#141414]/10">
          <div className="flex items-center gap-3 p-3 bg-[#141414] text-white rounded-lg">
            <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-mono font-bold">A</div>
            <div>
              <p className="text-xs font-bold">أدمن النظام</p>
              <p className="text-[10px] opacity-60">متصل (أونلاين)</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-[#141414]/10 bg-white px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-40">النظام</span>
            <ChevronRight size={14} className="opacity-30" />
            <span className="font-medium">
              {activeTab === 'dashboard' && 'لوحة الإحصائيات'}
              {activeTab === 'inventory' && 'إدارة الكروت'}
              {activeTab === 'logs' && 'سجل العمليات'}
              {activeTab === 'settings' && 'إعدادات النظام'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              الجيت واي نشط
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'logs' && <LogsView />}
          {activeTab === 'settings' && <SettingsView />}
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
      active ? 'bg-[#141414] text-white' : 'hover:bg-[#141414]/5 text-zinc-500'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
  </button>
);

const DashboardView = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
    {/* Stats Grid - Design Recipe 8 feel */}
    <div className="grid grid-cols-4 gap-6">
      <StatCard label="إجمالي مبيعات اليوم" value="15,400" unit="R.Y" icon={<TrendingUp className="text-green-500" />} />
      <StatCard label="الكروت الموزعة" value="142" unit="كـرت" icon={<CreditCard className="text-blue-500" />} />
      <StatCard label="الرسائل المستلمة" value="284" unit="R.Y" icon={<MessageSquare className="text-purple-500" />} />
      <StatCard label="حالة المخزون" value="جيد" unit="SAFE" icon={<Database className="text-orange-500" />} />
    </div>

    {/* Inventory Status - Design Recipe 1 feel */}
    <div className="bg-white border border-[#141414]/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-[#141414]/10 bg-zinc-50 flex justify-between items-center">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest opacity-60 italic">نظرة سريعة على المخزون</h3>
      </div>
      <div className="grid grid-cols-6 divide-x divide-zinc-100">
        {[100, 200, 300, 500, 1000, 2000].map((cat) => (
          <div key={cat} className="p-6 text-center hover:bg-zinc-50 transition-colors cursor-default">
            <p className="text-[10px] font-mono opacity-40 uppercase mb-1">فئة {cat}</p>
            <p className="text-2xl font-bold font-mono tracking-tighter">42</p>
            <div className="mt-2 w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#141414]" style={{ width: '65%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InventoryView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-tight italic font-serif">إدارة الكروت</h2>
      <button className="bg-[#141414] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
        <PlusCircle size={18} /> إضافة كروت جديدة
      </button>
    </div>

    <div className="bg-white border border-[#141414]/10 rounded-xl overflow-hidden">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-[#141414]/10 font-mono italic text-[10px] uppercase opacity-50">
            <th className="p-4">الفئة</th>
            <th className="p-4">الكود</th>
            <th className="p-4">تاريخ الإضافة</th>
            <th className="p-4">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors font-mono text-sm leading-none">
              <td className="p-4 font-bold">500 <span className="text-[10px] font-normal opacity-40">R.Y</span></td>
              <td className="p-4 opacity-70 tracking-widest">ABCD-EFGH-IJKL</td>
              <td className="p-4 text-xs opacity-40 uppercase">2026-04-19 12:45</td>
              <td className="p-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">متاح</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const LogsView = () => (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-tight italic font-serif">سجل العمليات</h2>
    </div>

    <div className="bg-white border border-[#141414]/10 rounded-xl overflow-hidden">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-zinc-50 border-b border-[#141414]/10 font-mono italic text-[10px] uppercase opacity-50">
            <th className="p-4">الوقت</th>
            <th className="p-4">رقم العميل</th>
            <th className="p-4">الفئة</th>
            <th className="p-4">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors font-mono text-sm leading-none">
              <td className="p-4 text-xs opacity-40 uppercase italic">10:14:22 AM</td>
              <td className="p-4 font-bold">77712345{i}</td>
              <td className="p-4">1000 <span className="text-[10px] font-normal opacity-40">R.Y</span></td>
              <td className="p-4">
                <span className="flex items-center gap-2 text-green-600 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> مكتملة
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const SettingsView = () => (
    <div className="max-w-2xl space-y-8">
        <h2 className="text-2xl font-bold tracking-tight italic font-serif">إعدادات النظام</h2>
        
        <div className="space-y-6">
            <section className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase opacity-40 tracking-widest">إعدادات الجيت واي</h3>
                <div className="p-6 bg-white border border-[#141414]/10 rounded-xl space-y-4">
                    <ToggleItem label="تشغيل النظام الأوتوماتيكي" desc="سماح للنظام بقراءة الرسائل وتوزيع الكروت فوراً." defaultOn />
                    <ToggleItem label="الرد التلقائي عبر SMS" desc="إرسال رسائل تأكيد للعملاء عند اكتمال العملية." defaultOn />
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase opacity-40 tracking-widest">تخصيص الرسائل</h3>
                <div className="p-6 bg-white border border-[#141414]/10 rounded-xl space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold font-mono uppercase opacity-50">قالب الرسالة (فئة 500)</label>
                        <textarea className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-[#141414] transition-colors" rows={3}>شكراً لشرائك من شبكتنا! كود الكرت الخاص بك هو:</textarea>
                    </div>
                </div>
            </section>
        </div>
    </div>
)

const ToggleItem = ({ label, desc, defaultOn = false }: { label: string; desc: string; defaultOn?: boolean }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-sm font-bold">{label}</p>
            <p className="text-xs opacity-40">{desc}</p>
        </div>
        <button className={`w-12 h-6 rounded-full transition-colors relative ${defaultOn ? 'bg-black' : 'bg-zinc-200'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${defaultOn ? 'right-7' : 'right-1'}`} />
        </button>
    </div>
)

const StatCard = ({ label, value, unit, icon }: { label: string; value: string; unit: string; icon: React.ReactNode }) => (
  <div className="bg-white p-6 border border-[#141414]/10 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <p className="text-xs font-mono font-bold uppercase tracking-wider opacity-40">{label}</p>
      {icon}
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-mono font-bold tracking-tighter">{value}</span>
      <span className="text-[10px] font-mono opacity-40 uppercase font-bold">{unit}</span>
    </div>
  </div>
);

export default App;
