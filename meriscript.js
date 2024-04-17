// Function to split a line by delimiter (tab in this case)
function splitLine(line, delimiter = "\t") {
  return line.split(delimiter);
}

// Function to read a TSV file asynchronously
async function readTSVFile(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error fetching file: ${response.statusText}`);
    }
    const data = await response.text();
    const lines = data.split("\n");
    const result = [];
    for (const line of lines) {
      if (line.trim() === "") continue; // Skip empty lines
      result.push(splitLine(line));
    }
    return result;
  } catch (error) {
    console.error("Error reading TSV file:", error);
    return null;
  }
}

// Example usage
const filePath = "data.tsv";

readTSVFile(filePath)
  .then((data) => {
    function processTSVData(data) {
      if (!data) {
        console.error("Error: Data is not available");
        return;
      }

      // Loop through each row (sub-array) in the data
      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex]; // Get the current row

        // Loop through each element (cell) within the current row
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const cellValue = data[rowIndex][colIndex]; // Access the cell value
          console.log(
            `Data in column ${colIndex + 1} of row ${rowIndex + 1}:`,
            cellValue
          );
          // Process the data as needed (e.g., calculations, further manipulation)
        }
      }
    }

    // Example usage (assuming 'data' is a 2D array containing your TSV data)
    processTSVData(data);
  })
  .catch((error) => {
    console.error("Error processing data:", error);
  });
