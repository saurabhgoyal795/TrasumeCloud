import * as functions from "firebase-functions";
import {runTime, region, db, GeoPoint} from "./admin/admin";
import {v4 as uuidv4} from 'uuid'

export const testFunction = functions.region(region).runWith(runTime).https.onCall(
	async (data, context) => {
		let result: any = {}
		return result;
    }
)

export const getScenicPoint = functions.region(region).runWith(runTime).https.onCall(
	async (data, context) => {
		try{
			const latitude = data.latitude
			const longitude = data.longitude
			const distance = data.distance
			return {'success': await getScenicRoutesNearBy(latitude, longitude, distance)}
		}catch(error){
			return {'error':error.message}
		}
	}
)


export const saveScenicPoint = functions.region(region).runWith(runTime).https.onCall(
	async (data, context) => {
		try{
			data['approved'] = false
            const uuid = await uuidv4()
			data['id'] = uuid
			await db.collection('scenic_spots').doc().set(data, {merge:true})
			return {'status':'success'}
		}catch(error){
			console.error(error)
			return {'status':'failed'}
		}
	}
)

export const  getScenicRoutesNearBy = async function(latitude, longitude, distance) {
	const r_earth = 6378137;  // Radius of earth in Meters
	const kLat = (2 * 3.14/360)  * r_earth
	const kLon = (2 * 3.14/360)  * r_earth * Math.cos(latitude/180.0) * 3.14
	const deltaLat = distance / kLat
	const deltaLon = distance / kLon
	const swGeopoint = new GeoPoint(latitude - deltaLat, longitude - deltaLon)
	const neGeopoint = new GeoPoint(latitude + deltaLat, longitude + deltaLon)
	console.log('swGeopoint', swGeopoint)
	console.log('neGeopoint', neGeopoint)
	const snapshot = await db.collection('scenic_spots').where('location','>', swGeopoint).where('location', '<', neGeopoint).where('approved', '==', true).orderBy('location', 'asc').limit(5).get()
	
	return await Promise.all(snapshot.docs.map(async (doc) => {
		return doc.data()
	}))
}