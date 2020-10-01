import { Job } from './types/job.d';
import { Settings } from './types/settings.d';

import cache from './cache';
import CreativeSkills from './providers/CreativeSkills';
import Glassdoor from './providers/Glassdoor';
import Indeed from './providers/Indeed';
import Jobat from './providers/Jobat';
import Jooble from './providers/Jooble';
import utils from './utils';
import email from './email';

const settings: Settings = {
	location: "Dilsen-Stokkem",
	zipcode: 3650,
    radius: 50,
    keywords: [
        "web developer",
        "front end developer",
        "full stack developer",
    ],
    mustContain: [
		"web",
		"front",
		"full-stack",
		"dev",
		"back",
		"vuejs",
		"vue.js",
		"javascript",
	],
    mustNotContain: [
        "senior",
        ".net",
        "stage",
        "intern",
        "php",
        "drupal",
        "laravel",
        "c#",
        "engineer",
        "stagiair",
        "dotnet",
        "ios",
        "android",
        "business",
        "product",
    ],
};

const indeed: Indeed = new Indeed(settings);
const jooble: Jooble = new Jooble(settings);
const glassdoor: Glassdoor = new Glassdoor(settings);
const creativeSkills: CreativeSkills = new CreativeSkills(settings);
const jobat: Jobat = new Jobat(settings);

const providers = [indeed, jooble, glassdoor, creativeSkills, jobat];

const getJobs = async () => {
	let jobs: Job[] = [];

	const results = await Promise.all(providers.map(provider => provider.getJobs()));

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
};

cache.init().then(() => {
	console.log('Cache initialized');
	
	setInterval(() => {
		getJobs();
	}, utils.minutes(1));

	getJobs();
});