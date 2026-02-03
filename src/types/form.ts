export interface FormData {
  // Nova jornada - Diagnóstico
  knowsMonthlyBalance?: boolean | null;
  investsMonthly?: boolean | null;
  diagnosisLevel?: 'fundamentos' | 'patrimonio' | 'otimizacao';

  // Identificação
  email?: string;
  phone?: string;
  birthDate?: string;
  maritalStatus?: string;

  // Família e moradia
  hasDependents?: string;
  dependentsCount?: string;
  livingWith?: string;

  // Profissão e renda principal
  currentProfession?: string;
  mainIncomeSource?: string;
  mainIncomeSourceOther?: string;
  workRegime?: string;
  mainIncomeAmount?: number;

  // Renda secundária
  secondaryIncomeSources?: string[];
  hasSecondaryIncome?: string;
  secondaryIncomeSource?: string;
  otherSegundaryIncomeSource?: string;
  secondaryIncomeValue?: string;

  // Variabilidade e passivos
  incomeVariability?: string;
  incomeVariabilityDetails?: string;
  hasPassiveIncome?: string;
  passiveIncomeSources?: string[];
  otherIncomeValue?: string;
  passiveIncomeValue?: string;
  otherIncome?: string;

  // Controle e despesas
  hasExpenseControl?: string;
  updateFrequency?: string;
  monthlyExpenses?: string;
  surplusAction?: string;
  deficitAction?: string;

  // Dívidas
  hasDebts?: string;
  debtTypes?: string[];
  totalDebtAmount?: string;
  averageInterestRate?: string;
  hasOverdueDebts?: string;
  triedRenegotiation?: string;

  // Patrimônio e investimentos
  hasEmergencyFund?: string | boolean | null;
  emergencyFundMonths?: string;
  emergencyFundLocation?: string[];
  alreadyInvests?: string;
  investmentTypes?: string[];
  monthlyInvestment?: number;
  totalInvested?: number;
  investmentGoal?: string;
  vehicleModels?: string[];
  vehicleValue?: string;
  retirementIncome?: string;
  propertyTypes?: string[];
  propertyValue?: string;
  retirementAge?: string;
  hasVehicle?: string;
  vehicleDetails?: string;
  hasProperty?: string;
  propertyDetails?: string;
  otherAssets?: string;
  hasVehicleInsurance?: 'Sim' | 'Não' | '';
  vehicleInsurancePremium?: string;
  hasPropertyInsurance?: 'Sim' | 'Não' | '';
  propertyInsurancePremium?: string;
  hasLifeInsurance?: 'Sim' | 'Não' | '';
  lifeInsuranceCompany?: string;
  lifeInsurancePremium?: string;

  // Metas e objetivos
  goals12Months?: string;
  goals5Years?: string;
  topPriority?: string;
  goalImpact?: string;
  changeCommitment?: string;
  goalsOtherText?: string;
  averageMonthlyInvestment?: number;
  goalsSelection?: string[];
  consultingGoals?: string[];
  successDefinition?: string;

  // Controle interno
  [key: string]: any;
}


export interface FormStep {
  id: string;
  component: React.ComponentType<FormStepProps>;
  nextStepLogic: (formData: FormData) => string | null;
  prevStepId?: string | ((formData: FormData, history: string[]) => string | null);
  title?: string;
  questionNumber?: number;
}

export interface FormStepProps {
  onContinue: (data: any) => void;
  onBack?: () => void;
  formData?: FormData;
  questionNumber?: number;
  canGoBack?: boolean;
}
