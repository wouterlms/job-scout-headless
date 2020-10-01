import BaseProvider from './BaseProvider';
import { Settings } from '../types/settings';

export default class Indeed extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://be.indeed.com/jobs?q={keyword}&l={location}&radius={radius}',
			elements: {
				job: '.jobsearch-SerpJobCard',
				title: '.jobtitle',
				company: '.company',
				location: '.location',
				salary: '.salary',
				link: '.jobtitle',
			},
		}, settings);
	}
}