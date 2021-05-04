import * as functions from "firebase-functions";
import {runTime, region} from "./admin/admin";

export const testFunction = functions.region(region).runWith(runTime).https.onCall(
	async (data, context) => {
		let result: any = {}
		return result;	
	})
