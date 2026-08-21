// A simple grid with a colored block who change place when clicked


let         items_tab = document.getElementsByClassName("item");
let         message_el = document.getElementById("message");
let         m_list_ok = ["Weell Donne ! ~", "Good job !", "Another time?", "Not so hard !"];
let         m_list_ko = ["Cheh !", "Im not here !", "Come on ! Try again", "Missed."];
const       img_cat = '<img src="img/cat.png" alt="potichat"></img>'
const       img_cat_speak = '<img src="img/cat-speak.png" alt="potichat"></img>'
const       img_cat_hover = '<img src="img/cat-hover.png" alt="potichat">'
const       img_cat_speak_hover = '<img src="img/cat-speak-hover.png" alt="potichat"></img>'

// const       img_cat = "url('img/cat.png')"
// const       img_cat_speak = '<img src="img/cat-speak.png" alt="potichat"></img>'
// const       img_cat_hover = '<img src="img/cat-hover.png" alt="potichat">'
// const       img_cat_speak_hover = '<img src="img/cat-speak-hover.png" alt="potichat"></img>'

function    new_green(cur_id) {
    let     nb; 
    let     n_green;

    do
        nb = Math.floor(Math.random() * items_tab.length + 1);
    while (nb == 0 || ('i' + nb) == cur_id);
    n_green = document.getElementById('i'+ nb);
    n_green.classList.add("current");
    n_green.innerHTML = img_cat;
    n_green.classList.remove("cat-appear");
    void n_green.offsetWidth;
    n_green.classList.add("cat-appear");
    n_green.appendChild(message_el);
}

function    get_random_message(m_tab) {
    let     n_mess = "";

    do
        n_mess = m_tab[Math.floor(Math.random() * m_tab.length)];
    while  (n_mess === message_el.innerHTML)
    return n_mess
}

function    get_cur_green() {
    for (let i = 0; items_tab[i]; i++)
        if (items_tab[i].classList.contains("current"))
            return items_tab[i];
}

let         click_counter = 0;
let         game_over = true;
let         move_timer = null;
let         move_delay = 2000;
let         move_delay_min = 300;
let         move_delay_step = 100;
const       DIFFICULTY_PRESETS = {
    easy:   { start: 2500, min: 700, step: 80 },
    normal: { start: 2000, min: 300, step: 100 },
    hard:   { start: 1200, min: 150, step: 130 },
};

function    update_counter() {
    document.getElementById("counter").innerHTML = `Score : ${click_counter}`;
}

function    clear_wrong() {
    for (let i = 0; items_tab[i]; i++)
        items_tab[i].classList.remove("wrong");
}

function    mark_wrong(cur) {
    for (let i = 0; items_tab[i]; i++)
        if (items_tab[i] !== cur)
            items_tab[i].classList.add("wrong");
}

function    schedule_move() {
    clearTimeout(move_timer);
    move_timer = setTimeout(auto_move, move_delay);
}

function    auto_move() {
    if (game_over)
        return;
    let cur = get_cur_green();
    cur.classList.remove("current");
    cur.innerHTML = "";
    new_green(cur.id);
    schedule_move();
}

function    restart_game() {
    let difficulty_el = document.getElementById("difficulty");
    let preset = DIFFICULTY_PRESETS[difficulty_el.value];

    game_over = false;
    click_counter = 0;
    move_delay = preset.start;
    move_delay_min = preset.min;
    move_delay_step = preset.step;
    update_counter();
    clear_wrong();
    message_el.innerHTML = "Click me !";
    let restart_btn = document.getElementById("restart-btn");
    restart_btn.textContent = "Rejouer";
    restart_btn.style.display = "none";
    difficulty_el.style.display = "none";
    for (let i = 0; items_tab[i]; i++) {
        items_tab[i].classList.remove("current");
        items_tab[i].innerHTML = "";
    }
    new_green(0);
    schedule_move();
}

document.getElementById("restart-btn").addEventListener("click", restart_game);

for (i = 0; items_tab[i]; i++) {
    items_tab[i].addEventListener("click", function() {
        if (game_over)
            return;
        console.log(`Color is : ${this.id}`)
        if (this.classList.contains("current")) {
            console.log("if");
            message_el.innerHTML = get_random_message(m_list_ok);
            click_counter++;
            update_counter();
            this.classList.remove("current");
            this.innerHTML = ""
            new_green(this.id);
            move_delay = Math.max(move_delay_min, move_delay - move_delay_step);
            schedule_move();
        }
        else {
            console.log("else")
            message_el.innerHTML = get_random_message(m_list_ko);
            game_over = true;
            clearTimeout(move_timer);
            let cur = get_cur_green();
            cur.innerHTML = img_cat_speak;
            cur.appendChild(message_el);
            mark_wrong(cur);
            document.getElementById("restart-btn").style.display = "block";
            document.getElementById("difficulty").style.display = "block";
        }
    });
    // items_tab[i].addEventListener("mouseover", function() {
    //     if (this.innerHTML)
    //         this.innerHTML = img_cat_hover;

    // });
    // items_tab[i].addEventListener("mouseout", function() {
    //     if (this.innerHTML)
    //     this.innerHTML = img_cat;

    // });
};
