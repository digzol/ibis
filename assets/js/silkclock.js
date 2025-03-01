let startTime = 0;

$(function () {
    const timerStart = GetURLParameter('t');
    setFormTime(timerStart);
    formTick();
});

$("#btn-start").click(function () {
    $("#carouselClockStages").carousel(1);

    const now = Date.now();
    let newURL = location.pathname + "?p=silkclock&t=" + now;
    history.pushState({start: now}, '', newURL);

    setFormTime(now);
});

window.onpopstate = function (e) {
    if (e.state !== null) {
        setFormTime(e.state.start);
    }
};

function setFormTime(time) {
    startTime = time;
    const now = Date.now();
    const diff = now - startTime;

    switch (true) {
        case (diff < 28800000):
            $("#carouselClockStages").carousel(1);
            break;
    }
}

function formTick() {
    if (startTime === 0) return;

    const $nextStage = $("#timer-nextstage");
    const now = Date.now();
    const diff = now - startTime;

    switch (true) {
        case (diff <= 28800000):
            const stageEnd = new Date(28800000 - diff);
            $nextStage.html(formatDate(stageEnd, "HH:mm:ss"));
            break;
        default:
            $nextStage.html("00:00:00");
    }

    setTimeout(formTick, 1000);
}

function formatDate(date) {
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    const second = date.getUTCSeconds().toString().padStart(2, '0');

    return hour + ":" + minute + ":" + second
}
