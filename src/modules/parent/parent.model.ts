import mongoose,{Schema,Document } from "mongoose";

export interface IParent extends Document{
    user:mongoose.Types.ObjectId;
    children:mongoose.Types.ObjectId;
    occupation:string;
    contactNumber: string;
  address: string;
}

const parentSchema=new Schema<IParent>({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    children:{type:Schema.Types.ObjectId,ref:'Student',required:true},
    occupation:{type:String,required:true},
    contactNumber:{type:String,required:true},
    address:{type:String,required:true},
},
{timestamps:true}

);
export default mongoose.model<IParent>("Parent",parentSchema)