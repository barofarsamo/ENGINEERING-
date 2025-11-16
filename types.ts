// FIX: Import React types to resolve 'Cannot find namespace React' error.
import type * as React from 'react';

// FIX: Export ContentSection to allow its use as a type in other files.
export interface ContentSection {
    title: string;
    content: string;
}

export interface StructuredContent {
    whatIsIt: ContentSection;
    whyIsItImportant: ContentSection;
    mainParts: ContentSection;
    howItWorks: ContentSection;
    prerequisites: ContentSection;
    examples: ContentSection;
    challenges: ContentSection;
}

export interface AdditionalContent {
    history?: ContentSection;
    principles?: ContentSection;
    skills?: ContentSection;
    comparison?: ContentSection;
}

export interface Lesson {
  id: string;
  title: string;
  imageUrl: string;
  structuredContent: StructuredContent;
  additionalContent: AdditionalContent;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
  labId?: string;
}

export interface Module {
  id:string;
  title: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

export interface Discipline {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  levels: Level[];
  labs?: Lab[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SearchResult {
  discipline: Discipline;
  level: Level;
  module: Module;
  lesson: Lesson;
}

export type DownloadStatus = 'not-downloaded' | 'downloading' | 'downloaded';


// --- VIRTUAL LAB TYPES ---

export interface LabDataTable {
  headers: string[];
  rows: (string | number)[][]; // For sample data
}

export type LabCategory = 'Concrete' | 'Soil' | 'Surveying' | 'Structural' | 'Hydraulics';

export interface LabInputField {
  id: string;
  label: string;
  unit: string;
  defaultValue: string;
  type: 'number' | 'text';
}

export interface LabCalculation {
  formula: string;
  description: string;
}

export interface LabStudentQuestion {
    question: string;
    answer: string;
}

export interface Lab {
  id: string;
  title: string;
  category: LabCategory;
  objective: string;
  equipment: string[];
  theory: string;
  procedure: string[];
  inputData: {
    fields: LabInputField[];
    sampleTable: LabDataTable;
  };
  calculations: LabCalculation[];
  exampleCalculation: string;
  interpretation: string;
  studentQuestions: LabStudentQuestion[];
  reportTemplate: string;
  graph?: {
    title: string;
    xAxis: string;
    yAxis: string;
  };
}