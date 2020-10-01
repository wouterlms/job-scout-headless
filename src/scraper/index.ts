import cache from './cache';
import utils from './utils';
import email from './email';

import { Job } from '../types/job';
import { Settings } from '../types/settings';

export default class Scraper {
    providers: any[];
	settings: Settings;
	interval: ReturnType<typeof setInterval>;

    constructor(providers, settings: Settings) {
        this.providers = providers;
		this.settings = settings;
		
		cache.init().then(() => {
			console.log('Cache initialized');

			this.interval = setInterval(() => {
				this.getJobs();
			}, utils.minutes(10));

			this.getJobs();
		});
	}

	public destroy(): void {
		clearInterval(this.interval);
	}
	
	public async getJobs(): Promise<void> {
		let jobs: Job[] = [];

		const results = await Promise.all(this.providers.map(provider => provider.getJobs()));

		results.forEach((result) => {
			jobs = [...jobs, ...result];
		});

		const newJobs = 
			// remove duplicates
			[...new Map(jobs.map(item => [item['title'], item])).values()]
			// remove cached jobs
			.filter(job => !cache.exists(job));

		cache.add(newJobs);

		if (newJobs.length) {
			email.sendJobs(newJobs);
		}

		console.log(`Found ${jobs.length} jobs, ${newJobs.length} are new.`);
	}
}