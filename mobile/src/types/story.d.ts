export interface IPagina {
  character: string;
  characterPosition: CharacterPosition;
  mood: string;
  bubble: string;
  bubblePosition: string;
  message: string;
  messagePosition: string;
  messageExtra: string;
  messageBubble: string;
  messageAnswers: [string, string, string] | 'none';
  rightAnswer: string;
  background: string;
}

export type Story = IPagina[];

export type CharacterPosition = 'left' | 'right';
