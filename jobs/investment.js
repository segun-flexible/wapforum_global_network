const { calculatePercentage } = require("../helpers/calculation");
const { completeAllUserInvestmentHistory } = require("../helpers/history");
const { getAllInvestmentRecords, editInvestmentRecordsById, deleteInvestmentRecordsById, getUserInvestmentRecords } = require("../helpers/investment");
const { jobCreditUsers, creditRoiBalance } = require("../helpers/mics");
const db = require("../models/db");
const CronJob = require('cron').CronJob;

//This Job Running Every 12 oclock
new CronJob('0 0 * * *', async function () {
    
    const investment = await getAllInvestmentRecords();
   
    await investment.forEach(async inv => {
        
        //Check If 1 Days Left
  
        if (inv.r_duration === 1) {

            //Credit ROI and Capital
            jobCreditUsers(inv,true);
            
            completeAllUserInvestmentHistory(inv.r_history_id)
            //Delete Record
            deleteInvestmentRecordsById(inv.r_id);

        } else {
            
            //Credit ROI Only
            jobCreditUsers(inv, false);
           
            //Deduct Duration
            editInvestmentRecordsById(inv.r_id, { r_duration: inv.r_duration - 1 });
            
        }
        
    });
}, null, true, "Africa/Lagos");

/* new CronJob('* * * * *', async function () {
    
    const inv = await getUserInvestmentRecords(15);
   console.log(inv)
    
    if (inv.r_duration === 1) {

            //Credit ROI and Capital
            await jobCreditUsers(inv,true);
            
            await completeAllUserInvestmentHistory(inv.r_history_id)
            //Delete Record
            await deleteInvestmentRecordsById(inv.r_id);

        } else {
            
            //Credit ROI Only
            await jobCreditUsers(inv, false);
           
            //Deduct Duration
            await editInvestmentRecordsById(inv.r_id, { r_duration: inv.r_duration - 1 });
            
    }
    
}, null, true, "Africa/Lagos"); */

