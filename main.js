const fs = require("fs");
const csv = require("csvtojson");

function writeFile(data) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync("./data.json")) {
      fs.unlinkSync("./data.json");
    }
    fs.writeFile("./data.json", JSON.stringify(data), error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function parseCSVToJSON(file) {
  return new Promise((resolve, reject) => {
    const parsedCSV = csv().fromFile(file);
    if (!file || !parsedCSV) {
      reject(new Error("An error has occurred while attempting to parse the CSV file."));
    }
    resolve(parsedCSV);
  });
}

async function main() {
  if (process.argv.length < 3) {
    console.log("Please enter a path to a csv file.");
    process.exit(1);
  }
  try {
    const file = process.argv[2];
    const data = await parseCSVToJSON(file);
    await writeFile(data);
    console.log("CSV data was converted to JSON and written to data.json.");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();
