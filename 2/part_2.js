import fs from 'fs';

fs.readFile('input.txt', 'utf8', (_err, data) => {
  const lines = data.split('\n');

  let safeReports = 0;

  for (const line of lines) {
    if (line === '') continue;
    const report = line.trim().split(/\s+/).map(Number);
    // Create variations of report [1,2,3] ==> [[2,3], [1,3], [1,2]]
    const reportVariations = createVariations(report)
    // If any of the variations is safe...
    if(reportVariations.some(variation => isReportSafe(variation))) safeReports++;
  }

  console.log(`Safe reports: ${safeReports}`);
});

const isReportSafe = (report) => {
  let isAscending = false;
  for (let index = 0; index < report.length; index++) {
    const firstCheck = index === 0;
    const current = report[index];
    const next = report[index + 1];
    if (next) {
      const diff = next - current;
      if (Math.abs(diff) > 3 || diff === 0) return false; // Difference is too big, or same element
      if (!firstCheck && isAscending && diff < 0) return false; // Ascending - Descending switch
      if (!firstCheck && !isAscending && diff > 0) return false; // Ascending - Descending switch
      if (firstCheck && diff > 0) isAscending = true; // Identify order
    }
  }
  return true;
};

const createVariations = (report) => {
  const variations = report.map((_, index) => 
    report.filter((_, i) => i !== index) // Filter out the element at the current index
  );
  return variations;
};