(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={id:`pua`,title:`We're from Greenwich`,subtitle:`Pick-up A · Vocabulary`,page:184},t=[{id:1,en:`We're from ...`,phonetic:`wɪə frɒm`,de:`Wir sind aus ...`,example:`We're from Greenwich.`},{id:2,en:`Here's your ball.`,phonetic:`ˌhɪəz jɔː 'bɔːl`,de:`Hier ist dein Ball.`,example:`Here's your ball, Sherlock.`},{id:3,en:`Hello.`,phonetic:`hel'əʊ`,de:`Hallo.`,example:``},{id:4,en:`I'm ...`,phonetic:`aɪm 'piːə`,de:`Ich heiße ...; Ich bin ...`,example:`Hello, I'm Pia.`},{id:5,en:`You're a nice dog.`,phonetic:`jɔːrə 'naɪs ˌdɒɡ`,de:`Du bist ein lieber Hund.`,example:``},{id:6,en:`What's your name?`,phonetic:`ˌwɒts jə 'neɪm`,de:`Wie heißt du?; Wie heißen Sie?`,example:`What's your name? – I'm Olivia.`},{id:7,en:`Sorry, my dog is crazy.`,phonetic:`ˌsɒri maɪ ˌdɒɡ ɪz 'kreɪzi`,de:`Tut mir leid, mein Hund ist verrückt.`,example:``},{id:8,en:`and`,phonetic:`ænd; ənd`,de:`und`,example:``,tip:`Wenn man „and“ nicht betont, spricht man es [ənd].`},{id:9,en:`My name is ...`,phonetic:`maɪ 'neɪm ɪz`,de:`Ich heiße ...`,example:`What's your name? – My name is Luke.`},{id:10,en:`Where are you from?`,phonetic:`ˌweər ə ju 'frɒm`,de:`Woher kommst du?; Woher kommt ihr?; Woher kommen Sie?`,example:`Where are you from? – We're from Greenwich.`},{id:11,en:`I'm from ...`,phonetic:`'aɪm frəm`,de:`Ich bin aus ...`,example:`Where are you from? – I'm from Cologne.`},{id:12,en:`in`,phonetic:`ɪn`,de:`in; im; rein; herein`,example:`Cologne is in Germany.`},{id:13,en:`Are you on holiday in ... ?`,phonetic:`ˌɑː ju ɒn 'hɒlədeɪ ɪn`,de:`Bist du im Urlaub in ... ?; Sind Sie im Urlaub in ... ?; Seid ihr im Urlaub in ... ?`,example:`Are you on holiday in London? – Yes, I'm here with my parents.`},{id:14,en:`yes`,phonetic:`jes`,de:`ja`,example:``},{id:15,en:`I'm here with my parents.`,phonetic:`aɪm ˌhɪə wɪð maɪ 'peərənts`,de:`Ich bin mit meinen Eltern hier.`,example:``},{id:16,en:`How old are you?`,phonetic:`ˌhaʊ 'əʊld ə juː`,de:`Wie alt bist du?; Wie alt seid ihr?; Wie alt sind Sie?`,example:``,tip:`Achte beim Sprechen auf die Verbindung zwischen den Wörtern.`},{id:17,en:`You too?`,phonetic:`juː 'tuː`,de:`Du auch?; Sie auch?; Ihr auch?`,example:`How old are you? – I'm ten. You too?`},{id:18,en:`no`,phonetic:`nəʊ`,de:`nein`,example:``,tip:`Gegenteil von yes.`},{id:19,en:`the`,phonetic:`ðə; ði`,de:`der; die (auch Pl.); das`,example:``},{id:20,en:`boy`,phonetic:`bɔɪ`,de:`Junge`,example:`Luke is a boy from Greenwich.`},{id:21,en:`girl`,phonetic:`ɡɜːl`,de:`Mädchen`,example:`And Pia is a girl from Germany.`},{id:22,en:`me too`,phonetic:`miː tuː`,de:`ich auch`,example:`I'm eleven. – Me too.`},{id:23,en:`friend`,phonetic:`frend`,de:`Freund/-in`,example:`Dave and Luke are friends.`},{id:24,en:`he`,phonetic:`hiː`,de:`er`,example:`Dave is nice. He's my friend.`}];function n(e){return e.split(`;`)[0].trim()}function r(e){return e.toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[.…!?,'"„“”]/g,``).replace(/\s+/g,` `).trim()}function i(e,t){let n=r(e);return t.split(`;`).map(e=>r(e)).some(e=>e===n||e.includes(n)||n.includes(e))}function a(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var o=`greenwich-vocab-stats`,s=document.querySelector(`#app`);function c(){try{return JSON.parse(localStorage.getItem(o))||{quizzes:0,best:0}}catch{return{quizzes:0,best:0}}}function l(e){localStorage.setItem(o,JSON.stringify(e))}function u(e){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(e.replace(/\.\.\./g,``));t.lang=`en-GB`,t.rate=.9;let n=window.speechSynthesis.getVoices(),r=n.find(e=>e.lang.startsWith(`en-GB`))||n.find(e=>e.lang.startsWith(`en`));r&&(t.voice=r),window.speechSynthesis.speak(t)}window.speechSynthesis&&(window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices());function d(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function f(){let n=c();s.innerHTML=`
    <header class="hero">
      <p class="chapter-pill">${d(e.subtitle)} · S. ${e.page}</p>
      <h1 class="brand">Greenwich<span>Vocab</span></h1>
      <p class="tagline">Lerne die Vokabeln aus „${d(e.title)}“ spielerisch – Karteikarten, Quiz & Tippen.</p>
    </header>
    <nav class="mode-list" aria-label="Lernmodi">
      <button class="mode-btn" data-mode="cards" type="button">
        <span class="mode-icon" aria-hidden="true">🃏</span>
        <strong>Karteikarten</strong>
        <small>Umdrehen und mit Aussprache üben</small>
      </button>
      <button class="mode-btn" data-mode="quiz" type="button">
        <span class="mode-icon" aria-hidden="true">🎯</span>
        <strong>Quiz</strong>
        <small>4 Antworten – was heißt das auf Englisch?</small>
      </button>
      <button class="mode-btn" data-mode="type" type="button">
        <span class="mode-icon" aria-hidden="true">✍️</span>
        <strong>Tippen</strong>
        <small>Schreib die englische Vokabel selbst</small>
      </button>
    </nav>
    <p class="stats-home">
      ${t.length} Vokabeln
      ${n.quizzes?`· ${n.quizzes} Quiz gespielt · Bestes Ergebnis: ${n.best}/${t.length}`:`· Noch kein Quiz gespielt`}
    </p>
  `,s.querySelectorAll(`[data-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.mode;t===`cards`&&h(),t===`quiz`&&g(),t===`type`&&v()})})}function p(e,t,n){return`
    <div class="topbar">
      <button class="back-btn" type="button" data-home>← Menü</button>
      <span class="progress-label">${d(e)} · ${t+1}/${n}</span>
    </div>
    <div class="progress-track" aria-hidden="true">
      <div class="progress-fill" style="width:${(t+1)/n*100}%"></div>
    </div>
  `}function m(){s.querySelector(`[data-home]`)?.addEventListener(`click`,f)}function h(){let e=a(t),r=0,i=!1;function o(){let t=e[r];i=!1,s.innerHTML=`
      ${p(`Karten`,r,e.length)}
      <div class="card-stage">
        <div class="flash-card" role="button" tabindex="0" aria-label="Karte umdrehen">
          <div class="face front">
            <span class="face-label">Deutsch</span>
            <p class="face-main">${d(n(t.de))}</p>
            <p class="hint-flip">Tippe zum Umdrehen</p>
          </div>
          <div class="face back">
            <span class="face-label">English</span>
            <p class="face-main">${d(t.en)}</p>
            <p class="phonetic">[${d(t.phonetic)}]</p>
            ${t.example?`<p class="example">${d(t.example)}</p>`:``}
            ${t.tip?`<p class="tip">💡 ${d(t.tip)}</p>`:``}
          </div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-speak" type="button" data-speak>🔊 Anhören</button>
        <button class="btn btn-secondary" type="button" data-flip>Umdrehen</button>
        <button class="btn btn-primary" type="button" data-next>${r<e.length-1?`Weiter →`:`Fertig ✓`}</button>
      </div>
    `;let a=s.querySelector(`.flash-card`),l=()=>{i=!i,a.classList.toggle(`flipped`,i)};a.addEventListener(`click`,l),a.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),l())}),s.querySelector(`[data-flip]`).addEventListener(`click`,l),s.querySelector(`[data-speak]`).addEventListener(`click`,()=>u(t.en)),s.querySelector(`[data-next]`).addEventListener(`click`,()=>{r<e.length-1?(r+=1,o()):c()}),m()}function c(){s.innerHTML=`
      <div class="result">
        <div class="star-burst" aria-hidden="true">⭐ 🌳 ⭐</div>
        <h2 class="brand" style="font-size:2rem">Alle Karten geschafft!</h2>
        <p>Du hast alle ${e.length} Vokabeln angesehen. Super!</p>
        <div class="card-actions">
          <button class="btn btn-primary" type="button" data-again>Nochmal</button>
          <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
        </div>
      </div>
    `,s.querySelector(`[data-again]`).addEventListener(`click`,h),m()}o()}function g(){let e=a(t),r=0,i=0,o=!1;function c(e){return a([e,...a(t.filter(t=>t.id!==e.id)).slice(0,3)])}function l(){let t=e[r];o=!1;let a=c(t);s.innerHTML=`
      ${p(`Quiz`,r,e.length)}
      <div class="quiz-prompt">
        <span class="face-label">Was heißt das auf Englisch?</span>
        <p class="face-main">${d(n(t.de))}</p>
        <button class="btn btn-ghost" type="button" data-hint style="margin-top:0.75rem">🔊 Hinweis anhören</button>
      </div>
      <div class="choices">
        ${a.map(e=>`
          <button class="choice" type="button" data-id="${e.id}">
            ${d(e.en)}
          </button>`).join(``)}
      </div>
      <p class="feedback" aria-live="polite"></p>
      <div class="card-actions" style="opacity:0;pointer-events:none" data-next-wrap>
        <button class="btn btn-primary" type="button" data-next>${r<e.length-1?`Weiter →`:`Ergebnis ansehen`}</button>
      </div>
    `;let f=s.querySelector(`.feedback`),h=s.querySelector(`[data-next-wrap]`);s.querySelector(`[data-hint]`).addEventListener(`click`,()=>u(t.en)),s.querySelectorAll(`.choice`).forEach(e=>{e.addEventListener(`click`,()=>{if(o)return;o=!0;let n=Number(e.dataset.id)===t.id;n&&(i+=1),s.querySelectorAll(`.choice`).forEach(r=>{r.disabled=!0,Number(r.dataset.id)===t.id?r.classList.add(`correct`):r===e&&!n&&r.classList.add(`wrong`)}),f.textContent=n?`Richtig! Toll gemacht 🎉`:`Fast! Richtig ist: ${t.en}`,f.className=`feedback ${n?`ok`:`bad`}`,h.style.opacity=`1`,h.style.pointerEvents=`auto`,n&&u(t.en)})}),s.querySelector(`[data-next]`).addEventListener(`click`,()=>{r<e.length-1?(r+=1,l()):_(i,e.length)}),m()}l()}function _(e,t){let n=c();n.quizzes+=1,n.best=Math.max(n.best,e),l(n);let r=Math.round(e/t*100),i=`Weiter üben – du schaffst das!`;r>=90?i=`Wahnsinn – fast perfekt!`:r>=70?i=`Super Job!`:r>=50&&(i=`Gut gemacht – noch eine Runde?`),s.innerHTML=`
    <div class="result">
      <div class="star-burst" aria-hidden="true">${r>=70?`⭐ 🏆 ⭐`:`🌳 ⚽ 🌳`}</div>
      <h2 class="brand" style="font-size:2rem">Quiz fertig!</h2>
      <p class="result-score">${e}/${t}</p>
      <p>${d(i)}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-again>Nochmal quizzen</button>
        <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
      </div>
    </div>
  `,s.querySelector(`[data-again]`).addEventListener(`click`,g),m()}function v(){let e=a(t),r=0,o=0,c=!1;function l(){let t=e[r];c=!1,s.innerHTML=`
      ${p(`Tippen`,r,e.length)}
      <div class="quiz-prompt">
        <span class="face-label">Schreib auf Englisch</span>
        <p class="face-main">${d(n(t.de))}</p>
        ${t.example?`<p class="example" style="margin-top:0.75rem">Beispiel: ${d(t.example)}</p>`:``}
      </div>
      <form class="type-form">
        <label class="visually-hidden" for="answer" style="position:absolute;left:-9999px">Antwort</label>
        <input class="type-input" id="answer" name="answer" autocomplete="off" spellcheck="false"
          placeholder="z. B. Hello." autofocus />
        <div class="card-actions">
          <button class="btn btn-speak" type="button" data-speak>🔊 Anhören</button>
          <button class="btn btn-primary" type="submit" data-check>Prüfen</button>
        </div>
      </form>
      <p class="feedback" aria-live="polite"></p>
      <div class="card-actions" style="display:none" data-next-wrap>
        <button class="btn btn-primary" type="button" data-next>${r<e.length-1?`Weiter →`:`Ergebnis ansehen`}</button>
      </div>
    `;let a=s.querySelector(`#answer`),f=s.querySelector(`.feedback`),h=s.querySelector(`[data-next-wrap]`),g=s.querySelector(`.type-form`);s.querySelector(`[data-speak]`).addEventListener(`click`,()=>u(t.en)),g.addEventListener(`submit`,e=>{if(e.preventDefault(),c)return;let r=a.value.trim();if(!r){f.textContent=`Schreib erst etwas hin.`,f.className=`feedback bad`;return}c=!0,i(r,t.en)||i(r,n(t.en))||i(r,t.en.replace(/\.\.\./g,``))||i(r.replace(/\.\.\./g,``),t.en)?(o+=1,f.textContent=`Richtig! 🎉`,f.className=`feedback ok`,u(t.en)):(f.textContent=`Leider nein. Richtig: ${t.en}`,f.className=`feedback bad`,a.value=t.en),a.disabled=!0,s.querySelector(`[data-check]`).disabled=!0,h.style.display=`flex`}),s.querySelector(`[data-next]`).addEventListener(`click`,()=>{r<e.length-1?(r+=1,l()):y(o,e.length)}),m(),setTimeout(()=>a.focus(),50)}l()}function y(e,t){s.innerHTML=`
    <div class="result">
      <div class="star-burst" aria-hidden="true">✍️ ⭐ ✍️</div>
      <h2 class="brand" style="font-size:2rem">Tippen geschafft!</h2>
      <p class="result-score">${e}/${t}</p>
      <p>${e===t?`Perfekt geschrieben!`:`Übe die schwierigen nochmal mit den Karteikarten.`}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-again>Nochmal tippen</button>
        <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
      </div>
    </div>
  `,s.querySelector(`[data-again]`).addEventListener(`click`,v),m()}f();