import mongoose,{Schema,Document} from "mongoose";

export interface ITeacher extends Document{
    user:mongoose.Types.ObjectId;
    subject:string;
    qualification:string;
    experience:number;
}

const teacherSchema=new Schema<ITeacher>({
    user:{type:Schema.Types.ObjectId,ref:"User",required:true},
    subject:{type:String,required:true},
    qualification:{type:String,required:true},
    experience:{type:Number,required:true},

},
{timestamps:true}

);
export default mongoose.model<ITeacher>("Teacher",teacherSchema);