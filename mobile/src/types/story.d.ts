export interface IPagina {
  character: string;
  characterPosition: string;
  mood: string;
  bubble: string;
  bubblePosition: string;
  message: string;
  messagePosition: string;
  messageExtra: string;
  messageBubble: string;
  messageAnswers: string;
  rightAnswer: string;
  background: string;
}

export type Story = IPagina[];
