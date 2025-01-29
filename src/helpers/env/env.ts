import * as dotenv from 'dotenv'

export const getEnv = () => {
    if (process.env.ENV) {
        dotenv.config({
            override: true,
          path: "src/helpers/env/.env.int08",
               
       
          // path:`src/helpers/env/.env.${process.env.ENV}`
        })
      
    } else {
        console.error("NO ENV PASSED!")
    
    //console.log(`src/helpers/env/.env.${process.env.ENV}`); /
    }    
}