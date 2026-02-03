import { FormStep, FormData } from './types/form';
import IntroScreen from './components/IntroScreen';
import DiagnosisQuestion1 from './components/DiagnosisQuestion1';
import DiagnosisQuestion2 from './components/DiagnosisQuestion2';
import DiagnosisQuestion3 from './components/DiagnosisQuestion3';
import DiagnosisResult from './components/DiagnosisResult';
import ActionPlan from './components/ActionPlan';

export const formConfig: FormStep[] = [
  {
    id: 'intro',
    component: IntroScreen,
    title: 'Mentor do seu novo Plano',
    nextStepLogic: () => 'question1',
    questionNumber: 1
  },
  {
    id: 'question1',
    component: DiagnosisQuestion1,
    title: 'Diagnóstico - Pergunta 1',
    nextStepLogic: () => 'question2',
    prevStepId: 'intro',
    questionNumber: 1
  },
  {
    id: 'question2',
    component: DiagnosisQuestion2,
    title: 'Diagnóstico - Pergunta 2',
    nextStepLogic: () => 'question3',
    prevStepId: 'question1',
    questionNumber: 2
  },
  {
    id: 'question3',
    component: DiagnosisQuestion3,
    title: 'Diagnóstico - Pergunta 3',
    nextStepLogic: () => 'result',
    prevStepId: 'question2',
    questionNumber: 3
  },
  {
    id: 'result',
    component: DiagnosisResult,
    title: 'Resultado',
    nextStepLogic: () => 'plan',
    prevStepId: 'question3'
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
