/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  options?: string[];
  inputType?: 'single' | 'multiple' | 'text';
}

export interface UserProfile {
  topic?: string;
  ageRange?: string;
  situation?: string;
  goal?: string;
  timeline?: string;
  familiarity?: string;
  timeAvailable?: string;
  format?: string;
  budget?: string;
  language?: string;
  constraints?: string;
}

export interface RoadmapPhase {
  name: string;
  duration: string;
  topics: string[];
  resources: {
    name: string;
    type: string;
    link?: string;
    description: string;
  }[];
  project: string;
}

export interface Roadmap {
  summary: string;
  phases: RoadmapPhase[];
  deepDives: string[];
  firstWeekActionPlan: string[];
  progressCheckpoints: string[];
  disclaimers: string[];
}

export interface NextStepResponse {
  message: string;
  options?: string[];
  inputType: 'single' | 'multiple' | 'text';
  profileUpdate?: Partial<UserProfile>;
  isComplete: boolean;
}
