"use client";
import React, { useState, useMemo } from 'react';

interface IComponent {
    [key: string]: string;
}
    
// Átomo: Texto
const Text = ({ children='', variant = 'body', className = '' }) => {
  const variants: IComponent = {
    title: 'text-2xl font-bold text-gray-900',
    subtitle: 'text-lg text-gray-600',
    sectionTitle: 'text-xl font-semibold text-gray-800 mb-4',
    dayLabel: 'text-sm font-medium',
    nextLabel: 'text-lg font-semibold text-blue-600',
    hint: 'text-sm text-gray-500',
    body: 'text-base text-gray-700'
  };
  
  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
};

// Átomo: Ícone
type IconName = 'back' | 'location' | 'clock';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

const Icon = ({ name, size = 24, color = 'currentColor', className = '' }: IconProps) => {
  const icons: Record<IconName, string> = {
    back: '⬅️',
    location: '📍',
    clock: '⏰'
  };

  const icon = icons[name];

  return (
    <span
      className={className}
      style={{ fontSize: size, color, display: 'inline-flex', alignItems: 'center' }}
      aria-label={name}
    >
      {icon}
    </span>
  );
};

// Átomo: Botão Horário
const HorarioButton = ({ time='00:00', isSelected=false, onClick=()=>{} }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`
        p-3 rounded-lg border-2 transition-all duration-200 font-medium
        ${isSelected 
          ? 'bg-blue-600 text-white border-blue-600' 
          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
        }
        flex items-center justify-center gap-2
      `}
    >
      {isSelected && <Icon name="clock" size={16} />}
      {time}
    </button>
  );
};

// Molécula: Header da Linha
const HeaderLinha = ({ onBack=()=>{}, linha='', trajeto='' }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white shadow-sm">
      <button 
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Icon name="back" size={24} color="#374151" />
      </button>
      <div>
        <Text variant="title">{linha}</Text>
        <Text variant="subtitle">{trajeto}</Text>
      </div>
    </div>
  );
};

// Molécula: Card Próximo Horário
const CardProximoHorario = ({ trajeto, proximoHorario }) => {
  return (
    <div className="bg-blue-50 p-4 mx-4 rounded-xl border border-blue-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon name="location" size={20} color="#2563eb" />
        <Text variant="body" className="text-blue-800">{trajeto}</Text>
      </div>
      <Text variant="nextLabel">{proximoHorario}</Text>
    </div>
  );
};

// Molécula: Seletor de Tabs
const TabSelector = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Molécula: Grade de Horários
const GradeHorarios = ({ horarios, selectedTime, onTimeSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {horarios.map((time, index) => (
        <HorarioButton
          key={index}
          time={time}
          isSelected={selectedTime === time}
          onClick={onTimeSelect}
        />
      ))}
    </div>
  );
};

// Molécula: Footer com Dica
const FooterHint = () => {
  return (
    <div className="p-4 text-center">
      <Text variant="hint">💡 Toque em um horário para definir um lembrete</Text>
    </div>
  );
};

// Organismo: Bloco de Horários
const BlocoHorarios = ({ horarios, selectedTime, onTimeSelect }) => {
  const [activeTab, setActiveTab] = useState('weekdays');
  
  const tabs = [
    { id: 'weekdays', label: 'Segunda à Sexta' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' }
  ];
  
  const getCurrentHorarios = () => {
    return horarios[activeTab] || [];
  };
  
  return (
    <div className="p-4">
      <Text variant="sectionTitle">Horários</Text>
      <TabSelector 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tabs={tabs}
      />
      <GradeHorarios 
        horarios={getCurrentHorarios()}
        selectedTime={selectedTime}
        onTimeSelect={onTimeSelect}
      />
    </div>
  );
};

// Template: Tela da Linha
const TelaLinha = ({
  linha,
  trajeto,
  destino,
  proximoHorario,
  horarios,
  onBack,
  onTimeSelect
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect?.(time);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLinha 
        onBack={onBack}
        linha={linha}
        trajeto={trajeto}
      />
      
      <div className="py-4">
        <CardProximoHorario 
          trajeto={destino}
          proximoHorario={proximoHorario}
        />
      </div>
      
      <BlocoHorarios 
        horarios={horarios}
        selectedTime={selectedTime}
        onTimeSelect={handleTimeSelect}
      />
      
      <FooterHint />
    </div>
  );
};

// Página: Componente Principal
const PageLinhaOnibus = () => {
  // Dados simulados baseados no modelo Prisma
  const dadosLinha = {
    linha: "501",
    trajeto: "Centro/Iguatemi", 
    destino: "Centro → Shopping Iguatemi",
    proximoHorario: "Proximo 05:30",
    horarios: {
      weekdays: [
        "05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
        "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
        "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
        "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
      ],
      saturday: [
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00"
      ],
      sunday: [
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
        "19:00"
      ]
    }
  };
  
  const handleBack = () => {
    // Navegar de volta (usando Next.js router em implementação real)
    console.log("Voltar para listagem de linhas");
  };
  
  const handleTimeSelect = (time) => {
    // Ação para definir lembrete
    console.log(`Definir lembrete para ${time}`);
    alert(`Lembrete definido para às ${time}`);
  };
  
  return (
    <TelaLinha 
      {...dadosLinha}
      onBack={handleBack}
      onTimeSelect={handleTimeSelect}
    />
  );
};

export default PageLinhaOnibus;
