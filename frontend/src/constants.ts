import {CocktailApi, User} from "./type";

export const API_URL = "http://localhost:8000";

export const GOOGLE_CLIENT_ID = '124781030028-5fsodp4ei2pv787f6ueni6v4gr0r1dp1.apps.googleusercontent.com';

export const CHECKING_PUBLICATIONS = (array: CocktailApi[]) => {
  let checkResult = false;
  array.forEach((item) => {
    if (item.isPublished) {
      checkResult = true;
    }
  });

  return checkResult;
};

export const PERMISSIONS_CHECK = (user: User | null, isPublished: boolean) => {
  let permissionsCheck = false;

  if (user?.role === "admin") {
    permissionsCheck = true;
  } else if (user?.role !== "admin" && isPublished) {
    permissionsCheck = true;
  }

  return permissionsCheck;
};