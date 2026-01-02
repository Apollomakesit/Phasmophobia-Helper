// Full ghost data for Phasmophobia Ghost Identifier
// Shape matches solver.js + app.js expectations

const GHOSTS = [
  {
    name: "Spirit",
    evidence: ["EMF 5", "Spirit Box", "Ghost Writing"],
    cannotHave: ["Freezing", "DOTS", "Ghost Orbs", "UV"],
    traits: [
      "Standard hunt behaviour with no strong speed quirks.",
      "Smudge sticks prevent hunts for 180 seconds."
    ],
    giveaway: "Longest smudge cooldown compared to similar ghosts.",
    tests: [
      "Smudge during a hunt and time the next possible hunt.",
      "Compare intervals against Wraith and Myling behaviour."
    ],
    notIf: [
      "Speed changes with line-of-sight.",
      "Prefers lights or behaves like a hallway camper."
    ],
    alike: ["Wraith", "Myling"]
  },
  {
    name: "Wraith",
    evidence: ["EMF 5", "Spirit Box", "DOTS"],
    cannotHave: ["Freezing", "Ghost Writing"],
    traits: [
      "Can teleport to players, leading to sudden EMF spikes.",
      "Does not leave UV footprints after stepping in salt."
    ],
    giveaway: "Steps in salt with no UV footprints at all.",
    tests: [
      "Place salt, check with UV immediately after steps.",
      "Watch for sudden teleports and EMF spikes near players."
    ],
    notIf: ["Leaves clear UV footprints in salt.", "Shows clear line-of-sight speed behaviour."],
    alike: ["Spirit", "Phantom"]
  },
  {
    name: "Phantom",
    evidence: ["Spirit Box", "UV", "DOTS"],
    cannotHave: ["EMF 5", "Ghost Writing"],
    traits: [
      "Lowers sanity more when viewed directly.",
      "Disappears more often in photos."
    ],
    giveaway: "Taking a photo makes the ghost disappear for longer than normal.",
    tests: [
      "Take photos during appearances and compare disappearance time.",
      "Watch sanity drops after long visual contact."
    ],
    notIf: ["Normal disappearance on photo.", "Standard sanity drain when staring."],
    alike: ["Banshee", "Wraith"]
  },
  {
    name: "Poltergeist",
    evidence: ["Spirit Box", "Ghost Writing", "UV"],
    cannotHave: ["EMF 5", "DOTS"],
    traits: [
      "Strong ability to throw multiple objects rapidly.",
      "Can cause high sanity drain when throwing many items at once."
    ],
    giveaway: "Large bursts of thrown items in quick succession.",
    tests: [
      "Stack items in the room and watch for multi-throws.",
      "Track sanity loss after object flurries."
    ],
    notIf: ["Very few throws despite long investigation.", "No multi-object throws in ghost room."],
    alike: ["Mare", "Obake"]
  },
  {
    name: "Banshee",
    evidence: ["Ghost Orbs", "UV", "DOTS"],
    cannotHave: ["EMF 5", "Ghost Writing"],
    traits: [
      "Targets a single player for most hunts.",
      "Special scream on parabolic microphone."
    ],
    giveaway: "Consistently paths toward one player only and parabolic scream.",
    tests: [
      "Use parabolic in ghost room for unique scream.",
      "Observe pathing during hunts across multiple players."
    ],
    notIf: ["Evenly targets multiple players.", "No special scream after repeated parabolic use."],
    alike: ["Phantom", "Wraith"]
  },
  {
    name: "Jinn",
    evidence: ["EMF 5", "Freezing", "UV"],
    cannotHave: ["Spirit Box", "Ghost Writing", "DOTS"],
    traits: [
      "Faster when the breaker is on and it has line-of-sight.",
      "Cannot turn off the breaker directly."
    ],
    giveaway: "Speed up in line-of-sight while breaker stays on.",
    tests: [
      "Keep breaker on and test chase speed vs broken line-of-sight.",
      "Track if breaker is ever directly turned off."
    ],
    notIf: ["Breaker is turned off by the ghost repeatedly.", "Speed feels stable regardless of line-of-sight."],
    alike: ["Raiju", "Revenant"]
  },
  {
    name: "Mare",
    evidence: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    cannotHave: ["EMF 5", "DOTS", "UV"],
    traits: [
      "Strong preference for darkness; more likely to hunt in the dark.",
      "Less likely to turn lights on; may turn them off often."
    ],
    giveaway: "Most hunts occur when lights are off, especially after it turns them off.",
    tests: [
      "Keep lights on to suppress hunts and see if it fights the light.",
      "Track where and how often it turns lights off."
    ],
    notIf: ["Frequently turns lights on.", "Comfortable hunting in well-lit areas."],
    alike: ["Poltergeist", "Moroi"]
  },
  {
    name: "Revenant",
    evidence: ["Ghost Orbs", "Ghost Writing", "Freezing"],
    cannotHave: ["EMF 5", "DOTS", "Spirit Box"],
    traits: [
      "Very slow when not chasing a visible player.",
      "Extremely fast when it has line-of-sight."
    ],
    giveaway: "Dramatic speed swing between wandering and chasing phases.",
    tests: [
      "Break line-of-sight and listen for speed drop.",
      "Let it see you briefly, then hide and compare footsteps."
    ],
    notIf: ["Speed remains consistent throughout hunts.", "Feels only slightly faster in chase."],
    alike: ["Jinn", "Hantu"]
  },
  {
    name: "Shade",
    evidence: ["EMF 5", "Ghost Writing", "Freezing"],
    cannotHave: ["Spirit Box", "DOTS", "UV"],
    traits: [
      "Very shy; harder to provoke events, especially with multiple players.",
      "Less likely to show itself or start hunts early."
    ],
    giveaway: "Long periods of quiet behaviour despite high sanity damage opportunities.",
    tests: [
      "Test hunts with solo vs multiple players in the room.",
      "Track how often events occur vs other games."
    ],
    notIf: ["Highly active with many events early.", "Frequent full apparitions at high sanity."],
    alike: ["Revenant", "Yurei"]
  },
  {
    name: "Demon",
    evidence: ["UV", "Ghost Writing", "Freezing"],
    cannotHave: ["EMF 5", "DOTS", "Ghost Orbs"],
    traits: [
      "Can hunt at higher sanity than most ghosts.",
      "Smudge protection time is much shorter."
    ],
    giveaway: "Early hunts at high sanity and short smudge window.",
    tests: [
      "Track first hunt sanity level.",
      "Smudge and time the next allowed hunt (around 60s)."
    ],
    notIf: ["No early hunts even when sanity is low.", "Smudge appears to block hunts for a long time."],
    alike: ["Moroi", "Thaye"]
  },
  {
    name: "Yurei",
    evidence: ["Ghost Orbs", "Freezing", "DOTS"],
    cannotHave: ["EMF 5", "Spirit Box", "UV"],
    traits: [
      "Heavy sanity drain with its special ability.",
      "Can slam doors and cause strong room effects."
    ],
    giveaway: "Large sudden sanity drops with door slam events.",
    tests: [
      "Watch sanity after strong door interactions.",
      "Compare its drain to other games with similar time spent."
    ],
    notIf: ["Sanity loss seems average despite activity.", "Few strong door events."],
    alike: ["Shade", "Onryo"]
  },
  {
    name: "Oni",
    evidence: ["EMF 5", "Freezing", "DOTS"],
    cannotHave: ["Spirit Box", "Ghost Orbs", "Ghost Writing"],
    traits: [
      "Very visible; more likely to show itself.",
      "Throws objects with more force than average."
    ],
    giveaway: "Frequent full-body apparitions and strong throws.",
    tests: [
      "Compare apparition rate to typical games.",
      "Stack objects and watch for powerful throws."
    ],
    notIf: ["Very shy and rarely visible.", "Throws feel weak and infrequent."],
    alike: ["Yokai", "Thaye"]
  },
  {
    name: "Hantu",
    evidence: ["Ghost Orbs", "UV", "Freezing"],
    cannotHave: ["EMF 5", "DOTS", "Spirit Box"],
    traits: [
      "Speed depends heavily on room temperature.",
      "Quicker in colder areas and slower in warm rooms."
    ],
    giveaway: "Speed changes as it moves between cold and warm areas.",
    tests: [
      "Use breaker and heaters to warm some paths.",
      "Observe footstep speed differences in various rooms."
    ],
    notIf: ["Speed feels stable regardless of temperature.", "Warmer rooms do not slow it down."],
    alike: ["Revenant", "Moroi"]
  },
  {
    name: "Yokai",
    evidence: ["Spirit Box", "Ghost Orbs", "DOTS"],
    cannotHave: ["EMF 5", "Ghost Writing"],
    traits: [
      "More likely to hunt when players talk nearby.",
      "Limited hearing during hunts at greater distances."
    ],
    giveaway: "Voice provokes hunts, but it struggles to chase distant players.",
    tests: [
      "Talk near the ghost room and watch hunt frequency.",
      "Hide at distance to test how well it hears."
    ],
    notIf: ["Talking has no apparent effect on hunt rate.", "Tracks players at long distance by sound."],
    alike: ["Oni", "Mare"]
  },
  {
    name: "Goryo",
    evidence: ["EMF 5", "UV", "DOTS"],
    cannotHave: ["Spirit Box", "Freezing"],
    traits: [
      "DOTS usually only visible on camera.",
      "Rarely strays far from its room."
    ],
    giveaway: "DOTS only show up on camera but not in person.",
    tests: [
      "Place DOTS and a camera; watch from truck.",
      "Check if you can see DOTS in person at all."
    ],
    notIf: ["DOTS clearly visible in person consistently.", "Roams far from its original room."],
    alike: ["Jinn", "Raiju"]
  },
  {
    name: "Myling",
    evidence: ["EMF 5", "UV", "Ghost Writing"],
    cannotHave: ["Spirit Box", "DOTS", "Freezing"],
    traits: [
      "Quieter footsteps at range during hunts.",
      "More frequent paranormal sounds on parabolic."
    ],
    giveaway: "Parabolic is very active but footsteps are hard to hear until close.",
    tests: [
      "Use parabolic to record number of sounds.",
      "Stand at distance during hunts and listen for muted steps."
    ],
    notIf: ["Footsteps easy to hear from far away.", "Parabolic remains fairly quiet."],
    alike: ["Spirit", "Poltergeist"]
  },
  {
    name: "Onryo",
    evidence: ["Spirit Box", "Ghost Orbs", "Freezing"],
    cannotHave: ["EMF 5", "DOTS", "Ghost Writing"],
    traits: [
      "Has special interaction with candles.",
      "Candles can prevent hunts but can also trigger them."
    ],
    giveaway: "Hunts correlate strongly with candle extinguishes.",
    tests: [
      "Use the Onryo candle counter tool and track extinguishes.",
      "Watch for hunts right after candles go out."
    ],
    notIf: ["Candles have little effect on hunts.", "Behaves like a normal ghost with fire."],
    alike: ["Yurei", "Mare"]
  },
  {
    name: "Raiju",
    evidence: ["EMF 5", "Ghost Orbs", "DOTS"],
    cannotHave: ["Spirit Box", "Ghost Writing"],
    traits: [
      "Faster near active electronic equipment.",
      "Can cause electronics to malfunction more often."
    ],
    giveaway: "Speed up when chasing through equipment-heavy areas.",
    tests: [
      "Hunt with lots of electronics active in hallways.",
      "Remove electronics and compare chase speed."
    ],
    notIf: ["Speed does not change around electronics.", "Rarely causes equipment surges."],
    alike: ["Jinn", "Goryo"]
  },
  {
    name: "Obake",
    evidence: ["EMF 5", "Ghost Orbs", "UV"],
    cannotHave: ["Spirit Box", "DOTS"],
    traits: [
      "Shape-shifting fingerprint patterns.",
      "Fingerprints may disappear faster."
    ],
    giveaway: "Odd or unique fingerprints and short-lived prints.",
    tests: [
      "Check multiple surfaces for inconsistent fingerprint shapes.",
      "Time how quickly prints fade."
    ],
    notIf: ["Fingerprints are normal and long-lasting.", "Patterns remain consistent."],
    alike: ["Poltergeist", "Goryo"]
  },
  {
    name: "The Twins",
    evidence: ["EMF 5", "Spirit Box", "Freezing"],
    cannotHave: ["Ghost Orbs"],
    traits: [
      "Two entities causing interactions in different spots.",
      "Hunts with varying speeds."
    ],
    giveaway: "Double interactions far apart and inconsistent hunt speed.",
    tests: [
      "Track interactions in multiple rooms simultaneously.",
      "Compare speed of different hunts."
    ],
    notIf: ["Activity stays focused in one room.", "Speed is very consistent every hunt."],
    alike: ["Raiju", "Jinn"]
  },
  {
    name: "Mimic",
    evidence: ["Spirit Box", "UV", "Freezing", "Ghost Orbs"],
    cannotHave: [],
    traits: [
      "Mimics abilities of other ghosts.",
      "Always has fake Ghost Orbs even if not part of evidence set."
    ],
    giveaway: "Evidence pattern fits another ghost but orbs still appear.",
    tests: [
      "Compare behaviour to evidence; look for mismatch.",
      "Verify orbs around any ghost-like behaviour."
    ],
    notIf: ["Behaviour matches evidence cleanly with no orb weirdness."],
    alike: ["Any ghost it mimics"]
  },
  {
    name: "Moroi",
    evidence: ["Spirit Box", "Ghost Writing", "Freezing"],
    cannotHave: ["EMF 5", "DOTS"],
    traits: [
      "Curses players, causing faster sanity drain.",
      "Faster at lower sanity."
    ],
    giveaway: "Speed increases over time as sanity drops dramatically.",
    tests: [
      "Talk on Spirit Box and watch sanity drain.",
      "Compare early and late-hunt speeds."
    ],
    notIf: ["Sanity drains normally and speed is stable.", "No clear curse effect from Spirit Box."],
    alike: ["Demon", "Hantu"]
  },
  {
    name: "Deogen",
    evidence: ["Spirit Box", "Ghost Writing", "DOTS"],
    cannotHave: ["EMF 5", "Ghost Orbs"],
    traits: [
      "Very fast when far from target, very slow when close.",
      "Always knows where players are."
    ],
    giveaway: "Can never lose you but crawls slowly when near.",
    tests: [
      "Let it approach then step away; compare speed changes.",
      "Hide and listen for constant tracking."
    ],
    notIf: ["Can be juked or loses you easily.", "Speed does not slow dramatically when close."],
    alike: ["Thaye", "Moroi"]
  },
  {
    name: "Thaye",
    evidence: ["Ghost Orbs", "Ghost Writing", "DOTS"],
    cannotHave: ["EMF 5", "Spirit Box"],
    traits: [
      "Very strong early-game; weakens over time.",
      "Activity, speed, and hunt frequency drop as it ages."
    ],
    giveaway: "Starts extremely active then becomes very quiet later.",
    tests: [
      "Stay long in the house and compare early vs late behaviour.",
      "Time hunts across long investigations."
    ],
    notIf: ["Keeps same strength entire game.", "Never shows strong early activity."],
    alike: ["Deogen", "Demon"]
  }
];
