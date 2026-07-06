const moveBox = document.getElementById("content");
const allBoxes = document.querySelectorAll("section.inhoud");

window.addEventListener("scroll", () => {
    moveBox.style.transform = `translateY(${-window.scrollY * 0.3})`;
});

function allBox(action) {
    if (action === "open") {
        allBoxes.forEach((a)=>{a.style.display='flex';});
    } else if (action === "close") {
        allBoxes.forEach((a) => { a.style.display = 'none'; });
    } else {
        console.log('Error: undefined value of action')
    }
}

function toggleBox(useBox) {
    allBox("close");
    let box = document.querySelector(`div#section-box>section.inhoud#box${useBox}`);
    if (box.style.display === "none") {
        box.style.display = "flex";
        moveBox.style.transform = "translateY(-400px)"
    } else {
        box.style.display = "none";
    }
}

async function main() {
    allBox("close");
    const response = await fetch("data.json");
    const data = await response.json();
    for (let i = 1; i < 6; i++) {
        let btn = document.querySelector(`nav#home-nav>button.nav-btn#btn${i}`);
        btn.addEventListener("click", () => { toggleBox(i) });
    }
    toggleBox(1);
    let imList = '';
    for (let i = 2; i < 10; i++) {
        let inp = `<img src='gallerij/im${i}.jpg' class='gall-img'>`;
        imList += inp;
    }
    document.querySelector('div#gallerij').innerHTML = imList;
    const news = data.news;
    let newsList = '';
    news.forEach((a)=>{
        let titel = a.titel;
        let inhoud = a.inhoud;
        let img = a.afbeelding;
        let html = `<div class='news'><h3 class='news-titel'>${titel}</h3><p class='news-inhoud'>${inhoud}</p><img class='news-img' src='gallerij/${img}'></div>`;
        newsList += html;
    });
    document.querySelector("div.news-box").innerHTML = newsList;
    document.querySelector("button#mail-btn").addEventListener("click", ()=>{
        window.location.href = 'mailto:sammepieper2009@outlook.com';
    });
}
main();