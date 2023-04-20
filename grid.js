// A simple grid with a colored block who change place when clicked


let         items_tab = document.getElementsByClassName("item");
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
    n_green.style.background = "green";
    // n_green.style.background = img_cat;
    n_green.innerHTML = img_cat;
}

function    get_random_message(m_tab) {
    let     n_mess = "";

    do
        n_mess = m_tab[Math.floor(Math.random() * m_tab.length)];
    while  (n_mess === document.getElementById("message").innerHTML)
    return n_mess
}

function    get_cur_green() {
    for (let i = 0; items_tab[i]; i++)
        if (items_tab[i].style.background === "green")
            return items_tab[i];
}

new_green(0);

for (i = 0; items_tab[i]; i++) {
    items_tab[i].addEventListener("click", function() {
        console.log(`Color is : ${this.id}`)
        if (this.style.background === "green") {
            console.log("if");
            document.getElementById("message").innerHTML = get_random_message(m_list_ok);
            this.style.background = 'bisque';
            this.innerHTML = ""
            new_green(this.id);
        }
        else {
            console.log("else")
            document.getElementById("message").innerHTML = get_random_message(m_list_ko);
            let cur = get_cur_green();
            cur.innerHTML = img_cat_speak;
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
