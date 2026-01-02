// Phasmophobia Helper - Main Application Logic

// State Management
let state = {
    evidence: {
        selected: new Set(),
        ruled: new Set()
    },
    difficulty: 3,
    sanity: 100,
    behaviors: new Set(),
    bpm: {
        taps: [],
        value: 0
    },
    timers: {
        smudge: null,
        hunt: null,
        custom: null
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeEvidenceGrid();
    initializeBehaviorChecklist();
    initializeEventListeners();
    updateGhostResults();
});

// Evidence Grid Initialization
function initializeEvidenceGrid() {
    const grid = document.getElementById('evidenceGrid');
    grid.innerHTML = '';

    EVIDENCE_TYPES.forEach(evidence => {
        const item = document.createElement('div');
        item.className = 'evidence-item';
        item.dataset.evidence = evidence;

        item.innerHTML = `
            <div class="evidence-name">${evidence}</div>
            <div class="evidence-buttons">
                <button class="ev-btn ev-confirm" data-action="confirm">✓</button>
                <button class="ev-btn ev-rule-out" data-action="rule-out">✗</button>
            </div>
        `;

        grid.appendChild(item);
    });
}

// Behavior Checklist Initialization
function initializeBehaviorChecklist() {
    const container = document.getElementById('behaviorChecklist');
    container.innerHTML = '';

    BEHAVIOR_CHECKLIST.forEach(behavior => {
        const item = document.createElement('label');
        item.className = 'behavior-item';
        item.innerHTML = `
            <input type="checkbox" data-behavior="${behavior.id}">
            <span>${behavior.label}</span>
        `;
        container.appendChild(item);
    });
}

// Event Listeners
function initializeEventListeners() {
    // Evidence selection
    document.getElementById('evidenceGrid').addEventListener('click', handleEvidenceClick);

    // Difficulty change
    document.getElementById('difficulty').addEventListener('change', (e) => {
        state.difficulty = parseInt(e.target.value);
        updateGhostResults();
    });

    // Reset evidence
    document.getElementById('resetEvidence').addEventListener('click', resetEvidence);

    // BPM Tap
    document.getElementById('tapButton').addEventListener('click', handleBpmTap);
    document.getElementById('resetBpm').addEventListener('click', resetBpm);

    // Timers
    document.querySelectorAll('.btn-timer').forEach(btn => {
        btn.addEventListener('click', handleTimerClick);
    });

    // Sanity controls
    document.querySelectorAll('.btn-sanity').forEach(btn => {
        btn.addEventListener('click', handleSanityChange);
    });

    // Behavior checkboxes
    document.getElementById('behaviorChecklist').addEventListener('change', handleBehaviorChange);
}

// Evidence Click Handler
function handleEvidenceClick(e) {
    if (!e.target.classList.contains('ev-btn')) return;

    const item = e.target.closest('.evidence-item');
    const evidence = item.dataset.evidence;
    const action = e.target.dataset.action;

    if (action === 'confirm') {
        if (state.evidence.ruled.has(evidence)) {
            state.evidence.ruled.delete(evidence);
        }

        if (state.evidence.selected.has(evidence)) {
            state.evidence.selected.delete(evidence);
            item.classList.remove('confirmed');
        } else {
            state.evidence.selected.add(evidence);
            item.classList.add('confirmed');
            item.classList.remove('ruled-out');
        }
    } else if (action === 'rule-out') {
        if (state.evidence.selected.has(evidence)) {
            state.evidence.selected.delete(evidence);
        }

        if (state.evidence.ruled.has(evidence)) {
            state.evidence.ruled.delete(evidence);
            item.classList.remove('ruled-out');
        } else {
            state.evidence.ruled.add(evidence);
            item.classList.add('ruled-out');
            item.classList.remove('confirmed');
        }
    }

    updateGhostResults();
}

// Reset Evidence
function resetEvidence() {
    state.evidence.selected.clear();
    state.evidence.ruled.clear();
    document.querySelectorAll('.evidence-item').forEach(item => {
        item.classList.remove('confirmed', 'ruled-out');
    });
    updateGhostResults();
}

// BPM Tap Handler
function handleBpmTap() {
    const now = Date.now();
    state.bpm.taps.push(now);

    // Keep only last 10 taps
    if (state.bpm.taps.length > 10) {
        state.bpm.taps.shift();
    }

    // Calculate BPM if we have at least 2 taps
    if (state.bpm.taps.length >= 2) {
        const intervals = [];
        for (let i = 1; i < state.bpm.taps.length; i++) {
            intervals.push(state.bpm.taps[i] - state.bpm.taps[i-1]);
        }

        const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
        state.bpm.value = Math.round(60000 / avgInterval);

        updateBpmDisplay();
        updateGhostResults();
    }
}

// Reset BPM
function resetBpm() {
    state.bpm.taps = [];
    state.bpm.value = 0;
    updateBpmDisplay();
    updateGhostResults();
}

