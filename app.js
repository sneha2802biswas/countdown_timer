

window.onload = () => {
    document.querySelector('#set').onclick = setTimer;
    document.querySelector('#reset').onclick = resetTimer;

    const savedEndTime = getCookie('endtime');
    if (savedEndTime) {
        const endTime = new Date(savedEndTime);
        if (endTime > new Date()) {
            startCountdown(endTime);
        } else {
            setCookie('endtime', '', -1); 
        }
    }
};

let countdownInterval;

function setTimer() {
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    if (!date || !time) {
        alert("Please enter both date and time.");
        return;
    }

    const endTime = new Date(`${date}T${time}`);
    if (isNaN(endTime.getTime())) {
        alert("Invalid date or time.");
        return;
    }

    setCookie('endtime', endTime.toISOString(), 1); 
    startCountdown(endTime);
}

function startCountdown(endTime) {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => updateCountdown(endTime), 1000);
}

function updateCountdown(endTime) {
    const now = new Date();
    const timeLeft = (endTime - now) / 1000;

    const days = document.querySelector('#countdays');
    const hours = document.querySelector('#counthours');
    const mins = document.querySelector('#countmins');
    const secs = document.querySelector('#countsecs');

    if (timeLeft > 0) {
        days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
        mins.innerText = Math.floor((timeLeft / 60) % 60);
        secs.innerText = Math.floor(timeLeft % 60);
    } else {
        clearInterval(countdownInterval);
        days.innerText = 0;
        hours.innerText = 0;
        mins.innerText = 0;
        secs.innerText = 0;
        setCookie('endtime', '', -1);
    }
}

function resetTimer() {
    clearInterval(countdownInterval);
    document.querySelector('#countdays').innerText = 0;
    document.querySelector('#counthours').innerText = 0;
    document.querySelector('#countmins').innerText = 0;
    document.querySelector('#countsecs').innerText = 0;
    setCookie('endtime', '', -1); 
}


function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
