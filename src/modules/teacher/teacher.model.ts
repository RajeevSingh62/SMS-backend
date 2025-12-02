import mongoose,{Schema,Document} from "mongoose";

export interface ITeacher extends Document{
    user:mongoose.Types.ObjectId;
    subject:string;
    qualification:string;
    experience:number;
}

const teacherSchema=new Schema<ITeacher>({
    
})