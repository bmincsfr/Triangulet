(async function TrianguletOpener() {
    // === CONFIG ===
    const OPEN_DELAY = 1150;
    const API_PACKS = '/data/trians';
    const API_OPEN = '/api/open';
    const AUTH = typeof triangulet !== 'undefined' ? triangulet.tokenraw : null;

    if (!AUTH) {
        console.error('triangulet.tokenraw not found. Aborting.');
        alert('triangulet.tokenraw not found. Make sure you run this where triangulet is defined.');
        return;
    }

    // === STATE ===
    const rarities = ['Uncommon', 'Rare', 'Epic', 'Legendary', 'Chroma', 'Mystical'];
    const unlocks = rarities.reduce((acc, r) => (acc[r] = {}, acc), {});
    let unique = 'NONE';
    let opened = 0;
    let running = false;
    let inFlight = false;
    let selectedPack = null;

    // === CREATE UI ===
    const box = document.createElement('div');
    Object.assign(box.style, {
        position: 'fixed', top: '10px', right: '10px', width: '320px', padding: '14px',
        background: '#d1d1d1', border: '2px solid rgba(0,0,0,0.6)', borderRadius: '12px',
        zIndex: '2147483647', display: 'flex', flexDirection: 'column',
        boxShadow: '0 6px 18px rgba(0,0,0,0.6)', fontFamily: 'Nunito,sans-serif', color:'#000'
    });
    document.body.appendChild(box);

    const header = document.createElement('h3');
    header.textContent = 'Capsule Opener';
    header.style.margin = '0 0 8px 0';
    box.appendChild(header);

    const packSelect = document.createElement('select');
    packSelect.style.width = '100%';
    packSelect.style.padding = '8px';
    packSelect.style.marginBottom = '8px';
    packSelect.disabled = true;
    box.appendChild(packSelect);

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '8px';
    box.appendChild(controls);

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    Object.assign(startBtn.style, { flex: '1', padding: '8px', background: '#039162', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 6px 0 #01744e' });
    startBtn.disabled = true;
    controls.appendChild(startBtn);

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    Object.assign(stopBtn.style, { flex: '1', padding: '8px', background: '#b30000', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 6px 0 #760000' });
    stopBtn.disabled = true;
    controls.appendChild(stopBtn);

    const recent = document.createElement('p');
    recent.textContent = `RECENT UNIQUE: ${unique}`;
    recent.style.margin = '6px 0';
    box.appendChild(recent);

    const openedEl = document.createElement('p');
    openedEl.textContent = `CAPSULES OPENED: ${opened.toLocaleString()}`;
    openedEl.style.margin = '6px 0';
    box.appendChild(openedEl);

    const logs = document.createElement('div');
    Object.assign(logs.style, { maxHeight: '200px', overflow: 'auto', marginTop: '6px', background: 'rgba(255,255,255,0.6)', padding: '8px', borderRadius: '6px', fontSize: '13px' });
    logs.textContent = 'No actions yet.';
    box.appendChild(logs);

    const counts = document.createElement('div');
    counts.style.marginTop = '8px';
    box.appendChild(counts);

    function addLogLine(text, type = 'info') {
        const el = document.createElement('div');
        el.textContent = text;
        if (type === 'error') el.style.color = '#900';
        logs.appendChild(el);
        logs.scrollTop = logs.scrollHeight;
    }

    // === FETCH PACKS ===
    try {
        const res = await fetch(API_PACKS, { headers: { Accept: 'application/json', authorization: AUTH, 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error(`Failed to fetch packs: ${res.status}`);
        const data = await res.json();
        packSelect.innerHTML = '';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select a capsule...';
        packSelect.appendChild(placeholder);

        data.ValuesnCapsules.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.name;
            opt.textContent = p.name;
            packSelect.appendChild(opt);
        });

        packSelect.disabled = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        addLogLine('Packs loaded.');
    } catch (err) {
        packSelect.innerHTML = '<option value="">Failed to load packs</option>';
        addLogLine('Error loading packs: ' + err.message, 'error');
        console.error(err);
        return;
    }

    packSelect.addEventListener('change', () => {
        selectedPack = packSelect.value || null;
        addLogLine(selectedPack ? `Selected pack: ${selectedPack}` : 'Pack cleared.');
    });

    function renderCounts() {
        counts.innerHTML = '';
        rarities.forEach(r => {
            const title = document.createElement('div');
            title.style.fontWeight = '700';
            title.style.marginTop = '6px';
            title.textContent = r;
            counts.appendChild(title);
            const items = unlocks[r];
            if (!items || Object.keys(items).length === 0) {
                const none = document.createElement('div');
                none.textContent = '—';
                none.style.fontSize = '13px';
                counts.appendChild(none);
            } else {
                Object.keys(items).forEach(k => {
                    const line = document.createElement('div');
                    line.textContent = `${k}: ${items[k].toLocaleString()}x`;
                    line.style.fontSize = '13px';
                    counts.appendChild(line);
                });
            }
        });
    }

    async function doOpen() {
        if (!selectedPack) return addLogLine('No pack selected.', 'error');
        if (inFlight) return;
        inFlight = true;
        try {
            const res = await fetch(API_OPEN, {
                method: 'POST',
                headers: { Accept: 'application/json', authorization: AUTH, 'Content-Type': 'application/json' },
                body: JSON.stringify({ capsule: selectedPack })
            });
            if (!res.ok) throw new Error('Open failed: ' + res.status);
            const response = await res.json();
            if (response?.rarity && response?.trian) {
                if (response.new) unique = response.trian;
                unlocks[response.rarity][response.trian] = (unlocks[response.rarity][response.trian] || 0) + 1;
                opened++;
                recent.textContent = `RECENT UNIQUE: ${unique}`;
                openedEl.textContent = `CAPSULES OPENED: ${opened.toLocaleString()}`;
                addLogLine(`${response.rarity} ${response.trian} (${unlocks[response.rarity][response.trian]}x)`);
                renderCounts();
            } else {
                addLogLine('Unexpected response', 'error');
                console.log(response);
            }
        } catch (err) {
            addLogLine('Open error: ' + err.message, 'error');
            console.error(err);
        } finally {
            inFlight = false;
        }
    }

    async function openLoop() {
        while (true) {
            if (running) await doOpen();
            await new Promise(r => setTimeout(r, OPEN_DELAY));
        }
    }
    openLoop();

    startBtn.addEventListener('click', () => {
        if (!selectedPack) return addLogLine('Select a capsule first.', 'error');
        running = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        addLogLine('Opener started.');
    });

    stopBtn.addEventListener('click', () => {
        running = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        addLogLine('Opener stopped.');
    });

    // === DRAG BOX ===
    (function drag(el) {
        let isDown = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
        el.style.cursor = 'move';
        el.addEventListener('mousedown', e => {
            if (['INPUT','SELECT','BUTTON'].includes(e.target.tagName)) return;
            isDown = true;
            startX = e.clientX; startY = e.clientY;
            startLeft = el.offsetLeft; startTop = el.offsetTop;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', e => {
            if (!isDown) return;
            el.style.left = startLeft + (e.clientX - startX) + 'px';
            el.style.top = startTop + (e.clientY - startY) + 'px';
            el.style.right = 'auto';
            el.style.bottom = 'auto';
            el.style.position = 'fixed';
        });
        document.addEventListener('mouseup', () => { if (isDown) { isDown=false; document.body.style.userSelect=''; }});
    })(box);

    // Footer
    const footer = document.createElement('div');
    footer.style.marginTop = '8px';
    footer.style.fontSize = '12px';
    footer.innerHTML = `Coded by <a href="https://github.com/bmincsfr/Triangulet" target="_blank">Bmincs</a>`;
    box.appendChild(footer);

    console.log('%cTriangulet opener loaded', 'font-size:16px;color:green');
})();
