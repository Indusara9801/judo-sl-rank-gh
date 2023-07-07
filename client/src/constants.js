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
  "-60kg",
  "-66kg",
  "-73kg",
  "-81kg",
  "-90kg",
  "-100kg",
  "+100kg",
];

export const femaleWeightClassList = [
  "-48kg",
  "-52kg",
  "-57kg",
  "-63kg",
  "-70kg",
  "-78kg",
  "+78kg",
];


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
  INVALID_PROVINCE: "INVALID_PROVINCE"
}

export const localStorageKeys = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  TYPE: "type"
}

export const userTypes = {
  USER: "USER",
  ADMIN: "ADMIN"
}

export const environments = {
  DEV: "DEV",
  PROD: "PROD"
}

export const tournamentListTypes = {
  ALL: "ALL",
  PLAYER: "PLAYER"
}

export const env = environments.PROD;

export const url = env === environments.DEV ? 'http://localhost:8080' : '/api'



