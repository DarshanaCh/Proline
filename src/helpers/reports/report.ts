const report = require("multiple-cucumber-html-reporter");

const jsonDir = "test-results";
const reportPath = "test-results/reports";

console.log("JSON Directory:", jsonDir);
console.log("Report Path:", reportPath);

try {
    report.generate({
        jsonDir: jsonDir,
        reportPath: reportPath,
        reportName: "Playwright Automation Report",
        pageTitle: "Proline Test report",
        displayDuration: false,
        metadata: {
            browser: {
                name: "chrome",
                version: "131",
            },
            device: "GitHub Actions", // Updated device info for workflow
            platform: {
                name: "Linux", // Assuming GitHub Actions runner is Linux
                version: "latest",
            },
        },
        customData: {
            title: "Test Info",
            data: [
                { label: "Project", value: "Book cart" },
                { label: "Release", value: "1.2.3" },
                { label: "Cycle", value: "Smoke-1" }
            ],
        },
    });
    console.log("HTML report generated successfully!");
} catch (error) {
    console.error("Error generating HTML report:", error);
}
