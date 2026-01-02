# 🎃 Phasmophobia Helper - Advanced Ghost Tracker

A comprehensive web-based tool for identifying ghosts in Phasmophobia, featuring all the latest ghost types including **Obambo**, **Gallu**, and **Dayan** from the Winter's Jest 2025 update.

## 🌟 Features

### Evidence Tracking System
- ✅ **Confirm Evidence** - Mark found evidence with checkmarks
- ❌ **Rule Out Evidence** - Eliminate impossible evidence
- 🎯 **Difficulty Modes** - Support for all difficulty levels (Amateur to Insanity)
- 🔄 **Smart Filtering** - Automatically narrows down ghost possibilities

### BPM Detection System
- 🎵 **Tap-to-Detect** - Tap the button to match hunt heartbeat rhythm
- 📊 **Speed Classification** - Automatically identifies ghost speed categories
- 🎯 **Ghost Matching** - Suggests ghosts based on detected BPM
- ⚡ **Real-time Feedback** - See possible ghosts as you tap

### Event Timers
- ⏱️ **Smudge Timer** - 90-second countdown for smudge stick effectiveness
- 🏃 **Hunt Cooldown** - 25-second hunt cooldown tracker
- 🔧 **Custom Timer** - Set your own countdown for any purpose
- 🔔 **Audio Notifications** - Alerts when timers complete

### Sanity Tracker
- 📉 **Visual Sanity Bar** - Color-coded sanity level display
- ⚠️ **Hunt Warnings** - Real-time alerts for hunt risk levels
- ➕➖ **Quick Adjustments** - +/-5% and +/-10% buttons
- 🔄 **Reset Function** - Quick return to 100% sanity

### Behavioral Tracking
- ✔️ **Checklist System** - Mark observed ghost behaviors
- 🎯 **Smart Suggestions** - Behaviors automatically boost ghost likelihood
- 🔍 **25+ Behaviors** - Comprehensive behavior database including:
  - Multiple objects thrown
  - Singing on parabolic mic
  - Light manipulation patterns
  - Speed variations
  - State changes (Obambo)
  - Equipment interaction (Gallu)
  - Movement-based speed (Dayan)

### Ghost Results Display
- 📊 **Likelihood Percentage** - Each ghost shows probability score
- 🎨 **Color-Coded Cards** - High-likelihood ghosts highlighted in green
- 📝 **Detailed Information** - Each ghost card includes:
  - Evidence requirements
  - Hunt threshold
  - Base speed
  - Likelihood factors
  - Behaviors & abilities
  - Key giveaways
- 🔍 **Expandable Details** - Click to reveal full behavior descriptions

## 🆕 New Ghost Types (Winter's Jest 2025)

### Obambo
**Evidence:** Ghost Writing + Fingerprints + D.O.T.S Projector

**Unique Mechanic:** Alternates between aggressive and docile states every 2 minutes
- **Aggressive State:** Hunts at 65% sanity, moves at 1.96 m/s
- **Docile State:** Hunts at 10% sanity, moves at 1.45 m/s
- Can change states mid-hunt
- Visible countdown timer shows current state

**Key Giveaways:**
- Dramatic behavior changes every 2 minutes
- Speed changes during hunts
- Activity fluctuates regularly

### Gallu
**Evidence:** EMF Level 5 + Fingerprints + Spirit Box

**Unique Mechanic:** Enrages when players use defensive equipment
- **Enraged State:** Crucifixes and smudge sticks 50% less effective (20 seconds)
- **Exhausted State:** Defensive items 50% MORE effective
- Orange glow when enraged
- Cycles: normal → enraged → exhausted

**Key Giveaways:**
- Crucifix burns but hunt still starts
- Smudge doesn't stop hunt normally
- Orange visual glow during rage
- Extended smudge effectiveness at other times

### Dayan
**Evidence:** EMF Level 5 + Ghost Orb + Spirit Box

**Unique Mechanic:** Speed changes based on player movement (within 10m)
- **Player Moving:** Speeds up to 2.0 m/s
- **Player Still:** Slows to 1.4 m/s
- Always appears as female ghost model
- Best counter: stand completely still

