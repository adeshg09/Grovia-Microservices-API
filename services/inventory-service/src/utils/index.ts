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

export const getDistanceInKm = (
  coords1: [number, number],
  coords2: [number, number]
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
