import mongoose, { Document, Schema } from 'mongoose';
import { UUID } from 'mongodb';



interface IAPRequest {
    apId: string;
    warriorId: string
    status: string;
    missionId: UUID;
    expectationFromAp: string;
}

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IAPRequestModel extends IAPRequest, Document { }

//DEFINE Mission SCHEMA
const APRequestSchema: Schema = new Schema(
    {
        apId: {
            type: String,
            default: ''
        },
        warriorId: {
            type: String,
            default: ''
        },

        status: {
            type: String,
            default: "pending"
        },
        missionId: {
            type: UUID,
            default: "",
        },
        expectationFromAp: {
            type: String,
            default: ''
        }

    }
);

//EXPORT
export default mongoose.model<IAPRequest>('APRequest', APRequestSchema);