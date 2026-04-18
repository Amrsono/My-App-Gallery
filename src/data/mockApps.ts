export interface AppData {
  id: string;
  name: string;
  description: string;
  category: string;
  iconGradient: string;
}

export const mockApps: AppData[] = [
  {
    id: 'app-1',
    name: 'Nexus Analytics',
    description: 'Real-time data visualization and predictive modeling for enterprise scale data sets.',
    category: 'Data',
    iconGradient: 'linear-gradient(135deg, #3b82f6, #2dd4bf)'
  },
  {
    id: 'app-2',
    name: 'CyberShield',
    description: 'Advanced threat detection and automated vulnerability patching.',
    category: 'Security',
    iconGradient: 'linear-gradient(135deg, #ef4444, #f97316)'
  },
  {
    id: 'app-3',
    name: 'Aether Cloud',
    description: 'Decentralized storage solution with military-grade encryption.',
    category: 'Infrastructure',
    iconGradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)'
  },
  {
    id: 'app-4',
    name: 'Synapse Core',
    description: 'Neural network training environmental control and model deployment.',
    category: 'AI',
    iconGradient: 'linear-gradient(135deg, #10b981, #3b82f6)'
  },
  {
    id: 'app-5',
    name: 'Quantum Ledger',
    description: 'High-frequency transaction processing on a quantum-resistant blockchain.',
    category: 'Finance',
    iconGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
  },
  {
    id: 'app-6',
    name: 'Orbit CRM',
    description: 'Next-generation customer relationship management with AI predictions.',
    category: 'Business',
    iconGradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)'
  }
];
