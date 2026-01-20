import React, { useState, useEffect } from 'react';
import { 
  Bell, Calendar, Clock, User, Home, ChevronRight, Plus, Settings, 
  LogOut, Activity, CheckCircle2, MapPin, Heart, ChevronLeft, Phone, 
  Loader2, Check, Scale, Users, PlusCircle, Zap, ArrowUpRight, Smile, 
  Meh, Frown, Stethoscope, ClipboardList, Pill, Mail, Lock, Search, 
  TrendingUp, History, Info, Share2, X, AlertCircle, MessageSquare,
  Thermometer, Droplets, ArrowRight, ShieldCheck, UserCheck, Camera,
  Target, FileText, Edit3, ArrowLeft, Link as LinkIcon, Shield, Copy, ExternalLink, Trash2,
  UserPlus, UserCog, Moon, Gauge
} from 'lucide-react';

// --- Estilos Globais ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root { color-scheme: light; }
    body { 
      background-color: #F2F2F7 !important; 
      color: #1e293b !important;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
    .animate-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .ios-blur { backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); }
    ::-webkit-scrollbar { display: none; }
    .welcome-gradient {
      background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(242,242,247,1) 85%);
    }
    .nav-label {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      font-size: 10px !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }
  ` }} />
);

// --- Componentes Base ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[28px] p-5 shadow-sm border border-slate-100/50 ${className}`}>
    {children}
  </div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <Icon size={18} />
      </div>
      <input 
        className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm" 
        {...props} 
      />
    </div>
  </div>
);