// Update BPM Display
function updateBpmDisplay() {
    document.getElementById('bpmValue').textContent = state.bpm.value;

    if (state.bpm.value === 0) {
        document.getElementById('bpmInfo').textContent = 'Tap the button to the heartbeat rhythm';
        document.getElementById('speedClass').innerHTML = '';
        return;
    }

    document.getElementById('bpmInfo').textContent = `${state.bpm.taps.length} taps recorded`;

    // Find matching speed classification
    const classification = SPEED_CLASSIFICATIONS.find(c => 
        state.bpm.value >= c.min && state.bpm.value <= c.max
    );

    if (classification) {
        document.getElementById('speedClass').innerHTML = `
            <div class="speed-match">
                <strong>${classification.name}</strong><br>
                Speed: ${classification.speed} m/s<br>
                Possible: ${classification.ghosts.join(', ')}
            </div>
        `;
    } else {
        document.getElementById('speedClass').innerHTML = `
            <div class="speed-no-match">
                No standard speed match. Tap more accurately.
            </div>
        `;
    }
}

// Timer Handlers
function handleTimerClick(e) {
    const timerType = e.target.dataset.timer;
    const displayId = `${timerType}Timer`;
    const display = document.getElementById(displayId);

    // Clear existing timer
    if (state.timers[timerType]) {
        clearInterval(state.timers[timerType]);
        state.timers[timerType] = null;
        e.target.textContent = 'Start';
        return;
    }

    // Get duration
    let duration;
    if (timerType === 'smudge') duration = 90;
    else if (timerType === 'hunt') duration = 25;
    else if (timerType === 'custom') {
        duration = parseInt(document.getElementById('customTimerInput').value) || 0;
        if (duration === 0) {
            alert('Please enter a valid duration');
            return;
        }
    }

    let remaining = duration;
    e.target.textContent = 'Stop';
    display.classList.add('timer-active');

    state.timers[timerType] = setInterval(() => {
        remaining--;
        display.textContent = `${remaining}s`;

        if (remaining <= 0) {
            clearInterval(state.timers[timerType]);
            state.timers[timerType] = null;
            e.target.textContent = 'Start';
            display.classList.remove('timer-active');
            display.classList.add('timer-complete');
            display.textContent = 'DONE!';

            // Play notification sound if available
            playNotification();

            setTimeout(() => {
                display.classList.remove('timer-complete');
                display.textContent = `${duration}s`;
            }, 2000);
        }
    }, 1000);
}

function playNotification() {
    // Optional: Add audio notification
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiN1O/If';
        audio.play();
    } catch (e) {
        // Ignore if audio fails
    }
}

// Sanity Change Handler
function handleSanityChange(e) {
    const change = e.target.dataset.change;

    if (change === '0') {
        state.sanity = 100;
    } else {
        state.sanity = Math.max(0, Math.min(100, state.sanity + parseInt(change)));
    }

    updateSanityDisplay();
    updateGhostResults();
}

// Update Sanity Display
function updateSanityDisplay() {
    const fill = document.getElementById('sanityFill');
    const value = document.getElementById('sanityValue');
    const warning = document.getElementById('sanityWarning');

    fill.style.width = `${state.sanity}%`;
    value.textContent = `${state.sanity}%`;

    // Color coding
    fill.className = 'sanity-fill';
    if (state.sanity <= 25) {
        fill.classList.add('critical');
        warning.textContent = '⚠️ CRITICAL - High hunt risk!';
    } else if (state.sanity <= 50) {
        fill.classList.add('low');
        warning.textContent = '⚠️ LOW - Hunts possible';
    } else if (state.sanity <= 75) {
        fill.classList.add('medium');
        warning.textContent = 'MEDIUM - Some ghosts can hunt';
    } else {
        fill.classList.add('high');
        warning.textContent = 'SAFE - Most ghosts cannot hunt yet';
    }
}

// Behavior Change Handler
function handleBehaviorChange(e) {
    const behaviorId = e.target.dataset.behavior;

    if (e.target.checked) {
        state.behaviors.add(behaviorId);
    } else {
        state.behaviors.delete(behaviorId);
    }

    updateGhostResults();
}

// Main Ghost Filtering Logic
function filterGhosts() {
    let possible = [...GHOSTS];

    // Filter by confirmed evidence
    if (state.evidence.selected.size > 0) {
        possible = possible.filter(ghost => {
            return [...state.evidence.selected].every(ev => 
                ghost.evidence.includes(ev)
            );
        });
    }

    // Filter by ruled out evidence
    if (state.evidence.ruled.size > 0) {
        possible = possible.filter(ghost => {
            return ![...state.evidence.ruled].some(ev => 
                ghost.evidence.includes(ev)
            );
        });
    }

    // Filter by BPM if available
    if (state.bpm.value > 0) {
        const matchingClassification = SPEED_CLASSIFICATIONS.find(c => 
            state.bpm.value >= c.min && state.bpm.value <= c.max
        );

        if (matchingClassification) {
            possible = possible.filter(ghost => 
                matchingClassification.ghosts.includes(ghost.name)
            );
        }
    }

    return possible;
}

