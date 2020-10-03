import CreativeSkills from "./scraper/providers/CreativeSkills";
import Glassdoor from "./scraper/providers/Glassdoor";
import Indeed from "./scraper/providers/Indeed";
import Jobat from "./scraper/providers/Jobat";
import Jooble from "./scraper/providers/Jooble";
import StepStone from "./scraper/providers/StepStone";
import Scraper from './scraper';
import { Settings } from "./types/settings";

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
const stepStone: StepStone = new StepStone(settings);

const providers = [indeed, jooble, glassdoor, creativeSkills, jobat, stepStone];

new Scraper(providers, settings);