// --- COMPONENTE ONBOARDING ---
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    nome: '', cpf: '', nascimento: '', sexo: '', telefone: '', email: '', emergencia: '', estadoCivil: '',
    peso: '', altura: '', dependencia: '', locomocao: '', alimentacao: '', habitos: '', trabalho: '',
    doencas: '', doencasFamilia: '', alergias: '', medicamentos: '', historico: '',
    contatoNome: '', contatoVinculo: '', contatoTelefone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderStep = () => {
    switch (step) {
      case 0: 
        return (
          <div className="flex flex-col min-h-screen bg-white animate-in overflow-hidden">
            <div className="relative flex-1">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                alt="Health Journey" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 welcome-gradient" />
            </div>
            
            <div className="px-8 pb-16 pt-4 text-center space-y-6 relative bg-[#F2F2F7]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Shield size={12} strokeWidth={3} />
                  Sua saúde em boas mãos
                </div>
                <h1 className="text-4xl font-black text-slate-900 leading-tight">
                  Seu app de <span className="text-blue-600">autogestão de saúde</span>
                </h1>
                <p className="text-slate-500 text-base font-medium px-4">
                  Organize seus tratamentos, acompanhe sua saúde e compartilhe informações com quem cuida de você.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button 
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-5 rounded-[28px] font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  Criar Conta
                  <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => onComplete({ nome: 'Usuário Demo' })}
                  className="w-full bg-white text-slate-600 border border-slate-200 py-5 rounded-[28px] font-black uppercase text-sm tracking-widest active:scale-95 transition-all"
                >
                  Já tenho conta
                </button>
                <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Ao continuar, você concorda com nossos Termos de Uso.
                </p>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col justify-center min-h-[80vh] p-6 pb-12 animate-in space-y-4">
            <h2 className="text-xl font-black text-slate-900 px-1 text-center mb-2">Dados Básicos</h2>
            <InputField label="Nome Completo" icon={User} name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome" />
            <InputField label="CPF" icon={ShieldCheck} name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" />
            <InputField label="Data de Nascimento" icon={Calendar} name="nascimento" value={formData.nascimento} onChange={handleChange} type="date" />
            <div className="space-y-1.5 w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Sexo</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-medium outline-none shadow-sm">
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <InputField label="Telefone" icon={Phone} name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />
            <InputField label="E-mail" icon={Mail} name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
            <button onClick={nextStep} className="w-full bg-blue-600 text-white py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-200 mt-6 active:scale-95 transition-all">Continuar</button>
          </div>
        );
      case 2:
        return (
          <div className="p-6 pb-12 animate-in space-y-4">
            <h2 className="text-xl font-black text-slate-900 px-1">Dados de Rotina</h2>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Peso (kg)" icon={Scale} name="peso" value={formData.peso} onChange={handleChange} placeholder="75" />
              <InputField label="Altura (cm)" icon={ArrowUpRight} name="altura" value={formData.altura} onChange={handleChange} placeholder="175" />
            </div>
            <InputField label="Grau de Dependência" icon={Activity} name="dependencia" value={formData.dependencia} onChange={handleChange} placeholder="Independente, Parcial..." />
            <InputField label="Nível de Locomoção" icon={MapPin} name="locomocao" value={formData.locomocao} onChange={handleChange} placeholder="Caminha, Cadeira de Rodas..." />
            <InputField label="Tipo de Alimentação" icon={Pill} name="alimentacao" value={formData.alimentacao} onChange={handleChange} placeholder="Onívora, Restritiva..." />
            <InputField label="Hábitos de Vida" icon={Zap} name="habitos" value={formData.habitos} onChange={handleChange} placeholder="Atividade física, Fumo..." />
            <InputField label="Trabalho / Ocupação" icon={Target} name="trabalho" value={formData.trabalho} onChange={handleChange} placeholder="Profissão" />
            <div className="flex gap-3 mt-4">
              <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-[24px] font-black uppercase text-xs">Voltar</button>
              <button onClick={nextStep} className="flex-[2] bg-blue-600 text-white py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all">Próximo</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-center min-h-[80vh] p-6 pb-12 animate-in space-y-4">
            <h2 className="text-xl font-black text-slate-900 px-1 text-center mb-2">Dados de Saúde</h2>
            <InputField label="Doenças Pré-existentes" icon={Stethoscope} name="doencas" value={formData.doencas} onChange={handleChange} placeholder="Hipertensão, Diabetes..." />
            <InputField label="Doenças na Família" icon={Users} name="doencasFamilia" value={formData.doencasFamilia} onChange={handleChange} placeholder="Histórico familiar" />
            <InputField label="Alergias" icon={AlertCircle} name="alergias" value={formData.alergias} onChange={handleChange} placeholder="Medicamentos, alimentos..." />
            <InputField label="Medicamentos Contínuos" icon={Pill} name="medicamentos" value={formData.medicamentos} onChange={handleChange} placeholder="Remédios que toma sempre" />
            <InputField label="Histórico Médico Relevante" icon={FileText} name="historico" value={formData.historico} onChange={handleChange} placeholder="Cirurgias, internações..." />
            <div className="flex gap-3 mt-6">
              <button onClick={prevStep} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-[24px] font-black uppercase text-xs">Voltar</button>
              <button onClick={nextStep} className="flex-[2] bg-blue-600 text-white py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all">Próximo</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 pb-12 animate-in space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-black text-slate-900">Rede de Apoio</h2>
              <span className="text-[10px] font-black text-blue-500 uppercase">Opcional</span>
            </div>
            <p className="text-sm text-slate-500 px-1 mb-2">Cadastre alguém para acompanhar sua jornada de saúde.</p>
            <InputField label="Nome do Contato" icon={User} name="contatoNome" value={formData.contatoNome} onChange={handleChange} placeholder="Nome completo" />
            <InputField label="Tipo de Vínculo" icon={Heart} name="contatoVinculo" value={formData.contatoVinculo} onChange={handleChange} placeholder="Filho, Cônjuge, Amigo..." />
            <InputField label="Contato (WhatsApp/E-mail)" icon={Phone} name="contatoTelefone" value={formData.contatoTelefone} onChange={handleChange} placeholder="(00) 00000-0000" />
            
            <button className="w-full bg-emerald-50 text-emerald-600 py-4 rounded-[24px] font-black uppercase text-[10px] flex items-center justify-center gap-2 border-2 border-emerald-100/50 active:scale-95 transition-all">
              <PlusCircle size={18} />
              Enviar Convite agora
            </button>

            <div className="flex flex-col gap-3 mt-8">
              <button onClick={() => onComplete(formData)} className="w-full bg-blue-600 text-white py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all">Finalizar Cadastro</button>
              <button onClick={prevStep} className="w-full text-slate-400 font-black uppercase text-[10px] tracking-widest py-2">Voltar ao passo anterior</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col">
      {step > 0 && (
        <div className="p-6 flex items-center justify-between z-10">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-blue-600' : 'w-3 bg-slate-200'}`} />
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passo {step} de 4</span>
        </div>
      )}
      <div className="flex-1 flex flex-col">{renderStep()}</div>
    </div>
  );
};

