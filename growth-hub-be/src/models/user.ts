import mongoose, { Document, Schema } from 'mongoose';

interface IUser {
    userId: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    educationHistory: string;
    apOfMissions: Array<string>;
    interests: Array<string>;
    careerHistory: string;
    profilePicture: string;
    apActive: boolean;
}

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IUserModel extends IUser, Document {}

//DEFINE MENTOR SCHEMA
const UserSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        age: {
            type: Number,
            default: 0,
        },
        gender: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: '',
        },
        educationHistory: {            
            type: String,
            default: ''
        },
        careerHistory: {
            type: String,
            default: ''
        },
        apOfMissions:{
            type: Array,
            default: []
        },
        interests: {
            type: Array,
            default: [],
        },
        profilePicture: {
            type: String,
            default: ''
        },
        apActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

//EXPORT
export default mongoose.model<IUserModel>('User', UserSchema);