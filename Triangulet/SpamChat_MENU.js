(async function TriModMenu() {
    if (typeof triangulet === 'undefined' || !triangulet.tokenraw) {
        alert('triangulet.tokenraw not found. Run this where triangulet is defined.');
        return;
    }

    // === GLOBAL CONFIG ===
    window.triSpamConfig = {
        message: "ever wanted hacks for triangulet? well here you go! use https://trian.neocities.org/ , https://github.com/bmincsfr/Triangulet/ , or https://blacket.neocities.org/ for hacks or cheats on triangulet!! Make sure to check out Blueket! https://blueket.neocities.org/ The fist Blue Blooket Private Server Ever Created by Bmincs"
    };

    // === MODULES ===
    const modules = {};

    // 3s spam
    modules.triChatSpam3s = (function(){
        const INTERVAL_MS = 3000; let interval=null;
        function findInput(){return document.querySelector("#chat-input")||document.querySelector("input[type='text'], textarea");}
        function simulateEnter(el){el.focus();["keydown","keypress","keyup"].forEach(type=>{el.dispatchEvent(new KeyboardEvent(type,{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true}));});}
        function send(){const MESSAGE=window.triSpamConfig.message; const input=findInput(); if(!input)return false; input.value=MESSAGE; input.dispatchEvent(new Event("input",{bubbles:true})); input.dispatchEvent(new Event("change",{bubbles:true})); simulateEnter(input); return true;}
        return {start(){if(interval)return; send(); interval=setInterval(send,INTERVAL_MS); console.log("[3s Spam] started.");}, stop(){if(!interval)return; clearInterval(interval); interval=null; console.log("[3s Spam] stopped.");}, name:"Auto Chat Spammer (3s)"};
    })();

    // 5s spam
    modules.triChatSpam5s = (function(){
        const INTERVAL_MS = 5000; let interval=null;
        function findInput(){return document.querySelector("#chat-input")||document.querySelector("input[type='text'], textarea");}
        function simulateEnter(el){el.focus();["keydown","keypress","keyup"].forEach(type=>{el.dispatchEvent(new KeyboardEvent(type,{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true}));});}
        function send(){const MESSAGE=window.triSpamConfig.message; const input=findInput(); if(!input)return false; input.value=MESSAGE; input.dispatchEvent(new Event("input",{bubbles:true})); input.dispatchEvent(new Event("change",{bubbles:true})); simulateEnter(input); return true;}
        return {start(){if(interval)return; send(); interval=setInterval(send,INTERVAL_MS); console.log("[5s Spam] started.");}, stop(){if(!interval)return; clearInterval(interval); interval=null; console.log("[5s Spam] stopped.");}, name:"Auto Chat Spammer (5s)"};
    })();

    // 10s spam
    modules.triChatSpam10s = (function(){
        const INTERVAL_MS = 10000; let interval=null;
        function findInput(){return document.querySelector("#chat-input")||document.querySelector("input[type='text'], textarea");}
        function simulateEnter(el){el.focus();["keydown","keypress","keyup"].forEach(type=>{el.dispatchEvent(new KeyboardEvent(type,{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true}));});}
        function send(){const MESSAGE=window.triSpamConfig.message; const input=findInput(); if(!input)return false; input.value=MESSAGE; input.dispatchEvent(new Event("input",{bubbles:true})); input.dispatchEvent(new Event("change",{bubbles:true})); simulateEnter(input); return true;}
        return {start(){if(interval)return; send(); interval=setInterval(send,INTERVAL_MS); console.log("[10s Spam] started.");}, stop(){if(!interval)return; clearInterval(interval); interval=null; console.log("[10s Spam] stopped.");}, name:"Auto Chat Spammer (10s)"};
    })();

    // === CREATE UI ===
    const box = document.createElement("div");
    Object.assign(box.style,{
        position:"fixed", top:"10px", right:"10px", width:"280px",
        padding:"10px", background:"#1e1e1e", color:"#eee",
        border:"2px solid #444", borderRadius:"12px", zIndex:"2147483647",
        fontFamily:"Nunito,sans-serif", boxShadow:"0 6px 18px rgba(0,0,0,0.8)",
        display:"flex", flexDirection:"column", gap:"6px", maxWidth:"400px", maxHeight:"600px",
        overflow:"auto", resize:"both"
    });
    document.body.appendChild(box);

    // Header
    const headerContainer = document.createElement("div");
    headerContainer.style.display="flex"; headerContainer.style.justifyContent="space-between"; headerContainer.style.alignItems="center";
    box.appendChild(headerContainer);

    const header = document.createElement("h4");
    header.textContent="Triangulet Mod Menu by Bmincs";
    header.style.margin="0"; header.style.flex="1"; header.style.fontSize="14px"; header.style.userSelect="none";
    headerContainer.appendChild(header);

    const btnsContainer = document.createElement("div"); btnsContainer.style.display="flex"; btnsContainer.style.gap="4px";
    headerContainer.appendChild(btnsContainer);

    const minimizeBtn=document.createElement("button"); minimizeBtn.textContent="–";
    Object.assign(minimizeBtn.style,{cursor:"pointer",fontWeight:"bold",fontSize:"16px",border:"none",background:"transparent",color:"#eee"});
    btnsContainer.appendChild(minimizeBtn);

    const closeBtn=document.createElement("button"); closeBtn.textContent="×";
    Object.assign(closeBtn.style,{cursor:"pointer",fontWeight:"bold",fontSize:"16px",border:"none",background:"transparent",color:"#f33"});
    btnsContainer.appendChild(closeBtn);

    const content = document.createElement("div"); content.style.display="flex"; content.style.flexDirection="column"; content.style.gap="6px";
    box.appendChild(content);

    // === SPAM CONTROLS ===
    const spamContainer=document.createElement("div"); spamContainer.style.display="flex"; spamContainer.style.flexDirection="column"; spamContainer.style.gap="4px";
    content.appendChild(spamContainer);

    Object.keys(modules).forEach(key=>{
        const mod=modules[key];
        const wrapper=document.createElement("div"); wrapper.style.display="flex"; wrapper.style.alignItems="center"; wrapper.style.gap="6px";
        const checkbox=document.createElement("input"); checkbox.type="checkbox";
        checkbox.addEventListener("change",()=>{checkbox.checked?mod.start():mod.stop();});
        const label=document.createElement("label"); label.textContent=mod.name;
        wrapper.appendChild(checkbox); wrapper.appendChild(label); spamContainer.appendChild(wrapper);
    });

    // === MESSAGE INPUT BOX ===
    const msgLabel=document.createElement("div"); msgLabel.textContent="Spam Message:"; msgLabel.style.marginTop="10px"; msgLabel.style.fontSize="14px"; msgLabel.style.color="#fff";
    const msgInput=document.createElement("input"); msgInput.type="text"; msgInput.value=window.triSpamConfig.message;
    Object.assign(msgInput.style,{
        width:"95%", padding:"6px", marginTop:"4px", borderRadius:"6px", border:"1px solid #555", background:"#222", color:"#fff"
    });
    msgInput.addEventListener("input",()=>{window.triSpamConfig.message=msgInput.value; console.log("[Spam Message Updated]:", msgInput.value);});
    content.appendChild(msgLabel); content.appendChild(msgInput);

    // === LOG WINDOW ===
    const logs=document.createElement("div");
    Object.assign(logs.style,{maxHeight:"140px", overflow:"auto", background:"#222", padding:"6px", borderRadius:"6px", fontSize:"12px", color:"#eee"});
    logs.textContent="No actions yet."; content.appendChild(logs);

    function addLog(text,type="info"){
        const el=document.createElement("div"); el.textContent=text;
        if(type==="error") el.style.color="#f55";
        logs.appendChild(el); logs.scrollTop=logs.scrollHeight;
    }

    // === BUTTONS ===
    minimizeBtn.addEventListener("click",()=>{
        content.style.display=content.style.display==="none"?"flex":"none";
        box.style.width=content.style.display==="none"?"140px":"280px";
    });

    closeBtn.addEventListener("click",()=>{box.remove();});

    // === DRAGGING ===
    (function drag(el){
        let isDown=false,startX=0,startY=0,startLeft=0,startTop=0;
        el.style.cursor="move";
        header.addEventListener("mousedown",e=>{
            if(["INPUT","SELECT","BUTTON"].includes(e.target.tagName)) return;
            isDown=true; startX=e.clientX; startY=e.clientY; startLeft=el.offsetLeft; startTop=el.offsetTop;
            document.body.style.userSelect="none";
        });
        document.addEventListener("mousemove",e=>{
            if(!isDown) return;
            el.style.left=startLeft+(e.clientX-startX)+"px";
            el.style.top=startTop+(e.clientY-startY)+"px";
            el.style.right="auto"; el.style.bottom="auto"; el.style.position="fixed";
        });
        document.addEventListener("mouseup",()=>{if(isDown){isDown=false; document.body.style.userSelect="";}});
    })(box);

    // === FOOTER ===
    const footer=document.createElement("div"); footer.style.marginTop="6px"; footer.style.fontSize="11px";
    footer.innerHTML=`Coded by <a href="https://github.com/bmincsfr/Triangulet" target="_blank" style="color:#6cf">Bmincs</a>`;
    content.appendChild(footer);

    console.log("%cTriangulet Mod Menu loaded","font-size:16px;color:green");
})();
