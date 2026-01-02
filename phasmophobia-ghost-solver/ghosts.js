// Complete Ghost Database with New Ghosts (Obambo, Gallu, Dayan)
const EVIDENCE_TYPES = [
    'EMF Level 5',
    'D.O.T.S Projector',
    'Fingerprints',
    'Ghost Orb',
    'Ghost Writing',
    'Freezing Temperatures',
    'Spirit Box'
];

const GHOSTS = [
    {
        name: 'Spirit',
        evidence: ['EMF Level 5', 'Ghost Writing', 'Spirit Box'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Smudge stick prevents hunting for 180 seconds (vs normal 90s)',
            'No special hunt behavior',
            'Cannot hunt if smudged'
        ],
        keyGiveaways: [
            'Extended smudge timer effectiveness',
            'Completely normal hunt patterns',
            'No unique abilities or tells'
        ]
    },
    {
        name: 'Wraith',
        evidence: ['EMF Level 5', 'D.O.T.S Projector', 'Spirit Box'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Can teleport to random player',
            'Never touches the ground (no footstep sounds on salt)',
            'Can step in salt but won't leave UV footprints'
        ],
        keyGiveaways: [
            'EMF 2 reading from random teleport far from ghost room',
            'Salt disturbed but no footprints',
            'Sudden EMF spikes from unexpected locations'
        ]
    },
    {
        name: 'Phantom',
        evidence: ['Spirit Box', 'Fingerprints', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Taking photo during event makes it disappear',
            'Flickers less frequently during hunts',
            'Roams to random players more often',
            'Drains sanity faster when looking at it during events'
        ],
        keyGiveaways: [
            'Disappears immediately when photographed',
            'Visible for longer periods during hunts',
            'Heavy sanity drain during manifestations'
        ]
    },
    {
        name: 'Poltergeist',
        evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Throws multiple objects at once',
            'Can throw objects with great force',
            'Reduces sanity significantly when throwing many items',
            'Very active with props'
        ],
        keyGiveaways: [
            'Multiple objects thrown simultaneously',
            'Heavy sanity drops from object throws',
            'Extremely high object interaction rate'
        ]
    },
    {
        name: 'Banshee',
        evidence: ['Fingerprints', 'Ghost Orb', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Targets one specific player until they die',
            'Singing parabolic microphone sound',
            'Can hunt at any sanity if target is in the house',
            'Crucifix range 5m instead of 3m',
            'Female ghost model only'
        ],
        keyGiveaways: [
            'Unique singing detected on parabolic mic',
            'Always chases same player',
            'Ignores closer players to reach target',
            'Extended crucifix range'
        ]
    },
    {
        name: 'Jinn',
        evidence: ['EMF Level 5', 'Fingerprints', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Cannot turn off breaker',
            'Moves faster (2.5 m/s) if target is far and breaker is on',
            'Slows to normal speed when close',
            'Drops sanity by 25% if near player with breaker on'
        ],
        keyGiveaways: [
            'Breaker never turns off naturally',
            'Extremely fast approach from distance',
            'Sudden speed drop when close',
            'Major sanity drop ability with breaker on'
        ]
    },
    {
        name: 'Mare',
        evidence: ['Spirit Box', 'Ghost Orb', 'Ghost Writing'],
        huntThreshold: 40,
        speed: 1.7,
        behaviors: [
            'Turns lights off more frequently',
            'Cannot turn lights on',
            'Hunts at 60% sanity with lights off',
            'Hunts at 40% sanity with lights on',
            'More active in darkness'
        ],
        keyGiveaways: [
            'Lights constantly turned off',
            'Never turns lights on',
            'Early hunts in darkness',
            'Immediate light switches off when turned on'
        ]
    },
    {
        name: 'Revenant',
        evidence: ['Ghost Orb', 'Ghost Writing', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.0,
        behaviors: [
            'Very slow (1.0 m/s) when not chasing',
            'Extremely fast (3.0 m/s) when chasing visible player',
            'Switches between speeds during hunt'
        ],
        keyGiveaways: [
            'Dramatically different speeds during same hunt',
            'Incredibly fast when chasing',
            'Very slow when searching',
            'Speed changes based on line of sight'
        ]
    },
    {
        name: 'Shade',
        evidence: ['EMF Level 5', 'Ghost Writing', 'Freezing Temperatures'],
        huntThreshold: 35,
        speed: 1.7,
        behaviors: [
            'Very shy - less active with multiple people nearby',
            'Cannot hunt if multiple people in same room',
            'Won't perform events if players in room',
            'Prefers to appear when player is alone'
        ],
        keyGiveaways: [
            'Much less active with group together',
            'Only appears when players separate',
            'Hunts stop if players group up',
            'Minimal activity in populated areas'
        ]
    },
    {
        name: 'Demon',
        evidence: ['Fingerprints', 'Ghost Writing', 'Freezing Temperatures'],
        huntThreshold: 70,
        speed: 1.7,
        behaviors: [
            'Can hunt at any sanity level (70% threshold)',
            'Minimum hunt cooldown 20s instead of 25s',
            'Smudge only prevents hunting for 60s instead of 90s',
            'Crucifix range 5m instead of 3m',
            'Very aggressive'
        ],
        keyGiveaways: [
            'Hunts very early (high sanity)',
            'Frequent hunts with short cooldowns',
            'Can hunt multiple times quickly',
            'Smudge less effective'
        ]
    },
    {
        name: 'Yurei',
        evidence: ['Ghost Orb', 'Freezing Temperatures', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Drains sanity faster when near players',
            'Can close doors during hunts',
            'Smudging confines it to room for 90s',
            'More active in draining sanity'
        ],
        keyGiveaways: [
            'Rapid sanity drain',
            'Doors closing fully during investigation',
            'Abnormally fast sanity loss near ghost room'
        ]
    },
    {
        name: 'Oni',
        evidence: ['EMF Level 5', 'Freezing Temperatures', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Very active with people around',
            'Throws objects with more force',
            'Never performs airball event (disappearing mist)',
            'More visible during hunts (longer flicker intervals)',
            'Drains sanity more with activity'
        ],
        keyGiveaways: [
            'No small orb events',
            'Very active when players present',
            'Objects thrown far',
            'Longer visibility during hunts'
        ]
    },
    {
        name: 'Yokai',
        evidence: ['Spirit Box', 'Ghost Orb', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Can only hear voices/electronics within 2.5m during hunt',
            'More active when players talk nearby',
            'Hunts at 80% sanity when people talk near it',
            'Deaf to equipment during hunts'
        ],
        keyGiveaways: [
            'Hunt triggered by talking near ghost room',
            'Can't hear you unless very close during hunt',
            'Activity increases with voice chat',
            'Early hunts when talking'
        ]
    },
    {
        name: 'Hantu',
        evidence: ['Fingerprints', 'Ghost Orb', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.4,
        behaviors: [
            'Moves faster in cold (2.7 m/s max in freezing)',
            'Moves slower in warm areas (1.4 m/s)',
            'Never turns on breaker',
            'Visible freezing breath in any room during hunt'
        ],
        keyGiveaways: [
            'Breaker never turns on',
            'Visible breath during hunts',
            'Speed varies by temperature',
            'Much faster in cold rooms'
        ]
    },
    {
        name: 'Goryo',
        evidence: ['EMF Level 5', 'Fingerprints', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'D.O.T.S only visible through camera (not with naked eye)',
            'Cannot change favorite rooms',
            'Never roams far from ghost room',
            'D.O.T.S only shows when no one in room'
        ],
        keyGiveaways: [
            'D.O.T.S only on camera, never in person',
            'Stays in one area consistently',
            'No roaming to other rooms',
            'D.O.T.S appears only when room empty'
        ]
    },
    {
        name: 'Myling',
        evidence: ['EMF Level 5', 'Fingerprints', 'Ghost Writing'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Footsteps and vocalizations only audible within 12m during hunt',
            'Very quiet during hunts',
            'More active on parabolic microphone',
            'Silent hunts at distance'
        ],
        keyGiveaways: [
            'Can't hear it coming during hunts',
            'Very quiet footsteps',
            'Frequent para mic activity',
            'Silent until very close'
        ]
    },
    {
        name: 'Onryo',
        evidence: ['Spirit Box', 'Ghost Orb', 'Freezing Temperatures'],
        huntThreshold: 60,
        speed: 1.7,
        behaviors: [
            'Blowing out candle can cause hunt',
            'Third candle blown triggers hunt attempt',
            'Lit candle within 4m acts as crucifix',
            'More likely to blow out flames',
            'Cannot hunt near lit candle'
        ],
        keyGiveaways: [
            'Candles repeatedly blown out',
            'Hunt after third candle extinguish',
            'Obsessed with flames',
            'Multiple flame interactions'
        ]
    },
    {
        name: 'The Twins',
        evidence: ['EMF Level 5', 'Spirit Box', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.5,
        behaviors: [
            'Two separate entities that interact',
            'One faster (1.9 m/s), one slower (1.5 m/s)',
            'Can interact in two places at once',
            'Different hunt speeds',
            'Interactions from different locations'
        ],
        keyGiveaways: [
            'Simultaneous interactions in different rooms',
            'Inconsistent hunt speeds',
            'EMF readings from two locations',
            'Different speeds between hunts'
        ]
    },
    {
        name: 'Raiju',
        evidence: ['EMF Level 5', 'Ghost Orb', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Moves faster near active electronics (2.5 m/s)',
            'Disrupts electronics from further away (15m)',
            'Hunts at 65% sanity near active equipment',
            'Speed boost with nearby electronics'
        ],
        keyGiveaways: [
            'Speed increases near electronics',
            'Equipment disrupts from far away',
            'Early hunts with equipment nearby',
            'Fast during hunts with active gear'
        ]
    },
    {
        name: 'Obake',
        evidence: ['EMF Level 5', 'Fingerprints', 'Ghost Orb'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Fingerprints disappear faster (50% chance after 60s)',
            'Can leave 6-finger prints',
            'Can shapeshift into different ghost models',
            '16.7% chance no fingerprints despite touching',
            'Reduces hunt flicker time by 25%'
        ],
        keyGiveaways: [
            '6-finger handprints',
            'Fingerprints disappear early',
            'Different ghost models seen',
            'Model changes during hunt',
            'Fingerprints vanish quickly'
        ]
    },
    {
        name: 'The Mimic',
        evidence: ['Spirit Box', 'Fingerprints', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Mimics other ghost behaviors',
            'ALWAYS shows Ghost Orbs as 4th evidence',
            'Changes behavior frequently',
            'Can display any ghost ability',
            'Unpredictable behavior patterns'
        ],
        keyGiveaways: [
            'Ghost Orbs with non-orb evidence combo',
            '4 evidence total',
            'Conflicting behaviors',
            'Behavior changes mid-investigation',
            'Unpredictable characteristics'
        ]
    },
    {
        name: 'Moroi',
        evidence: ['Spirit Box', 'Ghost Writing', 'Freezing Temperatures'],
        huntThreshold: 50,
        speed: 1.5,
        behaviors: [
            'Curses player who hears Spirit Box response',
            'Cursed players lose sanity twice as fast',
            'Speed increases as average sanity drops (1.5 to 2.25 m/s)',
            'Smudging blinds it for longer during hunt',
            'Sanity pills remove curse'
        ],
        keyGiveaways: [
            'Rapid sanity drain after Spirit Box',
            'Speeds up as sanity drops',
            'Accelerating hunts',
            'Faster at lower sanity',
            'Curse effect on specific player'
        ]
    },
    {
        name: 'Deogen',
        evidence: ['Spirit Box', 'Ghost Writing', 'D.O.T.S Projector'],
        huntThreshold: 40,
        speed: 3.0,
        behaviors: [
            'Always knows where players are',
            'Very fast when far (3.0 m/s)',
            'Very slow when close (0.4 m/s)',
            'Unique heavy breathing Spirit Box response',
            'Cannot be looped',
            'Teleports to player at hunt start'
        ],
        keyGiveaways: [
            'Heavy breathing on Spirit Box',
            'Always finds you immediately',
            'Extremely slow when near',
            'Fast approach then crawling speed',
            'Can't be juked or looped'
        ]
    },
    {
        name: 'Thaye',
        evidence: ['Ghost Orb', 'Ghost Writing', 'D.O.T.S Projector'],
        huntThreshold: 75,
        speed: 2.75,
        behaviors: [
            'Becomes less active over time',
            'Ages every 1-2 minutes',
            'Starts very fast (2.75 m/s) and active',
            'Ends slow (1.0 m/s) and passive',
            'Hunt threshold drops from 75% to 15%',
            'Speed decreases with age'
        ],
        keyGiveaways: [
            'Very active and fast early',
            'Activity decreases over time',
            'Early hunts then stops',
            'Speed dramatically decreases',
            'Ouija board shows aging'
        ]
    },
    {
        name: 'Obambo',
        evidence: ['Ghost Writing', 'Fingerprints', 'D.O.T.S Projector'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Alternates between aggressive and docile states every 2 minutes',
            'AGGRESSIVE: Hunts above 65% sanity, moves at 1.96 m/s, very active',
            'DOCILE: Hunts below 10% sanity, moves at 1.45 m/s, less active',
            'Can change states mid-hunt',
            'State changes affect all behaviors',
            'Countdown timer visible to all players for state'
        ],
        keyGiveaways: [
            'Dramatic behavior changes every 2 minutes',
            'Sudden hunt threshold changes',
            'Speed changes mid-hunt',
            'Activity fluctuates regularly',
            'Hunt pattern inconsistency on timer',
            'Visible countdown above ghost model'
        ]
    },
    {
        name: 'Gallu',
        evidence: ['EMF Level 5', 'Fingerprints', 'Spirit Box'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Enters "enraged" state when players use defensive equipment',
            'ENRAGED: Crucifixes and smudge sticks 50% less effective',
            'Lasts 20 seconds after equipment use',
            'After rage ends, enters "exhausted" state',
            'EXHAUSTED: Defensive items 50% MORE effective',
            'Cycles between normal, enraged, and exhausted',
            'Orange glow when enraged'
        ],
        keyGiveaways: [
            'Crucifix burns but hunt still starts',
            'Smudge doesn't stop hunt normally',
            'Orange visual glow during rage',
            'Extended smudge effect other times',
            'Defensive item inconsistency',
            'Pattern: normal -> enrage -> exhaust'
        ]
    },
    {
        name: 'Dayan',
        evidence: ['EMF Level 5', 'Ghost Orb', 'Spirit Box'],
        huntThreshold: 50,
        speed: 1.7,
        behaviors: [
            'Speed changes based on player movement within 10m',
            'Speeds up to 2.0 m/s when players move',
            'Slows to 1.4 m/s when players stand still',
            'Always appears as female ghost model',
            'Movement detection is constant during hunt',
            'Encourages standing still during hunts'
        ],
        keyGiveaways: [
            'Speed increases when you move',
            'Slows dramatically when standing still',
            'Always female model',
            'Success hiding in place',
            'Failure when trying to run',
            'Speed fluctuates with player actions',
            'Best counter is standing motionless'
        ]
    }
];

// Hunt speed classifications for BPM
const SPEED_CLASSIFICATIONS = [
    { name: 'Revenant (Roaming)', min: 0, max: 65, speed: 1.0, ghosts: ['Revenant'] },
    { name: 'Hantu (Warm)', min: 66, max: 90, speed: 1.4, ghosts: ['Hantu'] },
    { name: 'Obambo (Docile)', min: 70, max: 95, speed: 1.45, ghosts: ['Obambo'] },
    { name: 'Moroi/Twins (Slow)', min: 85, max: 105, speed: 1.5, ghosts: ['Moroi', 'The Twins'] },
    { name: 'Standard Speed', min: 95, max: 115, speed: 1.7, ghosts: ['Spirit', 'Wraith', 'Phantom', 'Poltergeist', 'Banshee', 'Jinn', 'Mare', 'Demon', 'Yurei', 'Oni', 'Yokai', 'Myling', 'Onryo', 'Raiju', 'Obake', 'The Mimic', 'Deogen', 'Thaye', 'Gallu', 'Dayan'] },
    { name: 'Twins (Fast)', min: 105, max: 125, speed: 1.9, ghosts: ['The Twins'] },
    { name: 'Obambo (Aggressive)', min: 110, max: 130, speed: 1.96, ghosts: ['Obambo'] },
    { name: 'Dayan (Moving)', min: 112, max: 132, speed: 2.0, ghosts: ['Dayan'] },
    { name: 'Moroi/Thaye', min: 120, max: 145, speed: 2.25, ghosts: ['Moroi', 'Thaye'] },
    { name: 'Jinn/Raiju (Far)', min: 135, max: 165, speed: 2.5, ghosts: ['Jinn', 'Raiju'] },
    { name: 'Hantu (Cold)', min: 145, max: 175, speed: 2.7, ghosts: ['Hantu'] },
    { name: 'Thaye (Young)', min: 150, max: 180, speed: 2.75, ghosts: ['Thaye'] },
    { name: 'Revenant (Chasing)', min: 160, max: 195, speed: 3.0, ghosts: ['Revenant', 'Deogen'] }
];

// Behavioral checklist items
const BEHAVIOR_CHECKLIST = [
    { id: 'multiObject', label: 'Multiple objects thrown at once', suggestGhosts: ['Poltergeist'] },
    { id: 'singing', label: 'Singing sound on parabolic mic', suggestGhosts: ['Banshee'] },
    { id: 'lightsOff', label: 'Constantly turns lights off', suggestGhosts: ['Mare'] },
    { id: 'lightsNeverOn', label: 'Never turns lights on', suggestGhosts: ['Mare', 'Jinn'] },
    { id: 'breakerOff', label: 'Breaker turns off frequently', suggestGhosts: [] },
    { id: 'breakerNeverOff', label: 'Breaker never turns off', suggestGhosts: ['Jinn'] },
    { id: 'breakerNeverOn', label: 'Breaker never turns on', suggestGhosts: ['Hantu'] },
    { id: 'sixFingers', label: 'Six-fingered handprints', suggestGhosts: ['Obake'] },
    { id: 'fingerDisappear', label: 'Fingerprints disappeared quickly', suggestGhosts: ['Obake'] },
    { id: 'shapeshift', label: 'Different ghost models seen', suggestGhosts: ['Obake'] },
    { id: 'fourEvidence', label: 'Found 4th evidence (Ghost Orbs)', suggestGhosts: ['The Mimic'] },
    { id: 'heavyBreathing', label: 'Heavy breathing on Spirit Box', suggestGhosts: ['Deogen'] },
    { id: 'alwaysFinds', label: 'Always finds players instantly', suggestGhosts: ['Deogen'] },
    { id: 'earlyHunts', label: 'Hunts at very high sanity', suggestGhosts: ['Demon', 'Yokai', 'Raiju', 'Thaye', 'Obambo'] },
    { id: 'frequentHunts', label: 'Hunts very frequently', suggestGhosts: ['Demon'] },
    { id: 'quietHunt', label: 'Very quiet during hunts', suggestGhosts: ['Myling'] },
    { id: 'candlesOut', label: 'Repeatedly blows out candles', suggestGhosts: ['Onryo'] },
    { id: 'speedChanges', label: 'Speed changes during hunt', suggestGhosts: ['Revenant', 'Moroi', 'Hantu', 'Thaye', 'Obambo', 'Dayan'] },
    { id: 'twoLocations', label: 'Interactions in two places at once', suggestGhosts: ['The Twins'] },
    { id: 'rapidSanity', label: 'Rapid sanity drain', suggestGhosts: ['Yurei', 'Moroi'] },
    { id: 'stateChanges', label: 'Behavior changes every 2 minutes', suggestGhosts: ['Obambo'] },
    { id: 'defenseFails', label: 'Crucifix/smudge less effective', suggestGhosts: ['Gallu'] },
    { id: 'orangeGlow', label: 'Orange glow during hunt', suggestGhosts: ['Gallu'] },
    { id: 'stillWorks', label: 'Standing still slows ghost', suggestGhosts: ['Dayan'] },
    { id: 'movementSpeeds', label: 'Ghost speeds up when I move', suggestGhosts: ['Dayan'] }
];
