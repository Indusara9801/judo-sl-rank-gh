export const inputActions = {
  INPUT: "INPUT",
  BLUR: "BLUR",
  RESET: "RESET",
};

export const statusConst = {
  NONE: "NONE",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export const loadingStateConst = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULLFILLED: "FULLFILLED",
  ERROR: "ERROR",
};

export const accountTypes = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const searchItems = {
  REQUEST: "REQUEST",
  PLAYER: "PLAYER",
};

export const apiErrors = new Map();
apiErrors.set(
  "auth/wrong-password",
  "The pasword username or password is incorret."
);
apiErrors.set(
  "auth/user-not-found",
  "The pasword username or password is incorret."
);

export const genderList = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const provinceList = [
  "Western",
  "Southern",
  "Eastern",
  "Northern",
  "North_Western",
  "North_Central",
  "Central",
  "Sabaragamuwa",
  "Uva",
];

export const judoGradeList = [
  "White",
  "Yellow",
  "Orange",
  "Green",
  "Blue",
  "Brown",
  "Black",
];

export const maleWeightClassList = [
  { label: "-60kg", value: 60 },
  { label: "-66kg", value: 66 },
  { label: "-73kg", value: 73 },
  { label: "-81kg", value: 81 },
  { label: "-90kg", value: 90 },
  { label: "-100kg", value: 100 },
  { label: "+100kg", value: 101 },
];

export const maleWeightMap = new Map();

maleWeightMap.set(60, "-60kg");
maleWeightMap.set(66, "-66kg");
maleWeightMap.set(73, "-73kg");
maleWeightMap.set(81, "-81kg");
maleWeightMap.set(90, "-90kg");
maleWeightMap.set(100, "-100kg");
maleWeightMap.set(101, "+100kg");

export const femaleWeightClassList = [
  { label: "-48kg", value: 48 },
  { label: "-52kg", value: 52 },
  { label: "-57kg", value: 57 },
  { label: "-63kg", value: 63 },
  { label: "-70kg", value: 70 },
  { label: "-78kg", value: 78 },
  { label: "+78kg", value: 79 },
];

export const femaleWeightMap = new Map();

femaleWeightMap.set(48, "-48kg");
femaleWeightMap.set(52, "-52kg");
femaleWeightMap.set(57, "-57kg");
femaleWeightMap.set(63, "-63kg");
femaleWeightMap.set(70, "-70kg");
femaleWeightMap.set(78, "-78kg");
femaleWeightMap.set(79, "+78kg");

export const colors = ["WHITE", "BLUE"];

export const yearsStored = {
  2023: "tounaments_2023",
  2022: "tounaments_2022",
  2021: "tounaments_2021",
  2020: "tounaments_2020",
};

export const errorTypes = {
  NO_PAYMENT: "NO_PAYMENT",
  EXPIRED: "Token Expired",
  SUCCESS: "SUCCESS",
  INVALID_DISPLAY_NAME: "INVALID_DISPLAY_NAME",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_FULL_NAME: "INVALID_FULL_NAME",
  INVALID_GENDER: "INVALID_GENDER",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_DOB: "INVALID_DOB",
  INVALID_CLUB_NAME: "INVALID_CLUB_NAME",
  INVALID_JUDO_GRADE: "INVALID_JUDO_GRADE",
  INVALID_WEIGHT_CLASS: "INVALID_WEIGHT_CLASS",
  INVALID_PROVINCE: "INVALID_PROVINCE",
  DUPLICATE_EMAIL: "DUPLICATE_EMAIL",
};

export const localStorageKeys = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TYPE: "type",
};

export const userTypes = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const environments = {
  DEV: "DEV",
  PROD: "PROD",
};

export const tournamentListTypes = {
  ALL: "ALL",
  PLAYER: "PLAYER",
};

export const env = environments.PROD;

export const url = env === environments.DEV ? "http://localhost:8080" : "/api";
