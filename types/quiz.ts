// types/question.ts
export type Option = {
    id: string
    optionText: string
    optionOrder: number
    isCorrect: boolean
}

export type Question = {
    id: string
    title: string
    questionText: string
    codeSnippet: string
    language: string
    difficultyLevel: number
    explanation: string
    options: Option[]
}

export type Confidence = 1 | 2 | null;