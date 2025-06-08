export const formatPhoneNumber = (
  phoneNumber: string,
  countryCode?: string
): string => {
  if (phoneNumber.startsWith("+")) {
    return phoneNumber;
  } else if (countryCode) {
    return `${countryCode}${phoneNumber}`;
  }
  return phoneNumber;
};
