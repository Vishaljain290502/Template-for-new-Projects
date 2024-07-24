import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
class locationDocument{
    type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
    }
    coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
    }
}

@Schema()
export class UserDocument{

    @Prop()
    name:String;

    @Prop()
    dob:Date;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    token: string;

    @Prop()
    mobileNumber: string;

    @Prop({ default: false })
    isPhoneVerified: boolean;

    @Prop({ default: false })
    isEmailVerified: boolean;
  
    @Prop()
    resetTokenExpiration: Date;

    @Prop()
    otp: string;

    @Prop()
    address: string;

    @Prop({
        type:locationDocument
    })
    location: {
        type: string;
        coordinates: [number, number];
    };
}

export type User = HydratedDocument<UserDocument>;

export const userSchema = SchemaFactory.createForClass(UserDocument);