# ExoVision AI 🚀

### Charting New Worlds Beyond Our Solar System for the NASA Space Apps Challenge 2025

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)](https://tailwindcss.com/)

---

**ExoVision** is an innovative web platform designed to accelerate the discovery of exoplanets. By leveraging a powerful heuristic-based analysis model, this prototype provides a user-centric interface for astronomers, researchers, and space enthusiasts to analyze telescope light curve data and identify potential planetary candidates in seconds, not months.

### [➡️ View the Live Demo Here](https://your-deployment-link.com)

*(Replace `https://your-deployment-link.com` with your actual live URL)*

![ExoVision Prototype Screenshot](https://i.imgur.com/gKk2g7I.png) 
*(**Action:** Replace this with a real screenshot of your prototype's results page)*

## The Cosmic Challenge 🌌

Space telescopes like Kepler and TESS have generated petabytes of data from hundreds of thousands of stars. Hidden within this data are faint, periodic dips in starlight caused by distant planets transiting their stars. Manually identifying these signals is a monumental task, akin to finding a needle in a cosmic haystack. The sheer volume of data and the subtlety of the signals create a significant bottleneck in the search for new worlds.

**ExoVision tackles this challenge head-on** by providing a rapid, accessible, and intelligent tool to automate the initial stages of exoplanet detection.

## Key Features ✨

* **Interactive Data Upload:** A seamless drag-and-drop interface for users to upload their own light curve data (`.csv`, `.txt`).
* **Baseline Heuristic Model:** A custom-built analysis engine that intelligently scans data for transit-like events based on depth, duration, and periodicity.
* **Advanced Data Visualization:** An interactive charting tool to view the full light curve, with detected transits highlighted.
* **Folded Light Curve:** Automatically generates a "folded" light curve, a standard astronomical visualization that overlays all detected transits to create a clear, combined signal profile.
* **Instantaneous Results:** Get key metrics like estimated orbital period, transit depth, and a model confidence score in seconds.
* **Immersive UI/UX:** A stunning, space-themed interface built with Shadcn/UI and Tailwind CSS that makes the process of discovery engaging and intuitive.

## AI Model and Technical Workflow

Our prototype implements a custom-built **heuristic model** in TypeScript to perform a robust baseline analysis. This model is designed to be fast, efficient, and run directly in the browser, providing immediate feedback.

#### Model Workflow:
1.  **Ingest & Clean:** Parses and validates uploaded time-series flux data.
2.  **Event Detection:** Scans the data for significant dips in stellar flux that fall below a predefined transit threshold.
3.  **Noise Filtering:** Filters events based on duration, discarding anomalies that are too short (e.g., cosmic ray hits) or too long (e.g., stellar variability) to be a planetary transit.
4.  **Periodicity Analysis:** For valid transit candidates, the model calculates the time between events to identify a consistent orbital period.
5.  **Score & Classify:** A confidence score is generated based on the number of valid transits and the consistency of their periodicity.

This model serves as a crucial performance benchmark and validates our end-to-end data processing pipeline. Our architecture is modular, allowing this heuristic model to be seamlessly swapped with a more advanced deep learning model in future development.

![Architecture Diagram](https://i.imgur.com/gKk2g7I.png) 
*(**Action:** You can keep this diagram as is, it's perfect)*

## Technology Stack 🛠️

* **Front-End:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
* **UI Framework:** [shadcn/ui](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Charting:** [Recharts](https://recharts.org/)
* **Deployment:** Vercel / Netlify / Firebase Hosting

## Getting Started Locally

To run this project on your local machine, follow these steps:

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/exovision-cosmic-ai.git](https://github.com/your-username/exovision-cosmic-ai.git)

# 2. Navigate to the project directory
cd exovision-cosmic-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
