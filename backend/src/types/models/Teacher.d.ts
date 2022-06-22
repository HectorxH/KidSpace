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
export interface ITeacher {
    names: String;
    last_names: String;
    mail: String;
    password: String;
    favorites: Types.Array<Types.ObjectId>;
    classes: Types.Array<Types.ObjectId>;
    planned: [];
}
export declare const teacherSchema: Schema<ITeacher, import("mongoose").Model<ITeacher, any, any, any>, {}, {}, any>;
declare const _default: import("mongoose").Model<ITeacher, {}, {}, {}>;
export default _default;
//# sourceMappingURL=Teacher.d.ts.map