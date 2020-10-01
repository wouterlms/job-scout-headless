const axios = require("axios");
const cheerio = require("cheerio");

import utils from '../utils';
import { Settings } from './../types/settings.d';
import { Job } from './../types/job.d';

export default class BaseProvider {

	params: any;
	settings: Settings;

	constructor(params: any, settings: Settings) {
		this.params = params;
		this.settings = settings;
	}

	private constructUrl(keyword: string): string {
		return utils.createStringFromTemplate(this.params.templateUrl, {
			keyword,
			location: this.settings.location,
			radius: this.settings.radius,
			zipcode: this.settings.zipcode,
		});
	}

	private async scrape(url: string): Promise<any> {
		try {
			const res = await axios.get(url);
			return cheerio.load(res.data);
		} catch (error) {
			return null;
		}
	}

	private filterJobsFromHTML(html: any): Job[] {

		const jobs: Job[] = [];
		
		html(this.params.elements.job).each((i, el) => {

			const data: any = {
				title: 'N/A',
				company: 'N/A',
				location: 'N/A',
				salary: 'N/A',
			};

			Object.keys(data).forEach((key: string) => {

				const elementTag: string = this.params.elements[key];

				data[key] = utils.cleanString(
					html(el)
						.find(elementTag)
						.text()
				);
			});
			
			let link = html(el).find(this.params.elements.link).attr('href');

			// create public link if interal link
			if (!link.includes("http")) {
                const baseUrl = this.params.templateUrl.split("/");

                if (link.charAt(0) !== '/') {
                    link = `/${link}`;
                }

                link = `https://${baseUrl[2]}${link}`;
			}

			// Remove title from company (glassdoor)
			data.company.replace(data.title, '');
			
			jobs.push({ ...data, link });
		});

		return jobs;
	}

	private isValidTitle(title: string): boolean {
		let containsGoodWord: boolean = false;
		let containsBadWord: boolean = false;

		this.settings.mustContain.forEach((word: string) => {
			if (title.toLowerCase().includes(word.toLowerCase())) {
				containsGoodWord = true;
			}
		});

		this.settings.mustNotContain.forEach((word: string) => {
			if (title.toLowerCase().includes(word.toLowerCase())) {
				containsBadWord = true;
			}
		});

		return containsGoodWord && !containsBadWord;
	}

	public getJobs(): Promise<Job[]> {
		return new Promise(async (resolve) => {
			const promises: Promise<any>[] = [];
			
			// loop trough keywords and create fetch request
			this.settings.keywords.forEach((keyword: string) => {
				promises.push(
					this.scrape(this.constructUrl(utils.replaceSpacesByDashes(keyword)))
				);
			});
			
			// html pages
			const results: any[] = await Promise.all(promises);
			let jobs: Job[] = [];

			results.forEach(result => {
				jobs = [...jobs, ...this.filterJobsFromHTML(result).filter((job: Job) => this.isValidTitle(job.title))];
			});

			resolve(jobs);
		});
	}
}