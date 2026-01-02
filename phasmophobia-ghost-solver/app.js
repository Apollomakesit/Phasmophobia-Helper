const evidenceTypes = ["EMF 5","DOTS","Freezing","Spirit Box","UV","Ghost Orbs","Ghost Writing"];
const evidencePanel = document.getElementById('evidence-panel');
const ghostList = document.getElementById('ghost-list');
const ranked = document.getElementById('ranked-ghosts');
const modal = document.getElementById('ghost-modal');
const modalBody = document.getElementById('modal-body');

evidenceTypes.forEach(e => {
  const div = document.createElement('div');
  div.className = 'evidence';
  div.textContent = e;
  div.onclick = () => {
    div.classList.toggle('active');
    selectedEvidence.includes(e) ? selectedEvidence = selectedEvidence.filter(x=>x!==e) : selectedEvidence.push(e);
    render();
  };
  evidencePanel.appendChild(div);
});

function render() {
  const solved = solve();
  ghostList.innerHTML = '';
  ranked.innerHTML = '';
  solved.forEach((g,i)=>{
    const card = document.createElement('div');
    card.className = 'ghost'+(g.score<0?' greyed':'');
    card.textContent = g.name;
    card.onclick = () => openModal(g);
    ghostList.appendChild(card);
    if(i<3 && g.score>0) ranked.innerHTML += `<div>${g.name}</div>`;
  });
}

function openModal(g) {
  modal.classList.remove('hidden');
  modalBody.innerHTML = `<h2>${g.name}</h2>
<p><b>Unique Traits:</b><br>${g.traits.join('<br>')}</p>
<p><b>☠️ Dead Giveaway:</b> ${g.giveaway}</p>
<p><b>🧪 Tests:</b><br>${g.tests.join('<br>')}</p>
<p><b>🚫 Not If:</b><br>${g.notIf.join('<br>')}</p>
<p><b>⚠️ Alike:</b> ${g.alike.join(', ')}</p>`;
}
document.getElementById('close-modal').onclick = ()=>modal.classList.add('hidden');
render();