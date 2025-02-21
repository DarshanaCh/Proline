
import{BeforeAll,AfterAll, Before, After,Status} from "@cucumber/cucumber"
import { chromium, Page, Browser, BrowserContext } from "playwright/test";
import { invokeBrowser } from "../browsers/browserManager";
import { getEnv } from "../env/env";
import { createLogger, loggers } from "winston";
import { options } from "../util/logger";
import { pageFixure } from "./pageFiture";


let browser: Browser;
let page: Page;
let context: BrowserContext;
BeforeAll(async () => {
  //browser = await chromium.launch({ headless: false }); //browser will launce before all the actions

    getEnv();
    browser = await  invokeBrowser(); 
});
Before(async ({pickle}) => {
  const scenarioName = pickle.name + pickle.id
  context = await browser.newContext({
    permissions: ['geolocation'], // Automatically grant geolocation permission
        recordVideo: {
          dir: "test-results/videos",
        },
  }); //context like tab of the browser

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true, snapshots: true
});
;

page = await context.newPage();
await context.setGeolocation({ latitude: 51.2538, longitude: 85.3232 });// this is passing ontario ip

  pageFixure.page = page;
  pageFixure.logger= createLogger(options(scenarioName))
});
Before("@auth",async ({pickle}) => {
  const scenarioName = pickle.name + pickle.id
  context = await browser.newContext({
        storageState: getStorageState(pickle.name),
        recordVideo: {
          dir: "test-results/videos",
        },
  }); //context like tab of the browser

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true, snapshots: true
});
  page = await context.newPage();
  pageFixure.page = page;
  pageFixure.logger= createLogger(options(scenarioName))
});
import * as fs from 'fs';
import * as path from 'path';

After(async function ({ pickle, result }) {
  let videoPath: string | undefined;
  let img: Buffer | undefined;
  const tracePath = path.resolve(`./test-results/trace/${pickle.id}.zip`);
  
  try {
    if (result?.status === Status.PASSED) {
      // Capture screenshot
      img = await pageFixure.page.screenshot({
        path: "./screenshots/${pickle.name}.png", // Corrected screenshot path to be relative to reports dir
        type: "png"
      });

      // Get video path
      videoPath = await pageFixure.page.video()?.path();
      console.log("video",videoPath)
    }

    // Stop tracing
    await context.tracing.stop({ path: tracePath });
  } catch (error) {
    console.error("Error during test cleanup:", error);
  } finally {
    // Cleanup resources
     await pageFixure.page.close();
     await context.close();
  }

  // Attachments for reporting
  try {
    if (result?.status === Status.PASSED) {
      if (img) {
        await this.attach(img, "image/png");
        //console.log("screenshot attached",img)
      }
      if (videoPath && fs.existsSync(videoPath)) {
        await this.attach(fs.readFileSync(videoPath), 'video/webm');
        //console.log("videos attached",videoPath)
      }

      const traceFileLink = `<a href="../trace/${pickle.id}.zip">Open Trace File</a>`; // Corrected trace link path - go up one level again
      await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    }
  } catch (error) {
    console.error("Error during report attachments:", error);
  }
});

AfterAll(async () => {
  await browser.close();
 // await pageFixure.logger.close();
});
function getStorageState(user: string): string | { cookies: Array<{ name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }>; origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string; }>; }>; } | undefined {
  if (user.endsWith("admin"))
    return "src/helpers/auth/admin.json";
else if (user.endsWith("lead"))
    return "src/helpers/auth/lead.json";
}





//#########################################################################
// import { Before, After ,AfterAll, BeforeAll} from '@cucumber/cucumber';
// import { chromium, Page, Browser, expect, BrowserContext } from "@playwright/test";
// import { loginPage } from '../../test/pages/loginPage';


// let browser: Browser;
// let page: Page;
// let LoginPage: loginPage;
// //let BetplacePage: betplacePage;

//  Before({timeout: 10000},async function() {
//     browser = await chromium.launch({ headless: false });
//     const context: BrowserContext = await browser.newContext({
//       permissions: ['geolocation'], // Automatically grant geolocation permission
//     });
  
//     page = await context.newPage();
//     await context.setGeolocation({ latitude: 51.2538, longitude: 85.3232 });
//     await page.goto("https://int08.sports.ferrara.ca/en-ca");
//   });


//  After({ timeout: 50000 },async function() {
//   if (this.page) {
//     await this.page.close();  // Close the current page
// }
//  if (this.browser) {
//      await this.browser.close();  // Close the browser instance
// }
//  });


// export{page}
