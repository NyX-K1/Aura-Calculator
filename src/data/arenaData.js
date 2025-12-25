export const ARENA_DATA = [
    {
        id: 'chess',
        title: 'CHESS',
        subtitle: 'THE GAME OF KINGS',
        desc: '64 squares. 32 pieces. Infinite possibilities. The ultimate test of cognitive processing speed and pattern recognition.',
        img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000&auto=format&fit=crop', // Original Chess
        color: '#ffffff',
        playLink: 'https://lichess.org/',
        history: 'Originating from the Indian game "Chaturanga" in the 6th century, Chess was designed to teach military strategy to royals. It is not just a game; it is a war simulation that strips away luck, leaving only raw intellect.',
        strategy: 'Control the center. Develop your pieces. King safety. Do not play "Hope Chess" (hoping your opponent makes a mistake). Rigorous calculation is the only path to victory. Embrace the opening principles, but master the endgame.',
        buffs: [
            { icon: '🧠', text: 'Increases IQ and Pattern Recognition' },
            { icon: '🔮', text: 'Develops Foresight (Calculation)' },
            { icon: '🧘', text: 'Teaches Emotional Control under pressure' },
            { icon: '👑', text: 'Aesthetic of Pure Intelligence' }
        ],
        debuffs: [
            { icon: '💀', text: 'Ego Death (Losing feels personal)' },
            { icon: '⏳', text: 'Extreme Time Sink (Bullet addiction)' },
            { icon: '📉', text: 'The "Tetris Effect" (Seeing knights while sleeping)' }
        ],
        moments: [
            {
                event: 'THE GOLD COIN GAME (Levitsky vs Marshall, 1912)',
                d: 'Marshall played a move so brilliant (23...Qg3!!) that spectators reportedly showered the board with gold coins in appreciation.',
                link: 'https://www.chessgames.com/perl/chessgame?gid=1094914'
            },
            {
                event: 'THE YOUNGEST CHALLENGER (Gukesh D)',
                d: 'At 17, Gukesh Dommaraju won the Candidates Tournament, proving that the new generation has completely solved the game.',
                link: 'https://en.wikipedia.org/wiki/Gukesh_Dommaraju'
            },
            {
                event: 'DEEP BLUE VS KASPAROV (1997)',
                d: 'The moment AI surpassed human intuition. The beginning of the end, or the start of a new era?',
                link: 'https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov'
            }
        ]
    },
    {
        id: 'pubg',
        title: 'PUBG',
        subtitle: 'SURVIVAL OF THE FITTEST',
        desc: '100 players. 1 survivor. The game that defined the Battle Royale genre. A true test of spatial awareness and recoil control.',
        img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop', // Original PUBG
        color: '#fbbf24',
        playLink: 'https://pubg.com/',
        history: 'Originally a mod for ARMA 3, PUBG stripped away the arcade mechanics of shooters and introduced ballistics, inventory management, and high-stakes permadeath rounds.',
        strategy: 'Positioning is king. The circle dictates your movement. Don\'t take fair fights; take fights where you have the advantage. Loot fast, rotate early.',
        buffs: [
            { icon: '🎯', text: 'Hand-Eye Coordination' },
            { icon: '👂', text: 'Auditory Spatial Awareness' },
            { icon: '🤝', text: 'Small Unit Tactics (Squads)' }
        ],
        debuffs: [
            { icon: '🤬', text: 'Rage Inducing (Desync)' },
            { icon: '📉', text: 'Bad Posture (The Gamer Hunch)' }
        ],
        moments: [
            {
                event: 'THE PAN KILL',
                d: 'The universal symbol of disrespect. Winning a gunfight with kitchenware.',
                link: 'https://www.youtube.com/results?search_query=pubg+pan+kill'
            }
        ]
    },
    {
        id: 'poker',
        title: 'POKER (TEXAS HOLD\'EM)',
        subtitle: 'THE ART OF WARFARE',
        desc: 'A game of incomplete information. It teaches you that you can make the right decision and still lose, which is the most important lesson in life.',
        img: 'https://images.unsplash.com/photo-1511193311914-0346f1971801?q=80&w=1000&auto=format&fit=crop', // Original Poker
        color: '#ef4444',
        playLink: 'https://www.replaypoker.com/',
        history: 'Evolving from the Persian game "As-Nas", Poker became the frontier game of the American West. It is the purest distillation of risk management and human psychology.',
        strategy: 'Tight Aggressive (TAG). Play fewer hands, but play them strongly. Position is everything. Understand "Pot Odds" and "Expected Value" (EV). If you cannot spot the fish at the table, you are the fish.',
        buffs: [
            { icon: '🎭', text: 'Mastery of Body Language (Poker Face)' },
            { icon: '🔢', text: 'Rapid Probability Calculation' },
            { icon: '💰', text: 'Risk Management skills' },
            { icon: '👁️', text: 'Ability to read human souls' }
        ],
        debuffs: [
            { icon: '💸', text: 'Financial Ruin (if undisciplined)' },
            { icon: '🎢', text: 'Dopamine deregulation (Gambling loops)' },
            { icon: '😤', text: 'Tilt (Emotional collapse)' }
        ],
        moments: [
            {
                event: 'THE MONEYMAKER EFFECT (2003)',
                d: 'An amateur named Chris Moneymaker won the WSOP Main Event via online satellite, changing the economy of the game forever.',
                link: 'https://en.wikipedia.org/wiki/Chris_Moneymaker'
            },
            {
                event: 'THE 5-BET BLUFF (Tom Dwan)',
                d: 'Watching "Durrrr" abuse top pros with pure aggression and zero fear.',
                link: 'https://www.youtube.com/results?search_query=tom+dwan+best+bluffs'
            }
        ]
    },
    {
        id: 'elden',
        title: 'ELDEN RING',
        subtitle: 'THE SCHOOL OF RESILIENCE',
        desc: 'You will die. Thousands of times. And you will learn to love it. The ultimate simulator for overcoming impossible odds.',
        img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop', // Original Elden Ring
        color: '#d4af37',
        playLink: 'https://en.bandainamcoent.eu/elden-ring/elden-ring',
        history: 'From the twisted mind of Hidetaka Miyazaki and George R.R. Martin. It represents the pinnacle of the "Soulsborne" genre, which rejects the hand-holding of modern gaming.',
        strategy: 'Hesitation is defeat. Learn the patterns. Do not greedy hit. Optimize your build, but rely on skill. Exploring is usually more valuable than grinding.',
        buffs: [
            { icon: '🛡️', text: 'Unbreakable Resilience' },
            { icon: '🗡️', text: 'Pattern Recognition & Reflexes' },
            { icon: '🗺️', text: 'Curiosity and Exploration prowess' },
            { icon: '🤝', text: 'Humility (Malenia will humble you)' }
        ],
        debuffs: [
            { icon: '🕒', text: 'Massive Time Sink (100+ Hours)' },
            { icon: '🎮', text: 'Controller Destruction Risk' },
            { icon: '🌑', text: 'Vitamin D Deficiency' }
        ],
        moments: [
            {
                event: 'LET ME SOLO HER',
                d: 'A legendary player who wore a jar on his head and soloed the hardest boss for thousands of struggling players. A true hero.',
                link: 'https://en.wikipedia.org/wiki/Let_Me_Solo_Her'
            }
        ]
    },
    {
        id: 'go',
        title: 'GO (BADUK)',
        subtitle: 'THE DIVINE GAME',
        desc: 'Simple rules. Infinite complexity. More legal board positions than atoms in the universe. The game AI struggled to beat for decades.',
        img: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2070&auto=format&fit=crop',
        color: '#000000',
        playLink: 'https://online-go.com/',
        history: 'Invented in China more than 2,500 years ago. It focuses on surrounding territory rather than capturing pieces. It is considered one of the four essential arts of the cultured Chinese scholar.',
        strategy: 'Balance. Do not try to take everything. "Thickness" (strength) creates territory. Play away from strength. Sacrifice small stones for big influence.',
        buffs: [
            { icon: '🌌', text: 'Big Picture Strategic Thinking' },
            { icon: '☯️', text: 'Understanding Balance & Trade-offs' },
            { icon: '🧘', text: 'Deep Meditative Focus' }
        ],
        debuffs: [
            { icon: '🤯', text: 'Brain Melt (Calculation depth)' },
            { icon: '📉', text: 'Steepest Learning Curve in gaming' }
        ],
        moments: [
            {
                event: 'ALPHAGO VS LEE SEDOL (Move 37)',
                d: 'The moment AI showed true creativity, ensuring humans would never dominate the board again.',
                link: 'https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol'
            },
            {
                event: 'MOVE 78 (THE DIVINE MOVE)',
                d: 'Lee Sedol\'s brilliant "God Move" that broke AlphaGo, the one time humanity struck back.',
                link: 'https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol#Game_4'
            }
        ]
    }
];
