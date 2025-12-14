"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // --- 1. IMPORTAÇÃO ADICIONAL ---
import { motion, AnimatePresence } from 'framer-motion';
// --- Ícone ArrowLeft adicionado ---
import { ArrowLeft, ShieldCheck, HelpCircle, FileText, BookUser, ChevronDown, HeartPulse, Info, Users, Lock, Copy, AlertTriangle, CheckCircle, Ban } from 'lucide-react';
import { SimpleHeader } from "@/components/layout/simple-header"
// --- Componentes Reutilizáveis (sem alteração) ---
const AccordionItem = ({ title, children, isOpen, onClick }) => {
    // ...código do componente sem alterações
    return (
    <div className="border-b border-gray-200 dark:border-slate-700 last:border-b-0">
      <button
        className="w-full flex justify-between items-center text-left py-4 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
        <ChevronDown
          className={`transform transition-transform duration-300 text-slate-500 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
          size={24}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Componente Principal da Página (COM BOTÃO VOLTAR) ---

export default function InformacoesSUSConnect() {
  const router = useRouter(); // --- 2. INICIALIZAR O ROUTER ---
  const [activeTab, setActiveTab] = useState('direitos');
  const [openFaqs, setOpenFaqs] = useState([0]);

  const handleFaqClick = (index) => {
    setOpenFaqs(prevOpen => 
      prevOpen.includes(index)
        ? prevOpen.filter(i => i !== index)
        : [...prevOpen, index]
    );
  };
  
  const faqItems = [
    
    { title: "Como agendar uma consulta pelo SUS Connect?", content: "Acesse sua conta, vá em \"Agendamentos\", escolha a especialidade, a unidade de saúde e o horário desejado entre as opções disponíveis." },
    { title: "Posso alterar ou cancelar um agendamento?", content: "Sim. Para gerenciar seus compromissos, acesse a seção \"Minhas Consultas\" na sua área de usuário, onde você poderá cancelar ou remarcar." },
    { title: "O que fazer se eu esquecer minha senha?", content: "Na tela de login, clique no link “Esqueceu sua senha?”. Você receberá instruções por e-mail para criar uma nova senha de forma segura." },
    { title: "Quem pode usar a plataforma?", content: "Qualquer cidadão brasileiro que possua CPF e um Cartão Nacional de Saúde (Cartão SUS) válido pode se cadastrar e utilizar a plataforma." },
  ];

  const tabsData = { /* ...seu objeto de abas aqui, sem alterações... */ 
    direitos: {
      icon: ShieldCheck,
      title: "Direitos do Paciente",
      content: (
        <>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            O SUS assegura a todos um atendimento digno e humanizado. Conheça seus principais direitos:
          </p>
          <ul className="space-y-4 text-gray-800 dark:text-gray-200">
            <li className="flex items-start gap-3"><Info size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Acesso à informação:</strong> direito a explicações claras sobre seu diagnóstico, exames, tratamento e prognóstico.</span></li>
            <li className="flex items-start gap-3"><Users size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Atendimento prioritário:</strong> para urgências, emergências, gestantes, idosos, pessoas com deficiência e crianças.</span></li>
            <li className="flex items-start gap-3"><Lock size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Privacidade e confidencialidade:</strong> seus dados são protegidos e acessíveis apenas por profissionais autorizados.</span></li>
            <li className="flex items-start gap-3"><Copy size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Acesso ao prontuário:</strong> direito a cópia do seu prontuário médico, exames e laudos a qualquer momento.</span></li>
          </ul>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-4">
            Garantido pela Constituição e normas do SUS. Para denúncias, Disque Saúde <strong>136</strong>.
          </p>
        </>
      )
    },
    faq: {
      icon: HelpCircle,
      title: "Perguntas Frequentes",
      content: (
        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              isOpen={openFaqs.includes(index)}
              onClick={() => handleFaqClick(index)}
            >
              <p>{item.content}</p>
            </AccordionItem>
          ))}
        </div>
      )
    },
    privacidade: {
      icon: FileText,
      title: "Política de Privacidade",
      content: (
         <>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Sua privacidade é nossa prioridade. Atuamos em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
          <ul className="space-y-4 text-gray-800 dark:text-gray-200">
             <li className="flex items-start gap-3"><CheckCircle size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Coleta de dados:</strong> coletamos apenas informações essenciais para a prestação dos serviços de saúde.</span></li>
             <li className="flex items-start gap-3"><Lock size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Segurança:</strong> seus dados são armazenados com as mais altas práticas de segurança e com acesso restrito.</span></li>
             <li className="flex items-start gap-3"><Ban size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span><strong>Não compartilhamento:</strong> não compartilhamos seus dados com terceiros, exceto por obrigação legal.</span></li>
          </ul>
           <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-4">
            Consulte a <a href="#" className="underline hover:text-emerald-500 transition-colors">Lei nº 13.709/2018 (LGPD)</a> para mais detalhes.
          </p>
        </>
      )
    },
    termos: {
      icon: BookUser,
      title: "Termos de Uso",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Ao utilizar o SUS Connect, você concorda com os seguintes termos:
          </p>
          <ul className="space-y-4 text-gray-800 dark:text-gray-200">
            <li className="flex items-start gap-3"><AlertTriangle size={20} className="text-amber-500 mt-1 flex-shrink-0" /><span>Você é <strong>responsável pela veracidade</strong> das informações fornecidas.</span></li>
            <li className="flex items-start gap-3"><Ban size={20} className="text-red-500 mt-1 flex-shrink-0" /><span>É <strong>proibido o uso</strong> da plataforma para fins ilícitos, fraudulentos ou que violem direitos de terceiros.</span></li>
            <li className="flex items-start gap-3"><CheckCircle size={20} className="text-emerald-500 mt-1 flex-shrink-0" /><span>O uso da plataforma é <strong>gratuito</strong> e destinado ao acesso a serviços de saúde pública.</span></li>
          </ul>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-4">
            Última atualização: Junho de 2025.
          </p>
        </>
      )
    }
  };

  const ActiveIcon = tabsData[activeTab].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-100 dark:from-slate-900 dark:to-slate-800">
      <SimpleHeader title="Validação de Atendimento" showBackButton backUrl="/atendente" />
      <div className="w-full px-4 relative max-w-4xl mx-auto">
        {/* --- 3. BOTÃO VOLTAR --- */}

        <header className="text-center mb-12 mt-4">
          
          <HeartPulse className="mx-auto text-emerald-500" size={64} />
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mt-4">Central de Informações</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Tudo o que você precisa saber sobre o SUS Connect.
          </p>
        </header>

        {/* ... Resto do seu JSX (abas e conteúdo) sem alterações ... */}
        <div className="flex justify-center border-b border-gray-200 dark:border-slate-700 mb-8">
          {Object.keys(tabsData).map(key => {
            const { icon: Icon, title } = tabsData[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all duration-300 ${
                  isActive
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{title}</span>
              </button>
            )
          })}
        </div>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-xl border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <ActiveIcon className="text-emerald-500 dark:text-emerald-400" size={36} />
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">{tabsData[activeTab].title}</h2>
              </div>
              {tabsData[activeTab].content}
            </motion.div>
          </AnimatePresence>
        </main>
        
      </div>
    </div>
  )
}