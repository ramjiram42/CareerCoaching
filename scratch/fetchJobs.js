const fs = require('fs');

async function fetchJobs() {
  try {
    const res = await fetch('https://fa-evlf-saasfaprod1.fa.ocs.oraclecloud.com/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=all&finder=findReqs;siteNumber=CX_1,limit=100');
    const data = await res.json();
    
    const reqs = data.items[0].requisitionList;
    
    const formattedJobs = reqs.map(job => {
      // Determine type based on title or schedule
      let type = "Full Time";
      if (job.Title.toLowerCase().includes('part time')) type = "Part Time";
      if (job.Title.toLowerCase().includes('contract')) type = "Contract";
      
      // Basic category deduction
      let category = "Service";
      if (job.Title.toLowerCase().includes('sales')) category = "Sales";
      else if (job.Title.toLowerCase().includes('manager')) category = "Management";
      else if (job.Title.toLowerCase().includes('driver')) category = "Logistics";
      else if (job.Title.toLowerCase().includes('customer')) category = "Customer Service";
      
      return {
        id: job.Id,
        title: job.Title,
        category: category,
        location: job.PrimaryLocation,
        date: job.PostedDate,
        type: type,
        salary: "Competitive",
        applyUrl: `https://jobs.hertzcareers.com/#en/sites/CX_1/job/${job.Id}`
      };
    });
    
    fs.writeFileSync('public/data/jobs.json', JSON.stringify(formattedJobs, null, 2));
    console.log(`Successfully wrote ${formattedJobs.length} jobs to public/data/jobs.json`);
  } catch (err) {
    console.error(err);
  }
}

fetchJobs();
