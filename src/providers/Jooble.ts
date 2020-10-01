import BaseProvider from './BaseProvider';
import { Settings } from '../types/settings';

export default class Jooble extends BaseProvider {

	constructor(settings: Settings) {
		super({
			templateUrl: 'https://be.jooble.org/vacatures-{keyword}/{location}',
			elements: {
				job: '.result ',
				title: '.link-position',
				company: '.company-name',
				location: '.serp_location__region',
				salary: '.salary',
				link: '.link-position',
			},
		}, settings);
	}
}