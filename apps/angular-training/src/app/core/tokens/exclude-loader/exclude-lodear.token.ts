import { HttpContextToken } from "@angular/common/http";

export const EXCLUDE_LOADER = new HttpContextToken<boolean>(() => false);
