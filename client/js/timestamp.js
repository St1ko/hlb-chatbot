function appendTimestamp(index, HorB) {
  function timeStamp() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes().toString();
    if (m.length < 2) {
      m = '0' + m;
    }
    const time = h + ':' + m;
    return time;
  }

  let timestamp = document.createElement('p');
  timestamp.innerHTML = timeStamp();
  timestamp.classList.add('timestamp');
  if (HorB == true) {
    timestamp.classList.add('human');
  } else if (HorB == false) {
    timestamp.classList.add('bot');
  } else {
    // auto defaults to bot styling
  }

  document
    .getElementsByClassName('botui-message')
    [index].appendChild(timestamp);
}
