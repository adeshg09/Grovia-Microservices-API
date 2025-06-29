export interface VerifyManualPlanDto {
  panNumber: string;
  nameAsPerPan: string;
  dob: string;
}

export interface addBankDetailsDto {
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId?: string;
  };
}
