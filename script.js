
const startButton = document.getElementById("startButton");
const universeScreen = document.getElementById("universeScreen");
const intro = document.getElementById("intro");

const modal = document.getElementById("messageModal");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const messageNumber = document.getElementById("messageNumber");

const closeModal = document.getElementById("closeModal");
const messageContinue = document.getElementById("messageContinue");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const lastStar = document.getElementById("lastStar");

const finalScreen = document.getElementById("finalScreen");
const finalMessage = document.getElementById("finalMessage");
const signature = document.getElementById("signature");

let visitedStars = new Set();
let currentIndex = null;

const stars = [
    {
        title: "نجمة الأثر",
        text: "يمكن إنتِ ما بتعرفي قديش وجودك بيفرق، بس في ناس بتترك أثر حلو بحياة غيرها من غير ما تحاول، وإنتِ من هالناس. في تفاصيل صغيرة منك بتضل بالبال، ومواقف بسيطة بتضل عالقة، مش لأنها كبيرة، بس لأنها طالعة منك إنتِ."
    },
    {
        title: "نجمة الروح",
        text: "في ناس جمالهم بيوقف عند شكلهم، وفي ناس كل ما تعرفهم أكثر بتكتشف إنهم أجمل من اللي كنت متخيل. وإنتِ من النوع الثاني. روحك فيها إشي مميز، إشي بخلي الواحد يقدّر وجودك ويحترم شخصيتك، مش بس ينبهر فيكي من بعيد."
    },
    {
        title: "نجمة الضحكة",
        text: "ضحكتك مش مجرد ضحكة، هي من التفاصيل اللي بتقدر تغيّر جو يوم كامل. يمكن ما تنتبهي لتأثيرها، بس في لحظات بتكون بسيطة جدًا، ومع هيك بتضل بالذاكرة، وبتصير من الأشياء اللي الواحد بتذكرها وبتخليه يبتسم."
    },
    {
        title: "نجمة القيمة",
        text: "بدي إياكي تعرفي إن قيمتك مش مرتبطة برأي أي حدا فيكي، ولا بقديش الناس بتعبّر عن تقديرها إلك. إنتِ إلك قيمة لحالك، بشخصيتك وبقلبك وبكل إشي بيمثّلك. وما لازم تتغيري عشان تثبتي لحدا إنك إنسانة مميزة."
    },
    {
        title: "نجمة التفاصيل",
        text: "يمكن أحلى إشي فيكي مش موقف واحد أو صفة وحدة، يمكن هو مجموع التفاصيل الصغيرة: أسلوبك، كلامك، ردودك، وطريقتك بالتعامل. هاي الأشياء اللي بتصنع شخصيتك، واللي بتخليكي إنتِ، مش نسخة عن أي حدا ثاني."
    },
    {
        title: "نجمة الامتنان",
        text: "يمكن ما حكيتلك هالحكي بالطريقة الكافية، بس وجودك إشي بستاهل التقدير. وبستاهل إنك تسمعي كلام حلو مش بس بيوم معين، بل بكل وقت. بتمنى تظلي عارفة إنك إنسانة إلها مكانة، وإنه في أشياء حلوة فيكي أكبر بكثير من إن الكلام يوصفها."
    },
    {
        title: "نجمة الجمال",
        text: "إنتِ جميلة، بس مش جمال شكل وبس… إنتِ جميلة بروحك، بطريقة حكيك، بتصرفاتك، وبالتفاصيل الصغيرة اللي يمكن إنتِ ما تنتبهي إلها. فيكي حلاوة مش بتنشاف بالعيون بس، بتنحس بالقلب. وحتى أبسط الأشياء اللي بتعمليها إلها طابع حلو بيميزك عن الكل. لا تفكري يوم إن جمالك بس بملامحك، لأن أجمل إشي فيكي هو الإنسانة اللي إنتِ عليها. ❤️"
    },
    {
        title: "النجمة الأخيرة — المفاجأة",
        text: "وإذا وصلتي لهون، بدي أحكيلك شغلة أخيرة… أنا ما عملت كل هاد عشان أعدّد صفات حلوة فيكي وبس. عملته عشان أذكّرك إنك إنسانة مميزة، وإنه فيكي أشياء حلوة يمكن إنتِ نفسك ما بتشوفيها. بتمنى لما ترجعي تشوفي هالموقع تتذكري إنك بتستاهلي كل كلمة حلوة فيه، وإنه ما في داعي تكوني مثالية عشان تكوني غالية. خليكِ إنتِ، بكل عفويتك وتفاصيلك. ❤️"
    }
];

