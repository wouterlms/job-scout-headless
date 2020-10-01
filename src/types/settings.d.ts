export interface Settings {
	location: string;
	zipcode: number;
	radius: number;
	keywords: string[];
	mustContain: string[];
	mustNotContain: string[];
}