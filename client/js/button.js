const button = document.getElementById('button');

button.onclick = function() {
  const div = document.getElementById('hlbot');

  if (div.classList.contains('minimized')) {
    div.classList.remove('minimized');
  } else {
    div.classList.add('minimized');
  }
};
