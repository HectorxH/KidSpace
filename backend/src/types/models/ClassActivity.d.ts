/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
import { Schema, Types } from 'mongoose';
interface IQuiz {
    question: String;
    answers: Types.Array<String>;
    correct_answer: Number;
}
interface IClassActivity {
    title: String;
    description: String;
    intro_story: {
        title: String;
        description: String;
    };
    intro_challenge: {
        title: String;
        description: String;
    };
    interactive_story: {
        title: String;
        description: String;
    };
    creative_challenge: {
        title: String;
        description: String;
    };
    quiz: Types.Array<IQuiz>;
}
export declare const classActivitySchema: Schema<IClassActivity, import("mongoose").Model<IClassActivity, any, any, any>, {}, {}, any>;
declare const _default: import("mongoose").Model<IClassActivity, {}, {}, {}>;
export default _default;
//# sourceMappingURL=ClassActivity.d.ts.map