const evidenceTypes = ["EMF 5","DOTS","Freezing","Spirit Box","UV","Ghost Orbs","Ghost Writing"];
const evidencePanel = document.getElementById('evidence-panel');
const ghostList = document.getElementById('ghost-list');
const ranked = document.getElementById('ranked-ghosts');
const modal = document.getElementById('ghost-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.getElementById('close-modal');

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
  modalBody.innerHTML = `
    ${g.name}
    ---------

    **Unique Traits:**  
    ${g.traits.join('  \n')}

    **☠️ Dead Giveaway:** ${g.giveaway}

    **🧪 Tests:**  
    ${g.tests.join('  \n')}

    **🚫 Not If:**  
    ${g.notIf.join('  \n')}

    **⚠️ Alike:** ${g.alike.join(', ')}
  `;
}

closeBtn.onclick = () => modal.classList.add('hidden');
render();
