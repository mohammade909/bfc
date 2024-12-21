const { updateROIIncomeForUsers } = require('./CornJobController');
const { calculateCommissionForAllUsers } = require('./refferalController');
const { reward } = require('./rewardController');

const callAllFunctionsSequentially = async (req, res) => {
  try {
    // Call the first function
    console.log("Calling updateROIIncomeForUsers...");
    await updateROIIncomeForUsers();
    console.log("First function complete.");

    // Wait for 5 seconds before calling the second function
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Call the second function
    console.log("Calling calculateCommissionForAllUsers...");
    await calculateCommissionForAllUsers();
    console.log("Second function complete.");

    // Wait for another 5 seconds before calling the third function
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Call the third function
    // console.log("Calling reward...");
    // await reward();
    // console.log("Third function complete.");

    // Send the response after all functions are complete
    res.status(200).json({ message: "All functions executed successfully." });
  } catch (error) {
    console.error("Error in calling functions sequentially:", error);
    res.status(500).json({ message: "Error in executing functions.", error });
  }
};

module.exports = { callAllFunctionsSequentially };
