const progressbar = (function() {
  const ProgressContainer = document.getElementById('progressContainerInner');
  const ProgressFill = document.getElementById('progressBarFill');
  const ProgressText = document.getElementById('progressText');
  const NumOfQuestions = testQuestions.length;

  const _ProgressFill = function(currentQuestionNumber, NumOfQuestions) {
    ProgressFill.style.width =
      ((currentQuestionNumber + 1) / NumOfQuestions) * 100 + '%';
  };

  const _ProgressText = function(currentQuestionNumber, NumOfQuestions) {
    ProgressText.innerHTML = currentQuestionNumber + 1 + '/' + NumOfQuestions;
  };

  const ProgressInit = function() {
    _ProgressFill(-1, NumOfQuestions);
    _ProgressText(-1, NumOfQuestions);
  };

  const ProgressVisible = function(state) {
    ProgressContainer.style.opacity = state ? '1' : '0';
  };

  const UpdateProgress = function(currentQuestionNumber) {
    _ProgressFill(currentQuestionNumber, NumOfQuestions);
    _ProgressText(currentQuestionNumber, NumOfQuestions);
  };

  return {
    ProgressInit: ProgressInit,
    UpdateProgress: UpdateProgress,
    ProgressVisible: ProgressVisible
  };
})();
