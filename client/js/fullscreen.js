const button = document.getElementById('button2');

button.onclick = function() {
  const div = document.getElementById('hlbot');

  if (div.classList.contains('fullscreen')) {
    div.classList.remove('fullscreen');
    document.getElementById("button2").innerHTML = fullscreen;
  } else {
    div.classList.add('fullscreen');
    document.getElementById("button2").innerHTML = fullscreen_exit;
  }
};
