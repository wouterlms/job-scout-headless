import BaseProvider from './BaseProvider';
import { Settings } from '../types/settings';

export default class CreativeSkills extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://www.creativeskills.be/?lang=nl',
			elements: {
				job: '.cs_jobs_premium',
				title: '.cs_job_title',
				company: '.cs_job_company .nobr:nth-of-type(1)>span',
				location: '.cs_job_company .nobr:nth-of-type(2)>span',
				salary: '',
				link: '.cs_jobs_fulltitle>a',
			},
		}, settings);
	}
}