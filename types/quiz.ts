// types/question.ts
export type Option = {
    optionId: number
    optionText: string
    optionOrder: number
    correct: boolean
}

export type Question = {
    questionId: string
    title: string
    questionText: string
    codeSnippet: string
    language: string
    difficultyLevel: number
    explanation: string
    options: Option[]
}

export type Confidence = 1 | 2 | null;