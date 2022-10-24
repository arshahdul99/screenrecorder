function ShowMenu(){
    document.getElementById('main-menu').style.display="none";
    document.getElementById('close-menu').style.display="flex";
    document.getElementById('close-menu').style.opacity="1";
    document.getElementById('main-sub').style.opacity="1";
    document.getElementById('main-sub').style.display="flex";
}
function HideMenu(){
    document.getElementById('main-menu').style.display="flex";
    document.getElementById('main-menu').style.opacity="1";
    document.getElementById('close-menu').style.display="none";
    document.getElementById('close-menu').style.opacity="0";
    document.getElementById('main-sub').style.opacity="0";
    document.getElementById('main-sub').style.display="none";
}

//Fuctions For recorder:
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});