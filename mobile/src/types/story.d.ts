export interface IPagina {
  background: string;
  items: [{name: string; start: number[]; end: number[]}] | [];
  bubbles: [{name: string; start: number[]; end: number[]}] | [];
  textBoxes: [{start: number[]; end: number[]}] | [];
  texts: [{text: string; start: number[]; end: number[]}] | [];
  questions:
    | [
        {
          tipo: string;
          rightChoice: string;
          choices: [];
          rightAnswer: [string];
          answers: [{text: string; start: number[]; end: number[]}];
        },
      ]
    | [];

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
}

export type Story = IPagina[];

export type CharacterPosition = 'left' | 'right';
