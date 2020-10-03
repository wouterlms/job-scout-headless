import BaseProvider from './BaseProvider';
import { Settings } from '../../types/settings';

export default class StepStone extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://www.stepstone.be/5/resultaten-jobs-werk-zoeken.html?stf=freeText&ns=1&qs=%5B%5D&companyID=0&cityID=0&sourceOfTheSearchField=resultlistpage%3Ageneral&searchOrigin=Resultlist_top-search&ke={keyword}&ws={location}&ra={radius}',
			elements: {
				job: '.container article',
				title: 'a h2',
				company: 'div:nth-of-type(2)>div:nth-of-type(3)',
				location: '.job-element__body__location',
				salary: '',
				link: 'a',
			},
		}, settings);
	}
}