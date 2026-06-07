// =========================
// VARIÁVEIS
// =========================

const pages = document.querySelectorAll(".page");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const verifyNameBtn = document.getElementById("verifyNameBtn");
const nameInput = document.getElementById("nameInput");
const nameMessage = document.getElementById("nameMessage");

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const dateNextBtn = document.getElementById("dateNextBtn");

const cards = document.querySelectorAll(".date-card");

const cardMessage = document.getElementById("cardMessage");
const finishBtn = document.getElementById("finishBtn");

const finalDateType = document.getElementById("finalDateType");
const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");

let selectedDate = "";
let selectedTime = "";
let selectedActivity = "";


// =========================
// EMAILJS
// =========================

emailjs.init("wNaI0xwonB9y-nsUv");


// =========================
// TROCAR PÁGINA
// =========================

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById(pageId)
        .classList.add("active");
}


// =========================
// BOTÃO SIM
// =========================

yesBtn.addEventListener("click", () => {
    showPage("page2");
});


// =========================
// BOTÃO NÃO FUGINDO
// =========================

function moveNoButton() {

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);


// =========================
// VALIDAR NOME
// =========================

verifyNameBtn.addEventListener("click", () => {

    const name = nameInput.value.trim().toLowerCase();

    if (name.includes("luiza")) {

        nameMessage.style.color = "#7dffb3";

        nameMessage.innerText =
            "Sim, você é a pessoa certa gatinha 💜";

        setTimeout(() => {
            showPage("page3");
        }, 1800);

    } else {

        nameMessage.style.color = "#ff8c8c";

        nameMessage.innerText =
            "Ou você tá errando a digitação ou você não é a pessoa certa 😌";
    }

});


// =========================
// LIMITAR PARA JUNHO
// =========================

dateInput.addEventListener("change", () => {

    const selected = new Date(dateInput.value);

    const month = selected.getMonth() + 1;

    if (month !== 6) {

        alert(
            "Ei 😌 escolha um dia do mês de junho."
        );

        dateInput.value = "";
    }

});


// =========================
// DATA E HORÁRIO
// =========================

dateNextBtn.addEventListener("click", () => {

    if (!dateInput.value || !timeInput.value) {

        alert(
            "Escolha uma data e um horário."
        );

        return;
    }

    selectedDate = dateInput.value;
    selectedTime = timeInput.value;

    showPage("page4");
});


// =========================
// ESCOLHA DOS CARDS
// =========================

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => {
            c.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedActivity =
            card.dataset.date;

        cardMessage.innerHTML =
            "Não importa onde estivermos, o importante é estar com você ❤️";

        finishBtn.classList.remove("hidden");
    });

});


// =========================
// FINALIZAR
// =========================

finishBtn.addEventListener("click", () => {

    finalDateType.innerText =
        selectedActivity;

    finalDate.innerText =
        selectedDate;

    finalTime.innerText =
        selectedTime;

    sendEmail();

    showPage("page5");
});


// =========================
// ENVIAR EMAIL
// =========================

function sendEmail() {

    const templateParams = {

        nome: nameInput.value,

        atividade: selectedActivity,

        data: selectedDate,

        horario: selectedTime
    };

    emailjs
        .send(
            "service_cki0m2o",
            "template_lxdtowo",
            templateParams
        )

        .then(() => {

            console.log(
                "Email enviado com sucesso!"
            );

        })

        .catch((error) => {

            console.error(
                "Erro ao enviar email:",
                error
            );

        });

}