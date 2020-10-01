import { Job } from '../types/job';
const fs = require('fs');

class Cache {

	FILE_PATH: string = './jobs.txt';
	jobs: Job[] = [];

	public init(): Promise<void> {
		return new Promise(async (resolve) => {
			this.jobs = await this.fetchFileContent();

			resolve();
		});
	}

	private fetchFileContent(): Promise<Job[]> {
		return new Promise(async (resolve) => {
			if (fs.existsSync(this.FILE_PATH)) {
				const content: string = await fs.readFileSync(this.FILE_PATH, 'utf-8');
				const jobs: Job[] = JSON.parse(content);
	
				return resolve(jobs);
			}
	
			resolve([]);
		});
	}

	private updateFile(): void {
		fs.writeFileSync(this.FILE_PATH, JSON.stringify(this.jobs));
	}

	public exists(job: Job): boolean {
		return !!this.jobs.find(_job => _job.title === job.title && _job.company === job.company);
	}

	public add(jobs: Job[]): void {
		this.jobs = [...this.jobs, ...jobs];
		this.updateFile();
	}
}

export default new Cache();