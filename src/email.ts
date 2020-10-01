require('dotenv').config();
const nodemailer = require('nodemailer');
import { Job } from './types/job';

class Email {

	transporter: any;

	constructor() {
		this.init();
	}

	private init(): void {
		this.transporter = nodemailer.createTransport(
			{
				service: 'gmail',
				auth: {
					user: process.env.USER,
					pass: process.env.PASS,
				}
			}
		);
	}

	private send(subject: string, html: string): void {
		const mail = {
			from: this.transporter.options.auth.user,
			to: process.env.MAIL_TO,
			subject,
			html
		};

		this.transporter.sendMail(mail, (err: any) => {
			if (err) {
				console.log(err);
			}
		});
	}

	public sendJobs(jobs: Job[]): void {
		let html = '';

		jobs.forEach(job => {
			html += `
				<article style="padding: 1rem; background: rgb(250, 250, 250); border-radius: 8px; margin-bottom: 2rem;">
					<h1><a style="color: #847bff; text-decoration: none;" href="${job.link}" target="_blank">${job.title} at ${job.company}</a></h1>
					<p style="color: rgb(43,42,52);"><span style="font-weight: bold;">Location</span>: ${job.location}</p>
					<p style="color: rgb(43,42,52);"><span style="font-weight: bold;">Salary</span>: ${job.salary}.</p>
				</article>
			`;
		});

		this.send(`Found ${jobs.length} new job${jobs.length === 1 ? '' : 's'}!`, html);
	}
}

export default new Email();