export const ghosts = [
  {
    name: "Spirit",
    evidence: ["Ghost Writing", "EMF Level 5", "Spirit Box"],
    strength: "No specific strength",
    weakness: "Incense prevents hunt for 180 seconds (instead of 90)",
    behaviors: ["Most common ghost", "Baseline behavior"],
    giveaways: ["Long incense protection is key identifier"]
  },
  {
    name: "Wraith",
    evidence: ["D.O.T.S Projector", "EMF Level 5", "Spirit Box"],
    strength: "Can teleport to players",
    weakness: "Never steps in salt",
    behaviors: ["Cannot be tracked by footsteps", "Teleports randomly"],
    giveaways: ["No UV footprints in salt despite activity nearby"]
  },
  {
    name: "Phantom",
    evidence: ["D.O.T.S Projector", "Ultraviolet", "Spirit Box"],
    strength: "Looking at it drains sanity quickly",
    weakness: "Taking photo makes it disappear temporarily",
    behaviors: ["Invisible during hunts more often", "Heavy sanity drain when visible"],
    giveaways: ["Massive sanity drops when seeing the ghost"]
  },
  {
    name: "Poltergeist",
    evidence: ["Ghost Writing", "Ultraviolet", "Spirit Box"],
    strength: "Can throw multiple objects simultaneously",
    weakness: "Cannot interact without objects nearby",
    behaviors: ["Extremely active with items", "Multi-throw ability"],
    giveaways: ["Multiple items flying at once", "High EMF 2 activity"]
  },
  {
    name: "Banshee",
    evidence: ["D.O.T.S Projector", "Ghost Orb", "Ultraviolet"],
    strength: "Targets one player until death",
    weakness: "Fears crucifix (extended range)",
    behaviors: ["Only hunts target player's sanity", "Parabolic mic screams"],
    giveaways: ["Hunts when only one player is low sanity", "Unique parabolic screech"]
  },
  {
    name: "Jinn",
    evidence: ["EMF Level 5", "Ultraviolet", "Freezing Temperatures"],
    strength: "Faster when far from target with breaker on",
    weakness: "Cannot turn off breaker",
    behaviors: ["Speed boost at distance", "Drains sanity near breaker"],
    giveaways: ["Breaker never turns off", "Fast approaches from far away"]
  },
  {
    name: "Mare",
    evidence: ["Ghost Writing", "Ghost Orb", "Spirit Box"],
    strength: "Increased activity and hunts in darkness",
    weakness: "Less active in light",
    behaviors: ["Turns lights off immediately", "Hunts at 60% sanity in dark"],
    giveaways: ["Constantly switches lights off", "Won't hunt with lights on"]
  },
  {
    name: "Revenant",
    evidence: ["Ghost Writing", "Ghost Orb", "Freezing Temperatures"],
    strength: "Very fast during hunts when chasing",
    weakness: "Extremely slow when not chasing",
    behaviors: ["Speed changes dramatically", "One of fastest when spotted"],
    giveaways: ["Incredibly fast chase speed", "Slow when you hide"]
  },
  {
    name: "Shade",
    evidence: ["Ghost Writing", "EMF Level 5", "Freezing Temperatures"],
    strength: "Hard to find (shy)",
    weakness: "Won't hunt if multiple people nearby",
    behaviors: ["Very low activity", "Prefers solitary players"],
    giveaways: ["Almost no activity with group", "Rare hunts"]
  },
  {
    name: "Demon",
    evidence: ["Ghost Writing", "Ultraviolet", "Freezing Temperatures"],
    strength: "Hunts frequently at any sanity",
    weakness: "Crucifix has 5m range instead of 3m",
    behaviors: ["Can hunt above 50% sanity", "Shortest hunt cooldown"],
    giveaways: ["Early hunts", "Very frequent hunts"]
  },
  {
    name: "Yurei",
    evidence: ["D.O.T.S Projector", "Ghost Orb", "Freezing Temperatures"],
    strength: "Drains sanity faster",
    weakness: "Incense traps it in room longer",
    behaviors: ["Door slam drains 15% sanity", "Stronger sanity effects"],
    giveaways: ["Rapid sanity loss", "Frequent door closures"]
  },
  {
    name: "Oni",
    evidence: ["D.O.T.S Projector", "EMF Level 5", "Freezing Temperatures"],
    strength: "Very active when people nearby",
    weakness: "More visible during hunts",
    behaviors: ["Throws objects at high speed", "Increased activity near players"],
    giveaways: ["Constant visible activity", "Objects flying frequently"]
  },
  {
    name: "Yokai",
    evidence: ["D.O.T.S Projector", "Ghost Orb", "Spirit Box"],
    strength: "Talking nearby angers it",
    weakness: "Can only hear electronics within 2.5m during hunt",
    behaviors: ["Hunts at 80% sanity when talking", "Deaf during hunts"],
    giveaways: ["Hunts when players talk", "Activity spikes with voice"]
  },
  {
    name: "Hantu",
    evidence: ["Ghost Orb", "Ultraviolet", "Freezing Temperatures"],
    strength: "Faster in cold, visible breath during hunt",
    weakness: "Slower in warm areas",
    behaviors: ["Speed varies with temperature", "Breaker often off"],
    giveaways: ["Visible freezing breath during hunt", "Won't turn breaker on"]
  },
  {
    name: "Goryo",
    evidence: ["D.O.T.S Projector", "EMF Level 5", "Ultraviolet"],
    guaranteedEvidence: "D.O.T.S Projector",
    strength: "Only shows D.O.T.S on camera",
    weakness: "Rarely changes rooms",
    behaviors: ["D.O.T.S only visible through camera", "Stays near spawn"],
    giveaways: ["D.O.T.S won't show without camera view", "Never roams"]
  },
  {
    name: "Myling",
    evidence: ["Ghost Writing", "EMF Level 5", "Ultraviolet"],
    strength: "Quieter footsteps and vocalizations",
    weakness: "Makes more paranormal sounds",
    behaviors: ["Harder to hear during hunt", "Frequent electronic interference"],
    giveaways: ["Silent footsteps during hunt", "Heavy radio interference"]
  },
  {
    name: "Onryo",
    evidence: ["Ghost Orb", "Freezing Temperatures", "Spirit Box"],
    strength: "Extinguishing flames triggers hunts",
    weakness: "Flames prevent hunting",
    behaviors: ["Blows out candles/flames", "Can hunt at any sanity after 3rd flame"],
    giveaways: ["Constantly blows out candles", "Hunts after extinguishing flames"]
  },
  {
    name: "The Twins",
    evidence: ["EMF Level 5", "Freezing Temperatures", "Spirit Box"],
    strength: "Can attack from two locations",
    weakness: "Often interact simultaneously",
    behaviors: ["Dual interactions at once", "Speed varies between twins"],
    giveaways: ["Two interactions at exact same time", "Inconsistent hunt speeds"]
  },
  {
    name: "Raiju",
    evidence: ["D.O.T.S Projector", "EMF Level 5", "Ghost Orb"],
    strength: "Faster near active electronics",
    weakness: "Disrupts electronics from farther away",
    behaviors: ["Speed boost near equipment", "Extended interference range"],
    giveaways: ["Fast during hunt near equipment", "Equipment breaks from far away"]
  },
  {
    name: "Obake",
    evidence: ["EMF Level 5", "Ghost Orb", "Ultraviolet"],
    guaranteedEvidence: "Ultraviolet",
    strength: "Shape-shifts, can leave unique fingerprints",
    weakness: "Fingerprints disappear faster",
    behaviors: ["6-fingered handprints occasionally", "Different ghost models"],
    giveaways: ["Six-finger handprint", "Fingerprints vanish quickly"]
  },
  {
    name: "The Mimic",
    evidence: ["Ultraviolet", "Freezing Temperatures", "Spirit Box"],
    bonusEvidence: "Ghost Orb (always present)",
    strength: "Mimics other ghost behaviors",
    weakness: "Always shows Ghost Orbs as 4th evidence",
    behaviors: ["Changes behavior frequently", "Can copy any ghost"],
    giveaways: ["4 pieces of evidence", "Behavior changes mid-game"]
  },
  {
    name: "Moroi",
    evidence: ["Ghost Writing", "Freezing Temperatures", "Spirit Box"],
    strength: "Faster at lower average sanity",
    weakness: "Incense blinds it for longer",
    behaviors: ["Curses player through Spirit Box", "Speed scales with sanity"],
    giveaways: ["Doubled sanity drain after Spirit Box response", "Gets faster as game progresses"]
  },
  {
    name: "Deogen",
    evidence: ["D.O.T.S Projector", "Ghost Writing", "Spirit Box"],
    guaranteedEvidence: "Spirit Box",
    strength: "Always knows player location",
    weakness: "Very slow when near players",
    behaviors: ["Heavy breathing on Spirit Box", "Slows down when close"],
    giveaways: ["Unique breathing response on Spirit Box", "Can't be hidden from but slow chase"]
  },
  {
    name: "Thaye",
    evidence: ["D.O.T.S Projector", "Ghost Writing", "Ghost Orb"],
    strength: "Very active and fast early",
    weakness: "Becomes less active over time",
    behaviors: ["Ages when players nearby", "Speed and activity decrease"],
    giveaways: ["Extremely active at start", "Becomes docile over time"]
  },
  {
    name: "Dayan",
    evidence: ["EMF Level 5", "Ghost Orb", "Spirit Box"],
    strength: "Gains power if players move near her",
    weakness: "Loses power if players stand still",
    behaviors: ["Activity increases with player movement", "Weakens with stillness"],
    giveaways: ["More active when you move", "Calms when standing still"]
  },
  {
    name: "Gallu",
    evidence: ["EMF Level 5", "Ultraviolet", "Spirit Box"],
    strength: "Angered by crucifixes, makes them ineffective faster",
    weakness: "Standard weakness to incense",
    behaviors: ["Heavy interactions near crucifix", "Hunts at lower sanity near crucifix"],
    giveaways: ["Aggressive behavior near crucifix", "Burns crucifix faster"]
  },
  {
    name: "Obambo",
    evidence: ["Ghost Writing", "Ultraviolet", "D.O.T.S Projector"],
    strength: "Hunts earlier when aggressive",
    weakness: "Hunts later when calm",
    behaviors: ["Alternates between calm/aggressive states", "State affects hunt threshold"],
    giveaways: ["Unpredictable hunt timing", "Activity fluctuates dramatically"]
  }
];
