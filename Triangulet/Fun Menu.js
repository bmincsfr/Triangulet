(async function FunModeMenu() {
    if (window.__funModeLoaded) {
        console.warn("Fun Mode already loaded!");
        return;
    }
    window.__funModeLoaded = true;

    // === CREATE UI PANEL ===
    const box = document.createElement('div');
    Object.assign(box.style, {
        position: 'fixed', top: '10px', right: '10px', width: '280px', padding: '10px',
        background: '#1e1e1e', color: '#eee', border: '2px solid #444', borderRadius: '12px',
        zIndex: 2147483647, display: 'flex', flexDirection: 'column',
        boxShadow: '0 6px 18px rgba(0,0,0,0.8)', fontFamily: 'Nunito,sans-serif',
        transition: 'width 0.2s, height 0.2s', resize: 'both', overflow: 'auto',
        maxWidth: '400px', maxHeight: '600px'
    });
    document.body.appendChild(box);

    // HEADER
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    box.appendChild(header);

    const title = document.createElement('h4');
    title.textContent = 'Fun Mode by Bmincs';
    title.style.margin = '0';
    title.style.flex = '1';
    title.style.fontSize = '14px';
    title.style.userSelect = 'none';
    header.appendChild(title);

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '4px';
    header.appendChild(btnContainer);

    const minimizeBtn = document.createElement('button');
    minimizeBtn.textContent = '–';
    Object.assign(minimizeBtn.style, { cursor:'pointer', fontWeight:'bold', fontSize:'16px', border:'none', background:'transparent', color:'#eee' });
    btnContainer.appendChild(minimizeBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    Object.assign(closeBtn.style, { cursor:'pointer', fontWeight:'bold', fontSize:'16px', border:'none', background:'transparent', color:'#f33' });
    btnContainer.appendChild(closeBtn);

    const content = document.createElement('div');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = '6px';
    box.appendChild(content);

    // LOG AREA
    const logs = document.createElement('div');
    Object.assign(logs.style, {
        maxHeight: '120px', overflow: 'auto', background: '#222', padding: '6px',
        borderRadius: '6px', fontSize: '12px', color: '#eee'
    });
    logs.textContent = 'Fun Mode ready!';
    content.appendChild(logs);

    function log(msg) {
        const el = document.createElement('div'); el.textContent = msg; logs.appendChild(el);
        logs.scrollTop = logs.scrollHeight;
    }

    // EFFECTS STATE
    const effects = {
        rainbow: false,
        spin: false,
        dark: false,
        confetti: false,
        shake: false,
        wobble: false
    };
    const intervals = {};

    // BUTTONS FOR EACH EFFECT
    Object.keys(effects).forEach(key => {
        const btn = document.createElement('button');
        btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        Object.assign(btn.style, { padding:'6px', background:'#333', color:'#eee', border:'1px solid #555', borderRadius:'6px', cursor:'pointer' });
        content.appendChild(btn);

        btn.addEventListener('click', () => {
            effects[key] = !effects[key];
            if (effects[key]) {
                startEffect(key);
                log(`${key} ON`);
            } else {
                stopEffect(key);
                log(`${key} OFF`);
            }
        });
    });

    // EFFECTS IMPLEMENTATION
    function startEffect(name) {
        switch(name) {
            case 'rainbow':
                if (!window.__rainbowOverlay) {
                    const overlay = document.createElement("div");
                    overlay.style.position = "fixed";
                    overlay.style.top = 0;
                    overlay.style.left = 0;
                    overlay.style.width = "100%";
                    overlay.style.height = "100%";
                    overlay.style.pointerEvents = "none";
                    overlay.style.zIndex = 999999;
                    overlay.style.mixBlendMode = "hue";
                    document.body.appendChild(overlay);
                    window.__rainbowOverlay = overlay;
                }
                intervals.rainbow = setInterval(() => {
                    window.__rainbowOverlay.style.background = `hsl(${Date.now() % 360}, 100%, 50%)`;
                }, 50);
                break;

            case 'spin':
                const spinEls = document.querySelectorAll("div, span, button, img, a, text");
                spinEls.forEach(el => el.style.transition = "transform 3s linear");
                intervals.spin = setInterval(()=> {
                    spinEls.forEach(el => { el.style.transform = `rotate(${(Date.now()/10)%360}deg)`; });
                },50);
                break;

            case 'dark':
                if (!window.__darkOverlay) {
                    const d = document.createElement("div");
                    d.id = "__darkOverlay";
                    d.style.position="fixed";d.style.top=0;d.style.left=0;
                    d.style.width="100%";d.style.height="100%";
                    d.style.background="rgba(0,0,0,0.4)";
                    d.style.pointerEvents="none";d.style.zIndex=999999;
                    document.body.appendChild(d);
                    window.__darkOverlay = d;
                }
                break;

            case 'confetti':
                intervals.confetti = setInterval(() => {
                    const c = document.createElement("div");
                    c.innerText = "🎉";
                    c.style.position="fixed";
                    c.style.left = Math.random()*window.innerWidth+"px";
                    c.style.top = "-20px";
                    c.style.fontSize = (15+Math.random()*20)+"px";
                    c.style.transition = "top 2s linear";
                    c.style.zIndex=999999;
                    document.body.appendChild(c);
                    requestAnimationFrame(()=> { c.style.top = window.innerHeight+"px"; });
                    setTimeout(()=>c.remove(),2000);
                },200);
                break;

            case 'shake':
                if (!window.__funModeSafeShake) {
                    window.__funModeSafeShake = true;
                    const htmlEl = document.documentElement;
                    let angle = 0;
                    window.__funModeShakeInterval = setInterval(() => {
                        const x = Math.sin(angle) * 3;
                        const y = Math.cos(angle) * 3;
                        htmlEl.style.transform = `translate(${x}px, ${y}px)`;
                        htmlEl.style.transition = "transform 0s";
                        angle += 0.5;
                    }, 20);
                }
                break;

            case 'wobble':
                const wobEls = document.querySelectorAll("div, span, button, input, img, a, text");
                wobEls.forEach(el=>el.style.transition="transform 0.2s ease");
                intervals.wobble = setInterval(()=> {
                    wobEls.forEach(el=>{
                        const scaleX = 1 + Math.sin(Date.now()/200+el.offsetTop)*0.05;
                        const scaleY = 1 + Math.cos(Date.now()/200+el.offsetLeft)*0.05;
                        el.style.transform = `scale(${scaleX},${scaleY})`;
                    });
                },50);
                break;
        }
    }

    function stopEffect(name) {
        switch(name){
            case 'rainbow': clearInterval(intervals.rainbow); if(window.__rainbowOverlay){window.__rainbowOverlay.remove(); delete window.__rainbowOverlay;} break;
            case 'spin': clearInterval(intervals.spin); document.querySelectorAll("div, span, button, img, a, text").forEach(el=>el.style.transform=""); break;
            case 'dark': if(window.__darkOverlay){document.body.removeChild(window.__darkOverlay); delete window.__darkOverlay;} break;
            case 'confetti': clearInterval(intervals.confetti); break;
            case 'shake': clearInterval(window.__funModeShakeInterval); document.documentElement.style.transform=""; window.__funModeSafeShake=false; break;
            case 'wobble': clearInterval(intervals.wobble); document.querySelectorAll("div, span, button, input, img, a, text").forEach(el=>el.style.transform=""); break;
        }
    }

    // MINIMIZE & CLOSE
    let minimized=false;
    minimizeBtn.addEventListener('click', ()=>{
        minimized=!minimized;
        content.style.display = minimized?'none':'flex';
        box.style.width = minimized?'140px':'280px';
    });
    closeBtn.addEventListener('click', ()=> box.remove());

    // DRAG BOX
    (function drag(el){
        let isDown=false,startX=0,startY=0,startLeft=0,startTop=0;
        el.style.cursor='move';
        header.addEventListener('mousedown', e=>{
            if(['INPUT','SELECT','BUTTON'].includes(e.target.tagName)) return;
            isDown=true;
            startX=e.clientX; startY=e.clientY;
            startLeft=el.offsetLeft; startTop=el.offsetTop;
            document.body.style.userSelect='none';
        });
        document.addEventListener('mousemove', e=>{
            if(!isDown) return;
            el.style.left = startLeft + (e.clientX-startX)+'px';
            el.style.top = startTop + (e.clientY-startY)+'px';
            el.style.right='auto'; el.style.bottom='auto'; el.style.position='fixed';
        });
        document.addEventListener('mouseup', ()=>{ if(isDown){isDown=false; document.body.style.userSelect='';} });
    })(box);

    // FOOTER
    const footer = document.createElement('div');
    footer.style.marginTop='6px';
    footer.style.fontSize='11px';
    footer.innerHTML='Coded by <a href="https://github.com/bmincsfr/Triangulet" target="_blank" style="color:#6cf">Bmincs</a>';
    content.appendChild(footer);

    console.log('%cFun Mode Loaded (All effects working safely)', 'font-size:16px;color:green');
})();
