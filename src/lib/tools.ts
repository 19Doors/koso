import {z} from 'zod';
import {tool} from '@langchain/core/tools';
const datetimeSchema= z.object({
})

export const currentDateTimeTool = tool(
  () => {
    var currentDate = new Date();
    var dt = currentDate.getDate();
    var mth = currentDate.getMonth();
    var yr = currentDate.getFullYear();
    var hr = currentDate.getHours();
    var mn = currentDate.getMinutes();
    var rt = `${dt}/${mth}/${yr}. Time: ${hr}/${mn}`;
    console.log(rt);
    return rt;
  },
  {
    name: "current_date_time",
    description: "Tells the current date and time.",
    schema: datetimeSchema
  }
);
