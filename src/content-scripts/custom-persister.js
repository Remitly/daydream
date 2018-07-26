import Persister from "@pollyjs/persister";

export class DaydreamPollyPersister extends Persister {
  static get name() {
    return "DaydreamRecordPersister";
  }

  findRecording(recordingId) {
    return null;
  }

  saveRecording(recordingId, data) {
    chrome.runtime.sendMessage("fbdkcimbgmagndmffloohnmilekglfaf", {
      messageType: "saveHar",
      data: {
        id: recordingId,
        har: data,
      },
    });
  }

  deleteRecording(recordingId) {
    throw new Error(
      "Daydream shouldn't need to delete a recording",
      recordingId,
    );
  }
}
