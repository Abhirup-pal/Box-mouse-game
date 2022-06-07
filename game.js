let counter = 0, time;
let duration;
let box = document.getElementById('boxx');
box.style.display = 'none';
box.addEventListener('mouseover', function () {
    counter++;
    box.innerHTML = "NOICE!";
})
box.addEventListener('mouseleave', function () {
    counter++;
    box.innerHTML = "NOT NOICE :(";
})
let besttime = localStorage.getItem('best_score');
if (besttime != null) {
    document.getElementById('highest_score').innerHTML = "HIGHEST SCORE : " + Number(besttime) + "<br>"
}
let lines_array = document.getElementsByClassName('line_style');

function display(s) {
    let id_element = s;
    String(id_element);
    let ind = id_element[4];
    ind = Number(ind);
    let color1 = "radial-gradient(yellow,coral)";
    let color2 = "radial-gradient(coral,yellow)";
    if (ind != 9) {
        ind += 1;
        let nextline = "line" + String(ind);
        document.getElementById(nextline).style.display = 'block';
        if (ind % 2 == 1)
            document.getElementById('main_container').style.background = color1;
        else
            document.getElementById('main_container').style.background = color2;

    }
}

document.getElementById('start').addEventListener('click', function () {
    counter = 0;
    let val = (document.getElementById('duration').value);
    if (val == "")
        alert('Please enter the duration to proceed');
    val = Number(val);
    if (val >= 5 && val <= 120) {
        document.getElementById('clock').style.display = "block";
        duration = val;
        document.getElementById('boxx').style.display = 'flex';
        document.getElementById('main_container').style.display = 'none';
        const time_interval = setInterval(() => {
            duration--;
            document.getElementById('clock').innerHTML = "REMAINING TIME : " + duration + " s";
            if (duration <= 0) {
                let best_score = localStorage.getItem('best_score');
                counter = counter * 100 / val;
                if (best_score == null) {
                    localStorage.setItem('best_score', JSON.stringify(counter));
                }
                else {
                    besttime = Number(best_score);
                    if (best_score < counter) {
                        localStorage.removeItem('best_score');
                        localStorage.setItem('best_score', String(counter));
                    }
                }
                clearInterval(time_interval);
                document.getElementById('boxx').style.display = 'none';
                document.getElementById('main_container').style.display = 'flex';
                document.getElementById('clock').style.display = 'none';
                document.getElementById('score').innerHTML = "YOUR SCORE :" + (counter) + "<br>";
                let bestime = Number(localStorage.getItem('best_score'));
                document.getElementById('highest_score').innerHTML = "HIGHEST SCORE : " + Number(bestime) + "<br>"
            }
        }, 1000);
    }
    else {
        alert('Recommended duration is within 5 and 120 seconds');
    }
})