// --- ABA INÍCIO ---
const TabHome = ({ user, mood, setMood, onProfileClick, onLogout }) => {
  const [takenMeds, setTakenMeds] = useState({});

  const moods = [
    { id: 'sad', icon: Frown, label: 'Mal', color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'meh', icon: Meh, label: 'Ok', color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'happy', icon: Smile, label: 'Bem', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'great', icon: Zap, label: 'Ótimo', color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const toggleMed = (id) => {
    setTakenMeds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const meds = [
    { id: 1, name: "Vitamina D (2.000 UI)", dose: "Agora • Pós Almoço" },
    { id: 2, name: "Losartana 50mg", dose: "Às 08:00 • Em Jejum" },
    { id: 3, name: "Metformina 850mg", dose: "Às 20:00 • No Jantar" },
    { id: 4, name: "Ômega 3", dose: "Às 12:00 • No Almoço" },
  ];

  return (
    <div className="p-6 space-y-6 pb-32 animate-in">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 font-medium text-sm">Bom dia,</p>
          <h2 className="text-2xl font-black text-slate-900">{user?.nome || 'Paciente'}!</h2>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
              onClick={onLogout}
              className="w-10 h-10 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center shadow-sm border border-rose-100 active:scale-90 transition-transform"
              title="Sair"
            >
                <LogOut size={20} />
            </button>
            <button className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <button 
                onClick={onProfileClick}
                className="w-10 h-10 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-90 transition-transform ml-1"
            >
                <img 
                    src={`https://ui-avatars.com/api/?name=${user?.nome || 'User'}&background=2563eb&color=fff&size=100`} 
                    alt="Perfil" 
                    className="w-full h-full object-cover"
                />
            </button>
        </div>
      </header>

      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Estado de Espírito</h3>
        <div className="flex justify-between gap-2">
          {moods.map((m) => (
            <button key={m.id} onClick={() => setMood(m.id)} className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-[24px] transition-all border ${mood === m.id ? `${m.bg} border-transparent scale-105 shadow-sm` : 'bg-white border-slate-100 opacity-60'}`}>
              <m.icon size={24} className={mood === m.id ? m.color : 'text-slate-400'} />
              <span className={`text-[10px] font-black uppercase ${mood === m.id ? m.color : 'text-slate-400'}`}>{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Pill size={18} className="text-rose-500" />
            <h3 className="text-lg font-black text-slate-900">Medicações</h3>
          </div>
          <button className="w-8 h-8 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center"><Plus size={18} /></button>
        </div>
        <div className="space-y-3">
          {meds.map((med) => (
            <Card key={med.id} className="flex items-center gap-4 py-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${takenMeds[med.id] ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                <Pill size={24} />
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${takenMeds[med.id] ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{med.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase">{med.dose}</p>
              </div>
              <button 
                onClick={() => toggleMed(med.id)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${takenMeds[med.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-100 text-slate-200'}`}
              >
                <Check size={18} strokeWidth={4} />
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <h3 className="text-lg font-black text-slate-900">Próximas Consultas</h3>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </div>
        <Card className="flex items-center gap-4 py-4 border-l-4 border-l-blue-600">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Stethoscope size={24} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 text-sm">Dr. André (Cardio)</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Amanhã • 10:00 • Hosp. Vida</p>
          </div>
          <div className="bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-lg uppercase">Confirmar</div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">Próximos Tratamentos</h3>
          </div>
          <Plus size={18} className="text-slate-300" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Card className="flex items-center gap-4 py-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <Zap size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-sm">Fisioterapia Motora</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Hoje • 15:30 • Sessão 04/10</p>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center">
              <Check size={12} className="text-slate-200" />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

// --- ABA AGENDA ---
const TabAgenda = () => {
  const [selectedDay, setSelectedDay] = useState(14);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const categories = [
    { title: "Consultas Médicas", color: "text-blue-600", bgColor: "bg-blue-600", items: [{ id: 1, time: "10:00", title: "Dr. André (Cardiologia)", provider: "Hospital Vida", location: "Consultório 402", icon: Stethoscope }] },
    { title: "Exames Laboratoriais", color: "text-orange-500", bgColor: "bg-orange-500", items: [{ id: 3, time: "07:30", title: "Hemograma Completo", provider: "Lab. Central", location: "Unidade Ipanema", icon: Droplets }] }
  ];

  const treatments = [
    { id: 4, time: "15:30", title: "Fisioterapia Motora", provider: "Clínica Reab", location: "Sala 02", icon: Zap, color: "bg-emerald-500" }
  ];

  return (
    <div className="p-6 text-left animate-in pb-32 relative">
      <header className="mb-6 flex justify-between items-end relative">
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">Agenda</h1>
          <p className="text-sm text-slate-500">Janeiro, 2024</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowAddMenu(!showAddMenu)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${showAddMenu ? 'bg-slate-800 text-white rotate-45' : 'bg-blue-600 text-white'}`}
          >
            <Plus size={20} strokeWidth={3} />
          </button>
          {showAddMenu && (
            <div className="absolute right-0 bottom-12 w-48 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50 animate-in">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Stethoscope size={16} /></div>
                <span className="text-xs font-bold text-slate-700">Consulta</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><ClipboardList size={16} /></div>
                <span className="text-xs font-bold text-slate-700">Exame</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Zap size={16} /></div>
                <span className="text-xs font-bold text-slate-700">Tratamento</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-1 px-1">
        {[{ d: 12, s: 'SEG' }, { d: 13, s: 'TER' }, { d: 14, s: 'QUA' }, { d: 15, s: 'QUI' }, { d: 16, s: 'SEX' }, { d: 17, s: 'SÁB' }].map((day) => (
          <button key={day.d} onClick={() => setSelectedDay(day.d)} className={`min-w-[58px] h-[84px] rounded-[24px] flex flex-col items-center justify-center gap-2 transition-all ${selectedDay === day.d ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' : 'bg-white text-slate-400'}`}>
            <span className={`text-[9px] font-black uppercase tracking-wider ${selectedDay === day.d ? 'opacity-80' : 'text-slate-300'}`}>{day.s}</span>
            <span className="text-lg font-black">{day.d}</span>
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {categories.map((cat, idx) => (
          <section key={idx}>
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className={`w-1 h-4 rounded-full ${cat.bgColor}`}></div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">{cat.title}</h3>
            </div>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center justify-start w-12 pt-2">
                    <span className="text-[11px] font-black text-slate-900">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <Card className="p-4 flex items-center gap-4 relative active:scale-[0.98] transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bgColor} text-white`}><item.icon size={18} /></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-tighter">{item.provider} • {item.location}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-200" />
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-1 h-4 rounded-full bg-emerald-500"></div>
            <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">Tratamentos</h3>
          </div>
          <div className="space-y-3">
            {treatments.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center justify-start w-12 pt-2">
                  <span className="text-[11px] font-black text-slate-900">{item.time}</span>
                </div>
                <div className="flex-1">
                  <Card className="p-4 flex items-center gap-4 relative active:scale-[0.98] transition-all border-l-4 border-l-emerald-500">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} text-white`}><item.icon size={18} /></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-tighter">{item.provider} • {item.location}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- ABA SAÚDE ---
const TabSaudeHistorico = ({ user }) => {
  const peso = parseFloat(user?.peso) || 78.5;
  const alturaCm = parseFloat(user?.altura) || 175;
  const alturaM = alturaCm / 100;
  const imc = (peso / (alturaM * alturaM)).toFixed(1);

  const indicators = [
    { label: 'Peso', value: peso, unit: 'kg', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Altura', value: alturaCm, unit: 'cm', icon: ArrowUpRight, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'IMC', value: imc, unit: 'Kg/m²', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Glicemia', value: '98', unit: 'mg/dL', icon: Droplets, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const results = [
    { title: 'Hemograma Completo', date: '12 Jan, 2024', status: 'Normal', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Ecocardiograma', date: '05 Jan, 2024', status: 'Ver Laudo', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' }
  ];

  return (
    <div className="p-6 text-left animate-in pb-32">
      <header className="mb-6"><h1 className="text-2xl font-black text-slate-900 mb-1">Saúde</h1><p className="text-sm text-slate-500">Indicadores e histórico médico.</p></header>
      <section className="mb-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Aderência Geral ao Tratamento</h3>
        <Card className="bg-white overflow-hidden p-6 border-0 shadow-lg relative">
          <div className="flex justify-between items-end mb-4">
            <div><span className="text-3xl font-black text-slate-900">84%</span><p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">+12% este mês</p></div>
            <TrendingUp size={24} className="text-emerald-500 mb-1" />
          </div>
          <div className="flex items-end gap-1.5 h-16 w-full">
            {[30, 45, 60, 40, 80, 70, 90, 85, 95, 84].map((h, i) => (
              <div key={i} className={`flex-1 rounded-t-lg transition-all duration-1000 ${i === 9 ? 'bg-blue-600' : 'bg-slate-100'}`} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </Card>
      </section>
      <section className="mb-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Sinais e Biometria</h3>
        <div className="grid grid-cols-2 gap-3">
          {indicators.map((ind, i) => (
            <Card key={i} className="flex flex-col gap-3 py-4 border-slate-50">
              <div className={`w-8 h-8 ${ind.bg} ${ind.color} rounded-xl flex items-center justify-center`}><ind.icon size={16} /></div>
              <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{ind.label}</p><div className="flex items-baseline gap-1"><span className="text-xl font-black text-slate-900">{ind.value}</span><span className="text-[10px] font-bold text-slate-400">{ind.unit}</span></div></div>
            </Card>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1"><h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Últimos Resultados</h3><button className="text-[10px] font-black text-blue-600 uppercase">Ver todos</button></div>
        <div className="space-y-3">
          {results.map((res, i) => (
            <Card key={i} className="flex items-center gap-4 py-4 active:scale-95 transition-all">
              <div className={`w-12 h-12 ${res.bg} ${res.color} rounded-2xl flex items-center justify-center`}><res.icon size={22} /></div>
              <div className="flex-1"><h4 className="font-bold text-slate-800 text-sm leading-none mb-1">{res.title}</h4><p className="text-[10px] font-black text-slate-400 uppercase">{res.date}</p></div>
              <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl"><span className={`text-[10px] font-black uppercase ${res.status === 'Normal' ? 'text-emerald-500' : 'text-blue-600'}`}>{res.status}</span><ChevronRight size={12} className="text-slate-300" /></div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- ABA REDE ---
const TabCompartilhamento = () => {
  const [network] = useState([
    { id: 1, name: 'Dra. Cláudia', role: 'Médico', avatar: 'https://i.pravatar.cc/150?u=doc1', active: true, perms: { agenda: true, saude: true, medicamentos: false, emergencia: false } },
    { id: 2, name: 'Dr. Marcos', role: 'Médico', avatar: 'https://i.pravatar.cc/150?u=doc2', active: true, perms: { agenda: true, saude: true, medicamentos: true, emergencia: false } },
    { id: 3, name: 'Ricardo Silva', role: 'Responsável Legal', avatar: 'https://i.pravatar.cc/150?u=son', active: true, perms: { agenda: true, saude: true, medicamentos: true, emergencia: true } },
    { id: 4, name: 'Maria Souza', role: 'Acompanhante', avatar: 'https://i.pravatar.cc/150?u=wife', active: true, perms: { agenda: true, saude: true, medicamentos: false, emergencia: true } }
  ]);

  const medicos = network.filter(m => m.role === 'Médico');
  const acompanhantes = network.filter(m => m.role !== 'Médico');

  const RenderList = ({ items, title, icon: Icon }) => (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2 px-1">
        <Icon size={16} className="text-slate-400" />
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title} ({items.length})</h3>
      </div>
      <div className="space-y-3">
        {items.map((person) => (
          <Card key={person.id} className="flex items-center gap-4 py-4 active:scale-95 transition-all">
            <div className="relative">
              <img src={person.avatar} className="w-12 h-12 rounded-2xl object-cover" alt={person.name} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{person.name}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase mt-0.5">{person.role}</p>
            </div>
            <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center"><Settings size={18} /></button>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 text-left animate-in pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">Rede de Apoio</h1>
          <p className="text-sm text-slate-500">Pessoas conectadas à sua saúde.</p>
        </div>
        <button className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Plus size={24} strokeWidth={3} /></button>
      </header>
      <div className="space-y-8">
        <RenderList title="Médicos e Profissionais" items={medicos} icon={Stethoscope} />
        <RenderList title="Acompanhantes e Responsáveis" items={acompanhantes} icon={Heart} />
      </div>
    </div>
  );
};

// --- ABA PERFIL ---
const TabPerfil = ({ user, onBack }) => {
  const [view, setView] = useState('menu');

  const miniNetwork = [
    { id: 1, avatar: 'https://i.pravatar.cc/150?u=doc1' },
    { id: 2, avatar: 'https://i.pravatar.cc/150?u=doc2' },
    { id: 3, avatar: 'https://i.pravatar.cc/150?u=son' },
    { id: 4, avatar: 'https://i.pravatar.cc/150?u=wife' }
  ];

  if (view === 'cadastro') {
    return (
      <div className="p-6 space-y-6 pb-32 animate-in">
        <header className="flex items-center gap-4">
          <button onClick={() => setView('menu')} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Meus Dados</h1>
        </header>
        <div className="space-y-4">
          <InputField label="Nome Completo" icon={User} defaultValue={user?.nome} />
          <InputField label="WhatsApp" icon={Phone} defaultValue={user?.telefone} />
          <InputField label="E-mail" icon={Mail} defaultValue={user?.email} />
          <InputField label="Endereço" icon={MapPin} placeholder="Rua, Número, Bairro" />
          <button onClick={() => setView('menu')} className="w-full bg-blue-600 text-white py-4 rounded-[24px] font-black uppercase text-xs tracking-widest shadow-lg mt-4">Salvar Alterações</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-32 animate-in">
      <header className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Meu Perfil</h1>
      </header>

      <div className="flex flex-col items-center gap-4 mt-2">
        <div className="relative group">
          <div className="w-24 h-24 bg-slate-200 rounded-[32px] border-4 border-white shadow-xl overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${user?.nome}&background=2563eb&color=fff&size=200`} alt="Profile" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-lg">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 leading-none mb-1">{user?.nome}</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Paciente ID: #8829-XJ</p>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dados da Conta</h3>
        <button 
          onClick={() => setView('cadastro')}
          className="w-full flex items-center gap-4 bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 active:scale-[0.98] transition-all"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <UserCog size={24} />
          </div>
          <div className="flex-1 text-left">
            <span className="font-black text-slate-800 text-sm block">Completar Cadastro</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Atualizar dados cadastrais</span>
          </div>
          <ChevronRight size={18} className="text-slate-200" />
        </button>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Cadastro dos Objetivos</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Controle de Peso', icon: Scale, color: 'text-blue-600', bg: 'bg-blue-50', progress: '80%' },
            { label: 'Qualidade do Sono', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50', progress: '65%' },
            { label: 'Monitorar Pressão', icon: Gauge, color: 'text-rose-600', bg: 'bg-rose-50', progress: '100%' }
          ].map((goal, idx) => (
            <Card key={idx} className="flex items-center gap-4 py-4 relative group hover:border-blue-200 transition-colors">
              <div className={`w-12 h-12 ${goal.bg} ${goal.color} rounded-2xl flex items-center justify-center`}>
                <goal.icon size={22} />
              </div>
              <div className="flex-1">
                <span className="font-black text-slate-800 text-sm block">{goal.label}</span>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full ${goal.color.replace('text', 'bg')} transition-all duration-1000`} style={{ width: goal.progress }}></div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-black ${goal.color}`}>{goal.progress}</span>
                {goal.progress === '100%' ? (
                   <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={4} />
                   </div>
                ) : (
                  <ChevronRight size={14} className="text-slate-200" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rede de Apoio</h3>
          <button className="text-[9px] font-black text-blue-600 uppercase">Gerenciar</button>
        </div>
        <Card className="flex items-center justify-between py-4">
          <div className="flex -space-x-3">
            {miniNetwork.map(member => (
              <img 
                key={member.id} 
                src={member.avatar} 
                className="w-10 h-10 rounded-xl border-2 border-white object-cover" 
                alt="Member"
              />
            ))}
            <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-50 flex items-center justify-center text-slate-400 text-[10px] font-black">
              +2
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
            <UserPlus size={14} />
            Convidar
          </button>
        </Card>
      </section>

      <div className="space-y-3 pt-4">
        <button className="w-full flex items-center gap-4 bg-slate-100 p-5 rounded-[28px] active:scale-95 transition-all">
          <LogOut size={20} className="text-rose-500" />
          <span className="font-bold text-rose-500 flex-1 text-left text-sm uppercase tracking-widest">Sair da Conta</span>
        </button>
        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Versão 2.4.0 (Build 2024.1)</p>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState({ nome: 'Paciente' });
  const [mood, setMood] = useState(null);

  const handleOnboardingComplete = (data) => {
    setUser(data);
    setIsOnboarded(true);
  };

  const handleLogout = () => {
    setIsOnboarded(false);
    setActiveTab('home');
  };

  if (!isOnboarded) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-[#F2F2F7]">
        <GlobalStyles />
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F2F2F7] relative">
      <GlobalStyles />
      <div className="flex-1">
        {activeTab === 'home' && (
            <TabHome 
                user={user} 
                mood={mood} 
                setMood={setMood} 
                onProfileClick={() => setActiveTab('perfil')} 
                onLogout={handleLogout}
            />
        )}
        {activeTab === 'agenda' && <TabAgenda />}
        {activeTab === 'historico' && <TabSaudeHistorico user={user} />}
        {activeTab === 'compartilhar' && <TabCompartilhamento />}
        {activeTab === 'perfil' && <TabPerfil user={user} onBack={() => setActiveTab('home')} />}
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 px-6 flex justify-around items-center z-[50] rounded-t-[36px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] safe-area-bottom">
        <button 
          onClick={() => setActiveTab('home')} 
          className={`flex flex-col items-center justify-center gap-1.5 transition-all outline-none ${activeTab === 'home' ? 'text-blue-600 scale-105' : 'text-slate-300'}`}
        >
          <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="nav-label">Início</span>
        </button>

        <button 
          onClick={() => setActiveTab('agenda')} 
          className={`flex flex-col items-center justify-center gap-1.5 transition-all outline-none ${activeTab === 'agenda' ? 'text-blue-600 scale-105' : 'text-slate-300'}`}
        >
          <Calendar size={22} strokeWidth={activeTab === 'agenda' ? 2.5 : 2} />
          <span className="nav-label">Agenda</span>
        </button>

        <button 
          onClick={() => setActiveTab('historico')} 
          className={`flex flex-col items-center justify-center gap-1.5 transition-all outline-none ${activeTab === 'historico' ? 'text-blue-600 scale-105' : 'text-slate-300'}`}
        >
          <History size={22} strokeWidth={activeTab === 'historico' ? 2.5 : 2} />
          <span className="nav-label">Saúde</span>
        </button>

        <button 
          onClick={() => setActiveTab('compartilhar')} 
          className={`flex flex-col items-center justify-center gap-1.5 transition-all outline-none ${activeTab === 'compartilhar' ? 'text-blue-600 scale-105' : 'text-slate-300'}`}
        >
          <Users size={22} strokeWidth={activeTab === 'compartilhar' ? 2.5 : 2} />
          <span className="nav-label">Rede</span>
        </button>
      </nav>
    </div>
  );
}
