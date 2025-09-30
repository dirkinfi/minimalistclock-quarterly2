Learning Clock

A simple web application that displays an analog station-style clock designed to help children learn to tell time. The clock has a minimalist black-and-white design with numbers 1–12 and tick marks at every 5 minutes.

Features
	•	Quarter-hour rounding: The clock always rounds the current time to the nearest quarter hour:
	•	Minutes 53–07 → :00
	•	Minutes 08–22 → :15
	•	Minutes 23–37 → :30
	•	Minutes 38–52 → :45
	•	Analog display: Hour and minute hands update based on the rounded time.
	•	Debug panel: Shows both the actual system time and the rounded time.
	•	Manual input: Allows entering a custom time for testing, with option to reset to system time.
	•	Responsive design: The clock automatically scales to fill nearly the entire screen, from very small to very large viewports.

Files
	•	index.html – Main HTML structure
	•	style.css – Styling for the clock and debug panel
	•	app.js – Logic for time rounding, updating, and input handling

Usage

Open index.html in a browser. The clock will render and update every second. Use the debug panel to test with manual time input.

⸻

This clock has been generated using AIStudio and ChatGPT5.
