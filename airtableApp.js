const readline = require("readline");
const AIRTABLE_API_TOKEN =
	"patzmIofTQtbYNncV.a1bfc9dda10d746195197f6ab15eec9fc93a6f2944b49aea7955c533133cd782";

var Airtable = require("airtable");
Airtable.configure({
	endpointUrl: "https://api.airtable.com",
	apiKey: AIRTABLE_API_TOKEN,
});
var base = Airtable.base("applHr9mdT6ZMFwZP");

async function checkCredentials(email, password) {
	try {
		const records = await base("Users")
			.select({
				filterByFormula: `AND({Email} = '${email}', {Password} = '${password}')`,
			})
			.firstPage();

		if (records.length > 0) {
			return records[0];
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error checking credentials:", error.message);
		throw error;
	}
}

async function submitFormData(studentName, hours, progress) {
	try {
		const record = await base("StudentProgress").create({
			Name: studentName,
			Hours: parseInt(hours),
			Progress: progress,
		});

		return record;
	} catch (error) {
		console.error("Error submitting form data:", error.message);
		throw error;
	}
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function main() {
	try {
		rl.question("Enter your email: ", async (email) => {
			rl.question("Enter your password: ", async (password) => {
				try {
					const userRecord = await checkCredentials(email, password);

					if (userRecord) {
						console.log("Authentication successful.");

						rl.question("Enter student's name: ", async (studentName) => {
							rl.question("Enter hours spent: ", async (hours) => {
								rl.question(
									"Enter progress description: ",
									async (progress) => {
										try {
											const submissionResult = await submitFormData(
												studentName,
												hours,
												progress,
												userRecord.id
											);

											console.log(
												"Form submission successful:",
												submissionResult
											);
										} catch (submissionError) {
											console.error(
												"Error submitting form data:",
												submissionError.message
											);
										} finally {
											rl.close();
										}
									}
								);
							});
						});
					} else {
						console.log("Invalid credentials. Exiting gracefully.");
						rl.close();
					}
				} catch (authError) {
					console.error(
						"An error occurred during authentication:",
						authError.message
					);
					rl.close();
				}
			});
		});
	} catch (error) {
		console.error("An unexpected error occurred:", error.message);
		rl.close();
	}
}

main();