**Key Giveaways:**
- Speed increases when you move
- Slows dramatically when standing still
- Always female model
- Success hiding in place

## 📱 How to Use

### Basic Ghost Identification:
1. **Select Difficulty** - Choose your current game difficulty
2. **Mark Evidence** - Click ✓ for found evidence, ✗ to rule out
3. **Check Results** - See filtered ghosts with likelihood percentages

### Advanced Identification:
1. **Use BPM Detector** - Tap to the heartbeat during hunts
2. **Track Behaviors** - Check off observed behavioral patterns
3. **Monitor Sanity** - Update sanity level as it drops
4. **Use Timers** - Track smudge effectiveness and hunt cooldowns

### Reading Likelihood Scores:
- **80-100%** - Very High (Green badge) - Most likely the ghost
- **60-79%** - High (Blue badge) - Strong candidate
- **40-59%** - Medium (Yellow badge) - Possible match
- **0-39%** - Low (Gray badge) - Less likely

## 🎯 Pro Tips

1. **Evidence First** - Always start with evidence selection for accurate filtering
2. **BPM Timing** - Tap consistently to the heartbeat for accurate speed detection
3. **Behavior Boost** - Checking behaviors significantly increases likelihood accuracy
4. **State Tracking** - For Obambo, note the exact time behavior changes occur
5. **Equipment Testing** - For Gallu, test crucifix/smudge effectiveness patterns
6. **Movement Test** - For Dayan, try standing still during hunts to confirm

## 🔧 Technical Details

### Files Structure:
```
phasmophobia-helper/
├── index.html      # Main HTML structure
├── ghosts.js       # Ghost database (27 ghosts total)
├── app.js          # Core functionality & logic
└── styles.css      # Dark theme styling
```

### Browser Compatibility:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- 📱 Mobile browsers (responsive design)

### Features Used:
- Vanilla JavaScript (no dependencies)
- CSS Grid & Flexbox for layout
- LocalStorage ready (future enhancement)
- Responsive design for all screen sizes

## 📊 Ghost Database

Complete information for all **27 ghost types**:
- Spirit, Wraith, Phantom, Poltergeist, Banshee
- Jinn, Mare, Revenant, Shade, Demon
- Yurei, Oni, Yokai, Hantu, Goryo
- Myling, Onryo, The Twins, Raiju, Obake
- The Mimic, Moroi, Deogen, Thaye
- **Obambo, Gallu, Dayan** (NEW!)

Each ghost includes:
- All 3 evidence types
- Hunt threshold percentage
- Base speed and speed variations
- Complete behavior list
- Key identification giveaways

## 🎨 Features Breakdown

### Likelihood Calculation Factors:
- ✅ Evidence match (required)
- 📊 Evidence count matching difficulty (+20%)
- ✔️ Behavioral pattern matches (+15% each)
- 🎵 BPM/speed matching (+25%)
- 📉 Current sanity vs hunt threshold (+10%)
- 👻 Special cases (e.g., Mimic with 4 evidence +30%)

### Speed Classifications (BPM Ranges):
- 0-65 BPM: Revenant Roaming (1.0 m/s)
- 66-90 BPM: Hantu Warm (1.4 m/s)
- 95-115 BPM: Standard Speed (1.7 m/s)
- 110-130 BPM: Obambo Aggressive (1.96 m/s)
- 145-175 BPM: Hantu Cold (2.7 m/s)
- 160-195 BPM: Revenant Chasing (3.0 m/s)

## 🚀 Future Enhancements (Possible)

- [ ] Save/Load investigation sessions
- [ ] Team collaboration features
- [ ] Audio recording for Spirit Box
- [ ] Photo evidence storage
- [ ] Statistics tracking
- [ ] Custom ghost notes
- [ ] Export investigation reports

## 📝 Credits

Created for the Phasmophobia community
Updated for Patch v0.10.0.0 (Winter's Jest 2025)

**Based on:**
- Official Phasmophobia Wiki
- Community expert strategies
- GameRant and KeenGamer guides

## ⚠️ Disclaimer

This tool is a community-created helper and is not officially affiliated with Kinetic Games or Phasmophobia. Ghost information is based on patch v0.10.0.0 and may change with future updates.

---

**Happy Hunting! 👻**
