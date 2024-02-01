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

	const authenticateUser = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/authenticate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: userEmail,
					password: userPassword,
				}),
			});
			console.log(response);
			if (response.ok) {
				setSubmitted(true);
				setUserEmail("");
				setUserPassword("");
			} else {
				alert("Invalid credentials. Please try again.");
				setUserEmail("");
				setUserPassword("");
			}
		} catch (error) {
			console.error("An error occurred during authentication:", error.message);
		}
	};

	const dataEntryProcess = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					studentName,
					hoursSpent,
					progressDescription,
				}),
			});

			if (response.ok) {
				setSubmitted(false);
				setShowOk(true);
				setTimeout(() => {
					resetForm();
				}, 2000);
			} else {
				console.error("Form submission failed:", response.statusText);
			}
		} catch (error) {
			console.error("An error occurred during form submission:", error.message);
		}
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