// Calculate Ghost Likelihood
function calculateLikelihood(ghost) {
    let score = 100;
    let factors = [];

    // Evidence match scoring
    const confirmedMatch = [...state.evidence.selected].every(ev => 
        ghost.evidence.includes(ev)
    );
    const ruledOutMatch = ![...state.evidence.ruled].some(ev => 
        ghost.evidence.includes(ev)
    );

    if (!confirmedMatch || !ruledOutMatch) {
        return { score: 0, factors: ['Does not match evidence'] };
    }

    // Difficulty-based evidence scoring
    const evidenceCount = state.evidence.selected.size;
    if (evidenceCount === state.difficulty) {
        score += 20;
        factors.push('Exact evidence count match');
    } else if (evidenceCount > state.difficulty) {
        score += 10;
        factors.push('Extra evidence found');
    }

    // Behavior matching
    let behaviorMatches = 0;
    state.behaviors.forEach(behaviorId => {
        const behavior = BEHAVIOR_CHECKLIST.find(b => b.id === behaviorId);
        if (behavior && behavior.suggestGhosts.includes(ghost.name)) {
            behaviorMatches++;
            score += 15;
        }
    });

    if (behaviorMatches > 0) {
        factors.push(`${behaviorMatches} behavior(s) match`);
    }

    // BPM matching
    if (state.bpm.value > 0) {
        const matchingClass = SPEED_CLASSIFICATIONS.find(c => 
            state.bpm.value >= c.min && state.bpm.value <= c.max
        );

        if (matchingClass && matchingClass.ghosts.includes(ghost.name)) {
            score += 25;
            factors.push('Hunt speed matches');
        }
    }

    // Sanity threshold matching
    if (state.sanity < ghost.huntThreshold) {
        score += 10;
        factors.push('Can hunt at current sanity');
    } else {
        score -= 5;
        factors.push('Cannot hunt yet');
    }

    // The Mimic special case (4 evidence)
    if (ghost.name === 'The Mimic') {
        if (state.evidence.selected.size === 4 || 
            (state.evidence.selected.has('Ghost Orb') && evidenceCount >= 3)) {
            score += 30;
            factors.push('4th evidence (Ghost Orbs) suggests Mimic');
        }
    }

    return {
        score: Math.min(100, Math.max(0, score)),
        factors: factors
    };
}

// Update Ghost Results Display
function updateGhostResults() {
    const possible = filterGhosts();
    const container = document.getElementById('ghostResults');
    const countDisplay = document.getElementById('ghostCount');

    countDisplay.textContent = `${possible.length} possible ghost${possible.length !== 1 ? 's' : ''}`;

    if (possible.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No matching ghosts found.</p>
                <p>Check your evidence selections or try ruling out less evidence.</p>
            </div>
        `;
        return;
    }

    // Calculate likelihood for each ghost
    const ghostsWithLikelihood = possible.map(ghost => ({
        ...ghost,
        likelihood: calculateLikelihood(ghost)
    }));

    // Sort by likelihood score
    ghostsWithLikelihood.sort((a, b) => b.likelihood.score - a.likelihood.score);

    // Display results
    container.innerHTML = ghostsWithLikelihood.map(ghost => `
        <div class="ghost-card ${ghost.likelihood.score >= 70 ? 'high-likelihood' : ''}">
            <div class="ghost-header">
                <h3>${ghost.name}</h3>
                <div class="likelihood-badge ${
                    ghost.likelihood.score >= 80 ? 'very-high' :
                    ghost.likelihood.score >= 60 ? 'high' :
                    ghost.likelihood.score >= 40 ? 'medium' : 'low'
                }">
                    ${ghost.likelihood.score}% likely
                </div>
            </div>

            <div class="ghost-evidence">
                <strong>Evidence:</strong>
                ${ghost.evidence.map(ev => `
                    <span class="evidence-tag ${state.evidence.selected.has(ev) ? 'confirmed' : ''}">${ev}</span>
                `).join('')}
            </div>

            <div class="ghost-stats">
                <div class="stat">
                    <span class="stat-label">Hunt Threshold:</span>
                    <span class="stat-value ${state.sanity < ghost.huntThreshold ? 'danger' : ''}">${ghost.huntThreshold}%</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Base Speed:</span>
                    <span class="stat-value">${ghost.speed} m/s</span>
                </div>
            </div>

            ${ghost.likelihood.factors.length > 0 ? `
                <div class="likelihood-factors">
                    <strong>Why this might be it:</strong>
                    <ul>
                        ${ghost.likelihood.factors.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <details class="ghost-behaviors">
                <summary><strong>Behaviors & Abilities</strong></summary>
                <ul>
                    ${ghost.behaviors.map(b => `<li>${b}</li>`).join('')}
                </ul>
            </details>

            <details class="ghost-giveaways">
                <summary><strong>Key Giveaways</strong></summary>
                <ul>
                    ${ghost.keyGiveaways.map(g => `<li>${g}</li>`).join('')}
                </ul>
            </details>
        </div>
    `).join('');
}

// Initialize sanity display
updateSanityDisplay();
