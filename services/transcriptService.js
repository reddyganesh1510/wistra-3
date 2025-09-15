export const getTranscriptFromJson = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array of participants");
  }

  // Collect all texts from all participants
  return data
    .map((participant) => participant.words.map((w) => w.text).join(" "))
    .join(" "); // If multiple participants
};


