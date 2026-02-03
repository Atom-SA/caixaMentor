import { FormStep, FormData } from './types/form';
import IntroScreen from './components/IntroScreen';
import DiagnosisQuestions from './components/DiagnosisQuestions';
import DiagnosisResult from './components/DiagnosisResult';
import ActionPlan from './components/ActionPlan';

export const formConfig: FormStep[] = [
  {
    id: 'intro',
    component: IntroScreen,
    title: 'Mentor do seu Plano',
    nextStepLogic: () => 'diagnosis'
  },
  {
    id: 'diagnosis',
    component: DiagnosisQuestions,
    title: 'Diagnóstico',
    nextStepLogic: () => 'result',
    prevStepId: 'intro'
  },
  {
    id: 'result',
    component: DiagnosisResult,
    title: 'Resultado',
    nextStepLogic: () => 'plan',
    prevStepId: 'diagnosis'
  },
  {
    id: 'plan',
    component: ActionPlan,
    title: 'Plano de Ação',
    nextStepLogic: () => null,
    prevStepId: 'result'
  }
];

export const findStepById = (id: string): FormStep | undefined => {
  return formConfig.find(step => step.id === id);
};

export const findStepIndexById = (id: string): number => {
  return formConfig.findIndex(step => step.id === id);
};

export const getFirstStep = (): FormStep => {
  return formConfig[0];
};
