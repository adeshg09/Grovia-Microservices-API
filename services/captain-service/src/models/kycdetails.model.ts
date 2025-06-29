import { Schema, model, Document } from "mongoose";

export interface IKycDetails extends Document {
  captainId: Schema.Types.ObjectId;

  aadhaarUrl?: string;
  aadhaarVerified?: boolean;

  panUrl?: string;
  panVerified?: boolean;

  drivingLicenseUrl?: string;
  licenseVerified?: boolean;

  addressProofUrl?: string;
  manualAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  addressVerified?: boolean;

  selfieUrl?: string;
  selfieVerified?: boolean;

  bankDetails?: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId?: string;
  };
  bankDetailsVerified?: boolean;

  verifiedBy?: Schema.Types.ObjectId;

  verificationRemarks?: string;
  rejectedFields?: string[];

  submittedAt?: Date;
}

const KycDetailsSchema = new Schema<IKycDetails>(
  {
    captainId: {
      type: Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
      unique: true,
    },

    aadhaarUrl: { type: String },
    aadhaarVerified: { type: Boolean, default: false },

    panUrl: { type: String },
    panVerified: { type: Boolean, default: false },

    drivingLicenseUrl: { type: String },
    licenseVerified: { type: Boolean, default: false },

    addressProofUrl: { type: String },
    manualAddress: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
    },
    addressVerified: { type: Boolean, default: false },

    selfieUrl: { type: String },
    selfieVerified: { type: Boolean, default: false },

    bankDetails: {
      accountHolderName: { type: String },
      bankName: { type: String },
      accountNumber: { type: String },
      ifscCode: { type: String },
      upiId: { type: String },
    },
    bankDetailsVerified: { type: Boolean, default: false },

    verifiedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    verificationRemarks: { type: String },
    rejectedFields: [{ type: String }],
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

export const KycDetails = model<IKycDetails>("KycDetails", KycDetailsSchema);
