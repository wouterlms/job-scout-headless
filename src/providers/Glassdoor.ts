import BaseProvider from './BaseProvider';
import { Settings } from '../types/settings';

export default class Glassdoor extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://nl.glassdoor.be/Vacature/{location}-{keyword}-vacatures-SRCH_IL.0,14_IC4992715_KO15,28.htm?radius={radius}',
			elements: {
				job: '.react-job-listing',
				title: '.jobTitle',
				company: '.jobLink',
				location: '.loc',
				salary: '',
				link: '.jobLink',
			},
		}, settings);
	}
}