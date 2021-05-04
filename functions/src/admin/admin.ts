import * as admin from 'firebase-admin';
import { RuntimeOptions } from 'firebase-functions';
admin.initializeApp();
export const db = admin.firestore();
export const auth = admin.auth();
export const runTime: RuntimeOptions = { timeoutSeconds: 60, memory: '128MB' };
export const runTime2: RuntimeOptions = { timeoutSeconds: 120, memory: '128MB' };
export const runTime7: RuntimeOptions = { timeoutSeconds: 180, memory: '128MB' };
export const runTime3: RuntimeOptions = { timeoutSeconds: 540, memory: '1GB' };
export const runTime4: RuntimeOptions = { timeoutSeconds: 540, memory: '2GB' };
export const runTime5: RuntimeOptions = { timeoutSeconds: 60, memory: '512MB' };
export const runTime6: RuntimeOptions = { timeoutSeconds: 60, memory: '256MB' };
export const regionMumbai = 'asia-south1';
export const FieldValue = admin.firestore.FieldValue;
export const timeStamp = admin.firestore.Timestamp;
export const GeoPoint = admin.firestore.GeoPoint
export const region = 'us-central1';
