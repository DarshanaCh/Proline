import * as dotenv from 'dotenv'
export{};
declare global{
    namespace NodeJS{
        interface ProcessEnv{
            BROWSER :"chrome" | "firefox" | "webkit",
            ENV : "int08" | "int07" | "test",
            BASEURL : string,
            HEAD :"true" | "false"
        }
    }
} 