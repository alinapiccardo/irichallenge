# ICT at IRI Challenge

# IRI Data Entry Challenge

Welcome to the IRI Data Entry Challenge! This React application simulates a simple data entry system for recording student progress. Below, you'll find information about the project structure, functionalities, and usage.

## Table of Contents

- [Project Structure](#project-structure)
- [Functionalities](#functionalities)
- [Usage](#usage)
- [Data Simulation](#data-simulation)

## Project Structure

The project consists of a React application with the following structure:

- `App.js`: The main component containing the logic and UI for user authentication and data entry.
- `App.module.css`: The stylesheet for styling the components.
- `assets`: Directory containing images used in the application.

## Functionalities

1. **User Authentication:**

   - Users are required to provide valid credentials (email and password) to access the data entry functionality.
   - The application simulates authentication against a predefined set of user credentials stored in `airTable1`.

2. **Data Entry:**

   - After successful authentication, users can input student data, including student name, hours spent, and progress description.
   - The entered data is stored in a simulated data table (`airTable2`).

3. **Logout:**
   - Users can log out to return to the authentication screen.

## Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/alinapiccardo/irichallenge.git
   cd challenge
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   ```bash
   npm start
   ```

4. **Access the Application:**
   Open your web browser and navigate to `http://localhost:3000`.

## Data Simulation

- **AirTable1:**

  - Simulates user credentials for authentication.

- **AirTable2:**
  - Simulates a data table for storing student progress entries.
