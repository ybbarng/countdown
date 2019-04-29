function countDown() {
  const [endDate, messageView] = arguments;
  const endTime = endDate.getTime();

  runMessageUpdater();

  function runMessageUpdater() {
    stopMessageUpdater();

    this.messageUpdater = setInterval(updateMessage, 1000);
    updateMessage();
  }

  function stopMessageUpdater() {
    if (this.messageUpdater) {
      clearInterval(this.messageUpdater);
    }
  }

  function updateMessage() {
    const now = new Date().getTime();
    const remains = Math.floor((endDate - now) / 1000);
    const message = (remains >= 0) ? getTimeMessage(remains) : '군필!!';
    writeMessage(message);

    if (remains < 0) {
      stopMessageUpdater();
    }
  }

  function getTimeMessage(seconds) {
    return [
      Math.floor(seconds / (24 * 60 * 60)) + '일',
      Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)) + '시간',
      Math.floor((seconds % (60 * 60)) / 60) + '분',
      Math.floor(seconds % 60) + '초'
    ].join(' ');
  }

  function writeMessage(message) {
    messageView.innerHTML = message;
  }
}
