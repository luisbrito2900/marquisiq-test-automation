# MarquisIQ Playwright Test Suite

End-to-end test automation project for MarquisIQ using Playwright with Page Object Model (POM) and Mochawesome reporting.

## 📋 Prerequisites

Before running the tests, make sure you have installed:

- **Node.js >= 20.10.0** (required for `pwmochawesome`)

  - Check version: `node --version`
  - If you don't have Node 20+, you can install it with:
    - **Homebrew (macOS)**: `brew install node@20`
    - **nvm**: `nvm install 20` and `nvm use 20`
    - **Direct download**: [Node.js Official Website](https://nodejs.org/)

- **npm** (included with Node.js)

## 🚀 Installation

1. Clone the repository (if applicable):

   ```bash
   git clone <repository-url>
   cd marquisiq-test-automation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your credentials and any required test data variables. Refer to `.env.example` for the required variables.

## 🧪 Running Tests

### Run all tests:

```bash
npm test
```

### Run tests in headed mode (visible browser):

```bash
npm run test:headed
```

### View reports:

**Mochawesome Report:**

```bash
npm run report:mochawesome
```

Or open manually: `mochawesome-report/mochawesome.html`

**Playwright HTML Report:**

```bash
npx playwright show-report
```

## 📁 Project Structure

```
poc-marquisIQ-playwright/
├── pages/                 # Page Object Models (POM)
│   ├── BasePage.js        # Base class with common methods
│   ├── LoginPage.js       # Login page
│   ├── HomePage.js        # Home page
│   └── EnrichPage.js      # Enrich search page
├── tests/                 # Playwright tests
│   └── searchByMCN.spec.js
├── utils/                 # Utilities and helpers
│   ├── constants.js       # Constants and configuration
│   └── screenshotHelper.js
├── .env                   # Environment variables (do not commit to Git)
├── .env.example          # Environment variables template
├── playwright.config.js   # Playwright configuration
└── package.json
```

## 🏗️ Architecture

The project uses **Page Object Model (POM)** to keep the code organized and maintainable:

- **BasePage**: Base class with common functionality for all Page Objects
- **LoginPage**: Handles the entire authentication flow
- **HomePage**: Manages the home page and navigation
- **EnrichPage**: Contains search and filtering logic

## 📊 Reports

The project generates two types of reports:

1. **Mochawesome Report**: HTML report with charts and detailed statistics

   - Location: `mochawesome-report/mochawesome.html`
   - Includes: Charts, statistics, screenshots, test code

2. **Playwright HTML Report**: Native Playwright report
   - Location: `playwright-report/index.html`
   - Includes: Traces, screenshots, execution timeline

## 🔒 Security

- The `.env` file contains sensitive credentials and **should NOT be committed to Git**
- The `.env.example` file is the public template without credentials
- Make sure `.env` is in `.gitignore`

## 🛠️ Technologies Used

- **Playwright**: Test automation framework
- **pwmochawesome**: Reporter to generate Mochawesome-style reports
- **dotenv**: Environment variables management
- **Node.js 20+**: JavaScript runtime

## 📝 Notes

- Tests are configured to run on Chromium by default
- Timeouts are configured in `utils/constants.js`
- Screenshots are automatically attached to reports

## 🤝 Contributing

1. Create a branch for your feature
2. Make the necessary changes
3. Ensure tests pass: `npm test`
4. Create a Pull Request

## 📄 License

ISC