const finalLines = [
    "لاڤين… ❤️",
    "يمكن النجوم اللي شفتيها قبل شوي كانت مجرد كلمات على شاشة، بس كل كلمة فيها كانت بتحمل معنى حقيقي عندي.",
    "حبيت أعملك هالمكان الصغير، عشان أذكّرك إنك مش شخص عادي مرّ بحياتي وخلاص.",
    "في ناس وجودهم بخلّي الأيام ألطف، وإنتِ من الناس اللي وجودهم إله طعم مختلف.",
    "بحب عفويتك، وطريقة حكيك، وتفاصيلك اللي يمكن إنتِ ما بتعطيها أهمية، بس أنا بشوف فيها أشياء حلوة.",
    "وبتمنى ما تنسي إنك بتستاهلي تنحبي وتتقدّري، مش بس بيوم 11.11، بل بكل يوم.",
    "مش لازم تكوني بأفضل حالاتك طول الوقت، ولا لازم تكوني مثالية عشان تظلي مميزة.",
    "خليكي على طبيعتك، لأن أجمل إشي فيكي إنك إنتِ، بكل تفاصيلك.",
    "وإذا في أمنية بتمناها إلك، فهي إنك تظلي تشوفي حالك بالعين الحلوة اللي بتستاهليها.",
    "شكراً لأنك إنتِ… ولأن وجودك أضاف لحياتي لحظات حلوة ما بدي أنساها.",
    "يمكن الكلام ما بوصف كل اللي بدي أحكيه، بس بتمنى توصلك منه ولو شوية من المشاعر اللي وراه.",
    "وآخر إشي… بتمنى كل ما تشوفي نجمة بالسماء تتذكري إنك كنتِ، ولسه، نجمة مميزة بطريقتك. ✨"
];

// الانتقال من البداية إلى النجوم
startButton.addEventListener("click", () => {
    intro.classList.remove("active");
    universeScreen.classList.add("active");
});

// فتح النجوم
document.querySelectorAll(".star-node").forEach((star) => {
    star.addEventListener("click", () => {
        const index = Number(star.dataset.star);

        if (index === 7 && visitedStars.size < 7) {
            return;
        }

        openStar(index);
    });
});

function openStar(index) {
    currentIndex = index;

    messageTitle.textContent = stars[index].title;
    messageText.textContent = stars[index].text;
    messageNumber.textContent = `STAR 0${index + 1}`;

    modal.classList.add("show");
}

function updateProgress() {
    const count = visitedStars.size;

    progressText.textContent = `${count} / 8`;
    progressBar.style.width = `${(count / 8) * 100}%`;

    if (count >= 7) {
        lastStar.classList.remove("locked");
        lastStar.classList.add("unlocked");
        document.getElementById("universeHint").textContent =
            "النجمة الأخيرة صارت إلك... افتحيها واكتشفي المفاجأة ✨";
    }
}

// زر متابعة الرسالة
messageContinue.addEventListener("click", () => {
    if (currentIndex === null) return;

    visitedStars.add(currentIndex);

    const currentStar = document.querySelector(
        `.star-node[data-star="${currentIndex}"]`
    );

    if (currentStar) {
        currentStar.classList.add("visited");
    }

    updateProgress();
    modal.classList.remove("show");

    if (currentIndex === 7) {
        setTimeout(showFinalLetter, 500);
    }

    currentIndex = null;
});

// إغلاق النافذة
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    currentIndex = null;
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
        currentIndex = null;
    }
});

// عرض الرسالة الأخيرة
function showFinalLetter() {
    universeScreen.classList.remove("active");
    finalScreen.classList.add("active");

    finalMessage.innerHTML = "";
    signature.classList.remove("visible");

    finalLines.forEach((line, index) => {
        const paragraph = document.createElement("p");
        paragraph.className = "final-line";
        paragraph.textContent = line;

        if (index === 0 || index === finalLines.length - 1) {
            paragraph.classList.add("special");
        }

        finalMessage.appendChild(paragraph);

        setTimeout(() => {
            paragraph.classList.add("visible");
        }, 700 + index * 1100);
    });

    const signatureDelay = 700 + finalLines.length * 1100 + 600;

    setTimeout(() => {
        signature.classList.add("visible");
    }, signatureDelay);
}

// خلفية النجوم المتحركة
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width = 0;
let height = 0;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles = [];

    const amount = Math.min(
        Math.floor((width * height) / 6500),
        180
    );

    for (let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 0.3,
            alpha: Math.random() * 0.7 + 0.2,
            speed: Math.random() * 0.008 + 0.002,
            phase: Math.random() * Math.PI * 2
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
        particle.phase += particle.speed;

        const opacity =
            particle.alpha * (0.5 + Math.sin(particle.phase) * 0.5);

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255, 230, 190, ${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(245, 213, 139, 0.5)";
        ctx.fill();
    });

    ctx.shadowBlur = 0;
    requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();
