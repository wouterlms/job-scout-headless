import BaseProvider from './BaseProvider';
import { Settings } from '../../types/settings';

export default class Jobat extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://www.jobat.be/nl/jobs/search/{keyword}?l={location}&kmfrom={radius}&fromzipcode={zipcode}',
			elements: {
				job: ".jobCard",
				title: ".jobCard-title>a",
				company: ".jobCard-company>a",
				location: ".jobCard-location",
				salary: "",
				link: ".jobCard-title>a",
			}
		}, settings);
	}
}