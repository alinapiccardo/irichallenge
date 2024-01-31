import React, { useState } from "react";
import styles from "./App.module.css";

const App = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [studentName, setStudentName] = useState("");
	const [hoursSpent, setHoursSpent] = useState("");
	const [progressDescription, setProgressDescription] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [showOk, setShowOk] = useState(false);

	//Simulation of AirTable1 data
	const airTable1 = [
		{ email: "admin", password: "admin" },
		{ email: "user1@iri.com", password: "password1" },
		{ email: "user2@iri.com", password: "password2" },
		{ email: "user3@iri.com", password: "password3" },
		{ email: "user4@iri.com", password: "password4" },
		{ email: "user4@iri.com", password: "password4" },
		{ email: "user5@iri.com", password: "password5" },
		{ email: "user6@iri.com", password: "password6" },
		{ email: "user7@iri.com", password: "password7" },
		{ email: "user8@iri.com", password: "password8" },
	];

	//Simulation of AirTable2 data
	const airTable2 = [];

	const authenticateUser = (event) => {
		event.preventDefault();
		const isValidCredentials = airTable1.some(
			(entry) => entry.email === userEmail && entry.password === userPassword
		);
		if (isValidCredentials) {
			setSubmitted(true);
			setUserEmail("");
			setUserPassword("");
		} else {
			alert("Invalid credentials. Please try again.");
			setUserEmail("");
			setUserPassword("");
		}
	};

	const dataEntryProcess = (event) => {
		event.preventDefault();
		if (studentName === "" || hoursSpent === "" || progressDescription === "") {
			alert("Please fill out all fields.");
			return;
		}
		airTable2.push({ studentName, hoursSpent, progressDescription });
		setSubmitted(false);
		setShowOk(true);
		setTimeout(() => {
			resetForm();
		}, 2000);
	};

	const resetForm = () => {
		setStudentName("");
		setHoursSpent("");
		setProgressDescription("");
		setShowOk(false);
	};

	const logOut = () => {
		setSubmitted(false);
		resetForm();
	};

	return (
		<div className={styles.App}>
			<div className={styles.homePage}>
				<div className={styles.titleHome}>
					<img
						src={process.env.PUBLIC_URL + "/assets/image001.jpg"}
						alt="IRI Logo"
					/>
					<h1>IRI Data Entry</h1>
				</div>
				{!submitted ? (
					<form onSubmit={authenticateUser}>
						<div className={styles.formContainer}>
							<label>Email:</label>
							<input
								type="text"
								value={userEmail}
								onChange={(event) => setUserEmail(event.target.value)}
							/>
						</div>
						<div className={styles.formContainer}>
							<label>Password:</label>
							<input
								type="password"
								value={userPassword}
								onChange={(event) => setUserPassword(event.target.value)}
							/>
						</div>
						<button type="submit">Submit Credentials</button>
					</form>
				) : (
					<form onSubmit={dataEntryProcess}>
						<div className={styles.formContainer}>
							<label className={styles.label}>Student Name:</label>
							<input
								type="text"
								value={studentName}
								onChange={(event) => setStudentName(event.target.value)}
							/>
						</div>
						<div className={styles.formContainer}>
							<label className={styles.label}>Hours Spent:</label>
							<input
								type="number"
								value={hoursSpent}
								onChange={(event) => setHoursSpent(event.target.value)}
							/>
						</div>
						<div className={styles.formContainer}>
							<label className={styles.label}>Progress Description:</label>
							<textarea
								type="text"
								value={progressDescription}
								onChange={(event) => setProgressDescription(event.target.value)}
							/>
						</div>
						<button type="submit">Submit Data</button>
						<button type="button" onClick={logOut}>
							Log Out
						</button>
					</form>
				)}
				{showOk && (
					<div className={styles.modal}>
						<div className={styles.modalContent}>
							<h3>Thank You for Your Submission!</h3>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
