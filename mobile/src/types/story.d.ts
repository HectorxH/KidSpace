export interface IPagina {
  items: [{name: string; start: Int32Array; end: Int32Array}] | 'none';
  bubbles: [{name: string; start: Int32Array; end: Int32Array}] | 'none';
  textBoxes: [{start: Int32Array; end: Int32Array}] | 'none';
  texts: [{text: string; start: Int32Array; end: Int32Array}] | 'none';
  questions:
    | [
        {
          rightAnswer: string;
          answers: [{text: string; start: Int32Array; end: Int32Array}];
        },
      ]
    | 'none';

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
