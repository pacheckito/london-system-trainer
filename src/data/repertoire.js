export const LINES = [
  {
    id: 'mainline',
    name: 'Line 1: Mainline (…d5, …e6)',
    freq: '~40%',
    description: 'The most common response. Black plays a classical Queen\'s Pawn structure.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Claim the center. This is your first move in every London game.', bComment: 'Black mirrors — the most natural response.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'Develop the bishop BEFORE e3. This is the defining move of the London System.', bComment: 'Natural development. Black prepares …e6 and …Bd6.' },
      { w: 'e3', b: 'e6', wComment: 'Lock in a solid pawn chain. The bishop is already out, so e3 is safe.', bComment: 'Solid but slightly passive. Black builds a wall.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Standard knight development, controlling e5.', bComment: 'Black offers a bishop trade. This is the critical moment!' },
      { w: 'Bg3', b: 'O-O', wComment: '⭐ KEY MOVE: Retreat to g3, do NOT trade! Your dark-square bishop is too valuable.', bComment: 'Black castles. Now you have a target on h7.' },
      { w: 'Bd3', b: 'c5', wComment: 'Point the bishop at h7. Combined with Ne5, this creates deadly threats.', bComment: 'Black strikes at your center. Standard counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Reinforce d4. Your center is now rock solid.', bComment: 'Normal development. Black builds pressure on d4.' },
      { w: 'Nbd2', b: 'Qe7', wComment: 'Knight to d2 (not c3!) keeps the c-pawn flexible for a future c4.', bComment: 'Black connects rooks and eyes the e-file.' },
      { w: 'Ne5', b: 'Nd7', wComment: '⭐ The dream square! Ne5 is incredibly strong — controls key squares and supports Bd3.', bComment: 'Black challenges, but trading helps you open the f-file.' },
      { w: 'f4', b: 'f5', wComment: '⭐ Lock down the kingside. You now have a huge space advantage and a clear attacking plan.', bComment: 'Black tries to block but weakens e5 forever.' }
    ],
    mistakes: [
      {
        move: '4…Bd6 then …Bxg3',
        atMove: 'After 5.Bg3',
        desc: 'If Black trades with …Bxg3 hxg3',
        punishment: 'You get the open h-file for FREE. Play Qe2, double rooks on h-file. Devastating kingside attack.',
        howToPunish: 'After hxg3: Rh1 is already open → Qd3 or Qe2 aiming h7 → double rooks → checkmate threats.'
      },
      {
        move: '6…cxd4?!',
        atMove: 'Move 6-7',
        desc: 'Black takes on d4 too early with cxd4, exd4',
        punishment: 'You get an IQP but with MASSIVE piece activity. Bd3 + Ne5 + Qf3 creates unstoppable kingside pressure.',
        howToPunish: 'After exd4: Play Ne5 → Qf3 → Rae1. Your pieces are all aimed at the kingside while Black has no targets.'
      },
      {
        move: '…g6?',
        atMove: 'Any point after castling',
        desc: 'Black plays …g6 trying to prevent Bxh7+',
        punishment: 'The dark squares around the king (f6, h6) become Swiss cheese. Qf3 → Qf6 ideas become very strong.',
        howToPunish: 'After …g6: Bxg6! can work if the knight is on e5. Otherwise Qf3 with threats on f6 and the weakened king.'
      },
      {
        move: '…h6?',
        atMove: 'Any point',
        desc: 'Black plays …h6 weakening the kingside',
        punishment: 'g4! pawn storm becomes very strong. The h6 pawn is a hook for your attack. g4-g5 rips open lines.',
        howToPunish: 'After …h6: g4 → g5 → hxg5 → Qh5 with a devastating attack down the h-file.'
      }
    ],
    tactics: [
      'Greek Gift (Bxh7+): With Bd3, Ne5, and Queen available → Bxh7+ Kxh7, Qh5+ creates lethal attack',
      'Qf3 → Qh3 battery: Swing the queen to the kingside once f4 is played. Unstoppable pressure on h7.',
      'e3-e4 break: If Black is passive, push e4! After dxe4, Nxe4 gives you a monster centralized knight.'
    ]
  },
  {
    id: 'c5-challenge',
    name: 'Line 2: …c5 Challenge',
    freq: '~20%',
    description: 'Black immediately challenges your center. The most important line to know well.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard center grab.', bComment: 'Black mirrors.' },
      { w: 'Bf4', b: 'c5', wComment: 'Bishop out first — London trademark.', bComment: '⚠️ Early challenge! Black immediately attacks d4.' },
      { w: 'e3', b: 'Nc6', wComment: 'Stay calm. e3 supports d4 and you\'re in no danger.', bComment: 'Black piles pressure on d4.' },
      { w: 'Nf3', b: 'Nf6', wComment: 'Develop naturally. Don\'t rush to defend d4 with c3 yet.', bComment: 'Standard development.' },
      { w: 'c3', b: 'e6', wComment: 'NOW play c3. Your center is fully reinforced.', bComment: 'Black solidifies. Typical structure forming.' },
      { w: 'Bd3', b: 'Bd6', wComment: 'Aim at h7 as always.', bComment: 'Black offers the bishop trade again.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Sidestep! Same concept as Line 1 — never trade this bishop.', bComment: 'Black castles into your attack.' },
      { w: 'Nbd2', b: 'b6', wComment: 'Knight to d2 heading for e5.', bComment: 'Black prepares …Bb7 fianchetto.' },
      { w: 'Ne5', b: 'Bb7', wComment: '⭐ Outpost achieved! Ne5 is dominant.', bComment: 'Black completes development but you\'re already better.' },
      { w: 'f4', b: 'Ne7', wComment: 'Lock down the kingside. Exactly the same plan as Line 1.', bComment: 'Black retreats the knight to reroute.' }
    ],
    mistakes: [
      {
        move: '…cxd4 (early)',
        atMove: 'Move 2-5',
        desc: 'Black captures on d4 too early',
        punishment: 'After exd4 you get active IQP play. Your pieces are far more active than Black\'s.',
        howToPunish: 'exd4 → Bd3 + Ne5 + 0-0 + Qf3. The IQP gives you open c and e files plus all your pieces attack.'
      },
      {
        move: '…Nh5?',
        atMove: 'Move 4-6',
        desc: 'Black tries to kick your Bf4 with …Nh5',
        punishment: 'The knight on h5 is misplaced and wastes tempo. Continue normally — the knight will have to retreat.',
        howToPunish: 'Ignore it! After Bg3 Nxg3 hxg3 you get the open h-file. If they don\'t take, the Nh5 is just stuck.'
      },
      {
        move: '…Qb6?',
        atMove: 'Move 4-7',
        desc: 'Black plays …Qb6 attacking b2 early',
        punishment: 'Qb3! Trade queens. In the endgame your structure is better and the b-file pressure disappears.',
        howToPunish: 'Qb3! forces a queen trade. Your development lead + better structure = winning endgame.'
      },
      {
        move: '…b5?',
        atMove: 'Move 6-8',
        desc: 'Black overextends on the queenside',
        punishment: 'a4! undermines the chain. After …b4, c4 breaks through the center while Black\'s queenside is full of holes.',
        howToPunish: 'a4! → bxa4? Rxa4 with pressure. If …b4 then c4 cracking open Black\'s center.'
      }
    ],
    tactics: [
      'Nxf7 sacrifice: Knight on e5 + Bd3 → Nxf7! Rxf7, Qh5 threatening Qxf7+ and Bxh7+.',
      'f4-f5 pawn storm: After f4, push f5 to blow open the kingside. If …exf5, Bxf5 dominates.',
      'IQP dynamics: If cxd4 exd4, use the d-pawn as a battering ram. d5! at the right moment is crushing.'
    ]
  },
  {
    id: 'bf5-mirror',
    name: 'Line 3: …Bf5 Mirror',
    freq: '~10%',
    description: 'Black copies your idea and develops the bishop early. You have a specific plan to exploit this.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Bf5', wComment: 'London bishop comes out.', bComment: '⚠️ Black mirrors! They want the same idea.' },
      { w: 'e3', b: 'e6', wComment: 'Build the chain. Prepare Bd3 to FORCE a trade.', bComment: 'Black supports the center.' },
      { w: 'Nf3', b: 'Nf6', wComment: 'Develop naturally.', bComment: 'Normal development.' },
      { w: 'Bd3', b: 'Bxd3', wComment: '⭐ KEY: Force the trade! After Qxd3, YOUR queen is active and THEIR bishop is gone.', bComment: 'Black has to take — retreating loses tempo.' },
      { w: 'Qxd3', b: 'Bd6', wComment: 'Queen is beautifully placed on d3 — eyes h7 AND a6.', bComment: 'Black develops but has no light-squared bishop anymore.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Same retreat as always.', bComment: 'Black castles.' },
      { w: 'Nbd2', b: 'c5', wComment: 'Standard knight development.', bComment: 'Black tries counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold the center.', bComment: 'Black builds pressure.' },
      { w: 'O-O', b: 'Qe7', wComment: 'Castle and you\'re better. Queen on d3, dark-square bishop alive, Black has no counterplay.', bComment: 'Black tries to stay active but is slightly passive.' }
    ],
    mistakes: [
      {
        move: '…Bg4? (instead of …Bf5)',
        atMove: 'Move 2',
        desc: 'Black pins the knight that isn\'t there yet with …Bg4',
        punishment: 'Develop normally with Nf3, then Be2 unpinning. The Bg4 bishop is misplaced and will have to move again.',
        howToPunish: 'Nf3 → h3 Bh5 → g4 Bg6 → Ne5! You\'ve gained tempi and the knight is on e5 for free.'
      },
      {
        move: '…Bf5 then …Bd6?!',
        atMove: 'Move 5-6',
        desc: 'After trading bishops, Black plays …Bd6 without the light bishop to cover light squares',
        punishment: 'Your Qd3 now has no opposing light-square bishop. The a6-f1 and b1-h7 diagonals are yours.',
        howToPunish: 'Qd3 + Ne5 → Qh7 ideas. Black has no light-square bishop to defend, so h7 is chronically weak.'
      },
      {
        move: '…c5 then …cxd4?!',
        atMove: 'Move 8-9',
        desc: 'Black trades center pawns when they have no light-square bishop',
        punishment: 'In IQP positions, the side with the bishop pair usually wins. You have the only bishop that matters.',
        howToPunish: 'After exd4: Qe2 → Rae1 → Ne5. Your dark-square bishop is the best piece on the board.'
      }
    ],
    tactics: [
      'Qd3 + Ne5 battery: Queen eyes h7 directly with no opposing light bishop to contest.',
      'e3-e4 central break: With no light-square bishop, Black can\'t control e4. Push e4 for a huge center.',
      'a4-a5 minority attack: Weaken Black\'s queenside pawns and create targets on b7/c6.'
    ]
  },
  {
    id: 'slav-london',
    name: 'Line 4: Slav Setup (…c6)',
    freq: '~8%',
    description: 'Black plays a solid Slav-style structure. Common among cautious players.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop out.', bComment: 'Normal development.' },
      { w: 'e3', b: 'c6', wComment: 'Build the chain.', bComment: '⚠️ Slav setup! Black wants a very solid position.' },
      { w: 'Nf3', b: 'Bf5', wComment: 'Develop.', bComment: 'Black also gets their bishop out early. Smart!' },
      { w: 'Bd3', b: 'Bxd3', wComment: 'Force the trade again — same idea as Line 3.', bComment: 'Black trades.' },
      { w: 'Qxd3', b: 'e6', wComment: 'Active queen. You have the h7 target again.', bComment: 'Black builds the wall. Very solid but passive.' },
      { w: 'O-O', b: 'Bd6', wComment: 'Castle and prepare the middlegame.', bComment: 'Black offers the second bishop trade.' },
      { w: 'Bg3', b: 'Bxg3', wComment: 'Retreat as usual.', bComment: 'This time Black DOES trade — and that\'s fine for you!' },
      { w: 'hxg3', b: 'Nbd7', wComment: '⭐ The h-file is OPEN! This is your main weapon in this line.', bComment: 'Black develops but the damage is done — the h-file is yours.' },
      { w: 'c4', b: 'O-O', wComment: 'Strike the center! With the open h-file, your attack is already brewing.', bComment: 'Black castles into the open h-file. Dangerous for them!' }
    ],
    mistakes: [
      {
        move: '…Bxg3 (trading)',
        atMove: 'Move 8',
        desc: 'This isn\'t really a mistake, but many players don\'t realize how dangerous the open h-file is',
        punishment: 'After hxg3, your rook on h1 is already active. This is essentially a free attacking file.',
        howToPunish: 'Qe2 → Rae1 or Rad1, then Qe2-h5 with rook lifts to h1. Lethal pressure on h7.'
      },
      {
        move: '…O-O (into open h-file)',
        atMove: 'Move 10',
        desc: 'Castling kingside when the h-file is open',
        punishment: 'This walks into your main plan. The rook is already on h1 and the queen can swing to h5.',
        howToPunish: 'Qd3 → g4! → g5 chasing the Nf6 away from h7 defense → Qh7#.'
      },
      {
        move: '…dxc4?',
        atMove: 'After c4',
        desc: 'Black takes on c4 opening the position',
        punishment: 'Qxc4 with tempo and open lines. Your queen is active and Black\'s c6 pawn is backward.',
        howToPunish: 'Qxc4 → Nd4 or Ne5. The c6 pawn becomes a permanent target. Rooks on the c-file finish the job.'
      }
    ],
    tactics: [
      'h-file attack: hxg3 → Rh1 already active → Qe2/Qd3 → g4-g5 kicking Nf6 → Qh7+ mating ideas.',
      'g4-g5 pawn storm: The doubled g-pawns are ATTACKING pawns. Push g4-g5 to rip open the kingside.',
      'c4-c5 queenside clamp: Push c5 to restrict Black entirely and dominate both flanks.'
    ]
  },
  {
    id: 'kid-jobava',
    name: 'Line 5A: King\'s Indian (Jobava)',
    freq: '~8%',
    description: 'Black fianchettoes. The Jobava London with Nc3 is the sharper, higher-scoring approach.',
    moves: [
      { w: 'd4', b: 'Nf6', wComment: 'Standard.', bComment: 'Black starts with the knight — signals King\'s Indian.' },
      { w: 'Bf4', b: 'g6', wComment: 'London bishop out.', bComment: '⚠️ Fianchetto! This is the King\'s Indian setup.' },
      { w: 'Nc3', b: 'd5', wComment: '⭐ Jobava London! Nc3 instead of e3 gives you more central punch.', bComment: 'Black grabs central space.' },
      { w: 'e3', b: 'Bg7', wComment: 'Now play e3. You have strong central control.', bComment: 'Bishop to the long diagonal.' },
      { w: 'h3', b: 'O-O', wComment: 'Prevent …Nh5 attacking your bishop. Also prepares Bh2 retreat.', bComment: 'Black castles.' },
      { w: 'Nf3', b: 'c5', wComment: 'Develop the second knight.', bComment: 'Black challenges the center.' },
      { w: 'Be2', b: 'Nc6', wComment: 'Be2 is correct here (not Bd3) — the Bg7 makes h7 less of a target.', bComment: 'Black develops.' },
      { w: 'O-O', b: 'b6', wComment: 'Castle and get ready.', bComment: 'Black prepares the fianchetto on the queenside too.' },
      { w: 'Ne5', b: 'Bb7', wComment: '⭐ Outpost on e5. The Bg7 bites on granite (your d4+e3 chain).', bComment: 'Black finishes development.' },
      { w: 'a4', b: 'a5', wComment: 'Lock down the queenside. Black has no counterplay.', bComment: 'Black is forced to react defensively.' }
    ],
    mistakes: [
      {
        move: '…Nh5? (attacking Bf4)',
        atMove: 'Move 3-5',
        desc: 'Black tries to trade or kick your bishop',
        punishment: 'Be5! centralize the bishop powerfully. Or simply Bg5/Bg3 and the Nh5 is offside.',
        howToPunish: 'After …Nh5: Be5! The bishop is even stronger here. Black wasted a tempo and the knight is stuck on h5.'
      },
      {
        move: '…e5?!',
        atMove: 'Move 5-7',
        desc: 'Black pushes …e5 trying to seize the center',
        punishment: 'dxe5 Nxe5 Nxe5 and you\'ve won a central pawn with better development.',
        howToPunish: 'dxe5 → after trades, your central control is dominant and Black has weakened d5.'
      },
      {
        move: '…cxd4?! exd4',
        atMove: 'Move 6-8',
        desc: 'Black trades center pawns',
        punishment: 'You get a strong IQP with all pieces aimed at the kingside. Bg7 is blocked by your pawn chain.',
        howToPunish: 'After exd4: Ne5 → f4 → f5! steamroll. The Bg7 is completely locked out.'
      }
    ],
    tactics: [
      'Ne5 + f4 steamroller: Plant the knight, push f4, then f5 to blow open the kingside.',
      'e4 push (Jobava advantage): With Nc3 supporting, e4 is much easier to achieve than in the classical London.',
      'Queenside lock (a4-a5): Lock the queenside and attack the king at leisure.'
    ]
  },
  {
    id: 'kid-classical',
    name: 'Line 5B: King\'s Indian (Classical)',
    freq: '(Alternative to 5A)',
    description: 'The safer, pure London approach against the King\'s Indian. Sticks to the standard formula.',
    moves: [
      { w: 'd4', b: 'Nf6', wComment: 'Standard.', bComment: 'Knight out first.' },
      { w: 'Bf4', b: 'g6', wComment: 'London bishop.', bComment: 'Fianchetto setup.' },
      { w: 'e3', b: 'Bg7', wComment: 'Standard London — e3 to build the chain.', bComment: 'Bishop developed.' },
      { w: 'Nf3', b: 'O-O', wComment: 'Develop naturally.', bComment: 'Black castles.' },
      { w: 'Be2', b: 'd5', wComment: 'Be2 keeps things solid.', bComment: 'Black takes central space.' },
      { w: 'O-O', b: 'c5', wComment: 'Castle.', bComment: 'Standard counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4 firmly.', bComment: 'Black develops.' },
      { w: 'Nbd2', b: 'Nd7', wComment: 'Knight to d2, heading for e5.', bComment: 'Black reroutes for …e5 push.' },
      { w: 'h3', b: 'b6', wComment: 'Prevent …Nh5 and prepare Bh2.', bComment: 'Black fianchettoes.' },
      { w: 'Bh2', b: 'Bb7', wComment: 'Bishop is safe on h2. Ready for Ne5 and f4.', bComment: 'Development complete.' }
    ],
    mistakes: [
      {
        move: '…e5? (premature)',
        atMove: 'Move 4-7',
        desc: 'Black pushes …e5 before fully developed',
        punishment: 'dxe5 Nxe5 Nxe5 dxe5 Qxd8 — simplified with a better pawn structure.',
        howToPunish: 'After dxe5: Nd2-e5 is coming. You own the outpost and Black\'s center is gone.'
      },
      {
        move: '…f5?!',
        atMove: 'Move 6-9',
        desc: 'Black plays a Stonewall-like …f5',
        punishment: 'The e5 square is permanently weakened. Plant a knight there — it can never be kicked.',
        howToPunish: 'After …f5: Ne5 is forever. Play f3 → e4 to blow open the center against the overextended pawns.'
      }
    ],
    tactics: [
      'Ne5 outpost: The classic London dream. Once the knight is on e5, it controls the game.',
      'f4 + Bh2: The bishop is safe, f4 grabs space, and f5 is the next threat.',
      'c3-c4 central break: Once the position is stable, c4 opens things up favorably.'
    ]
  },
  {
    id: 'grunfeld',
    name: 'Line 6: Grünfeld-Style',
    freq: '~5%',
    description: 'Black tries to undermine your center with both …d5 and …c5 plus …e5.',
    moves: [
      { w: 'd4', b: 'Nf6', wComment: 'Standard.', bComment: 'Knight first.' },
      { w: 'Bf4', b: 'g6', wComment: 'London bishop.', bComment: 'Fianchetto — could be KID or Grünfeld.' },
      { w: 'e3', b: 'Bg7', wComment: 'Build the chain.', bComment: 'Long diagonal bishop.' },
      { w: 'Nf3', b: 'O-O', wComment: 'Develop.', bComment: 'Castle.' },
      { w: 'Be2', b: 'd5', wComment: 'Solid bishop placement.', bComment: 'Black takes space.' },
      { w: 'O-O', b: 'c5', wComment: 'Castle.', bComment: '⚠️ Now both …d5 AND …c5 — Grünfeld approach!' },
      { w: 'c3', b: 'Nc6', wComment: 'Anchor d4. This pawn is the key to your position.', bComment: 'Pressure on d4.' },
      { w: 'Nbd2', b: 'Nd7', wComment: 'Flexible knight.', bComment: 'Preparing …e5.' },
      { w: 'h3', b: 'e5', wComment: 'Prepare Bh2 retreat.', bComment: '⚠️ Big push! Black wants to dominate the center.' },
      { w: 'Bh2', b: 'f5', wComment: 'Bishop is safe. Let Black overextend — their center will crack.', bComment: 'Looks impressive but is actually vulnerable!' }
    ],
    mistakes: [
      {
        move: '…e5 + …f5 (overextension)',
        atMove: 'Move 9-10',
        desc: 'Black pushes both …e5 and …f5 which looks scary but creates holes',
        punishment: 'dxc5! or wait for e4 break. The e5+f5 center is unstable once you strike it.',
        howToPunish: 'After …e5 …f5: play dxc5! or dxe5. The center collapses and your pieces flood in.'
      },
      {
        move: '…cxd4?!',
        atMove: 'Move 6-8',
        desc: 'Black trades the c-pawn',
        punishment: 'exd4 or cxd4 both fine. Your center is strong and d4 isn\'t really weak with all your pieces supporting.',
        howToPunish: 'After cxd4: exd4 with open lines and active pieces. Bg7 is blocked by your pawn chain.'
      }
    ],
    tactics: [
      'Let them overextend: …e5 + …f5 looks scary but e4! or dxc5 cracks it open.',
      'dxc5 pawn grab: Take on c5 and hold with b4. Black\'s Bg7 is completely shut out.',
      'Nb3 targeting c5 and a5: The knight on b3 hits c5 and can go to a5 for queenside pressure.'
    ]
  },
  {
    id: 'dutch',
    name: 'Line 7: Dutch (…f5)',
    freq: '~3%',
    description: 'Rare but Black has weakened their kingside. You should be happy to see this.',
    moves: [
      { w: 'd4', b: 'f5', wComment: 'Standard.', bComment: '⚠️ Dutch Defense! Black weakens the kingside immediately.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop. This is already slightly better for you.', bComment: 'Normal development.' },
      { w: 'e3', b: 'e6', wComment: 'Build the chain.', bComment: 'Black tries to solidify.' },
      { w: 'Nf3', b: 'b6', wComment: 'Develop.', bComment: 'Black fianchettoes — typical Dutch.' },
      { w: 'Bd3', b: 'Bb7', wComment: 'Bishop aims at the weakened kingside.', bComment: 'Bishop developed.' },
      { w: 'O-O', b: 'Be7', wComment: 'Castle and prepare your attack.', bComment: 'Black develops modestly.' },
      { w: 'Nbd2', b: 'O-O', wComment: 'Standard knight.', bComment: 'Black develops.' },
      { w: 'Ne5', b: 'd6', wComment: '⭐ Plant the knight on e5. This square is permanently weak after …f5.', bComment: 'Black has to kick it or live with it.' },
      { w: 'Nef3', b: 'Nbd7', wComment: 'Retreat and regroup. The knight can come back to e5 or reroute via d2.', bComment: 'Black develops.' },
      { w: 'c4', b: 'Ne4', wComment: 'Strike the center while Black is committed on the kingside.', bComment: 'Black tries for counterplay.' }
    ],
    mistakes: [
      {
        move: '…f5 itself',
        atMove: 'Move 1',
        desc: 'Playing …f5 on move 1 already weakens the king',
        punishment: 'The e5 square is a permanent outpost. g6 and h7 are also weakened. Your standard London setup is already better.',
        howToPunish: 'Ne5 is the dream. Also Qh5 becomes possible if Black\'s king ever gets exposed.'
      },
      {
        move: '…O-O (kingside castling)',
        atMove: 'Move 7',
        desc: 'Castling kingside with f5 already played',
        punishment: 'Your Bd3 + Ne5 setup is aimed right at the king. The f5 pawn weakened the very squares you\'re targeting.',
        howToPunish: 'Qh5! if Black allows it. Otherwise e4! fxe4, Nxe4 with a monster knight and open f-file toward the king.'
      },
      {
        move: '…g6?',
        atMove: 'Any point',
        desc: 'Playing …g6 with …f5 already on the board',
        punishment: 'The light squares around the king (h7, g6, f7) are all weak. Bxg6! or Qh5 can be crushing.',
        howToPunish: 'After …f5 and …g6: Bxg6! hxg6, Qxg6 is often checkmate or wins heavy material.'
      }
    ],
    tactics: [
      'Qh5 threats: With …f5 played, the king is exposed. Qh5 is a constant threat.',
      'e3-e4 break: e4! fxe4, Nxe4 opens the f-file and gives you a monster knight.',
      'Bxg6! sacrifice: If Black plays …g6 after …f5, Bxg6! hxg6, Qxg6 is devastating.'
    ]
  },
  {
    id: 'early-e5',
    name: 'Line 8: Early …e5',
    freq: '~2%',
    description: 'Black tries to \'refute\' the London. You win a pawn and trade into a better endgame.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'e5', wComment: 'London bishop.', bComment: '⚠️ Aggressive! Black tries to punish the early Bf4.' },
      { w: 'dxe5', b: 'd4', wComment: '⭐ Take the pawn! You\'re up material.', bComment: 'Black pushes for compensation. Don\'t panic.' },
      { w: 'e3', b: 'Bb4+', wComment: 'Open lines and challenge the d4 pawn.', bComment: 'Check! But it\'s not dangerous.' },
      { w: 'c3', b: 'dxc3', wComment: 'Offer the trade. You\'re breaking open the center favorably.', bComment: 'Black takes.' },
      { w: 'Nxc3', b: 'Bxc3+', wComment: '⭐ Knight takes the pawn on c3! Now the Nb1 is developed with tempo.', bComment: 'Black takes the knight back with check.' },
      { w: 'bxc3', b: 'Qxd1+', wComment: 'b-pawn recaptures. You have an open b-file and good center.', bComment: 'Queen trade. Don\'t worry — the endgame is in YOUR favor.' },
      { w: 'Rxd1', b: 'Nc6', wComment: '⭐ You have: extra e5 pawn + bishop pair + development lead. This is great!', bComment: 'Black tries to win back the pawn.' },
      { w: 'Bb5', b: 'Bd7', wComment: 'Pin the knight and keep your advantage.', bComment: 'Black defends.' },
      { w: 'Nf3', b: 'Nge7', wComment: 'Develop and prepare to consolidate your extra pawn.', bComment: 'Black is struggling to equalize.' }
    ],
    mistakes: [
      {
        move: '…e5 itself',
        atMove: 'Move 2',
        desc: 'This gambit is slightly dubious — you\'re just up a pawn',
        punishment: 'Accept with dxe5 and play accurately. The endgame is clearly better for White.',
        howToPunish: 'dxe5 → calm play. Don\'t give the pawn back. Support with f4 if needed.'
      },
      {
        move: '…Nc6 without …Bg4',
        atMove: 'Move 8',
        desc: 'Black develops the knight without pinning yours first',
        punishment: 'Bb5! pins the knight and keeps complete control. Black can\'t win the e5 pawn easily.',
        howToPunish: 'Bb5 + Nf3 + Nd5. Your pieces are perfectly coordinated.'
      },
      {
        move: '…Nxe5?',
        atMove: 'After development',
        desc: 'Black wins back the pawn but opens lines for your pieces',
        punishment: 'Nxe5 + Bb5+ gives you massive activity. Your rooks on d1 and the open position favor the bishop pair.',
        howToPunish: 'After …Nxe5: Nxe5 + develop aggressively. Bishop pair + open position = winning.'
      }
    ],
    tactics: [
      'Keep the e5 pawn: Support with f4 if needed. It\'s a passed pawn in the endgame.',
      'Bishop pair advantage: In the open endgame position, two bishops dominate.',
      'Nd5 outpost: Place a knight on d5 to dominate the position.'
    ]
  },
  {
    id: 'chigorin',
    name: 'Line 9: …Nc6 (Chigorin)',
    freq: '~2%',
    description: 'Black develops the knight to c6 early, blocking their own c-pawn.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nc6', wComment: 'London bishop.', bComment: '⚠️ Chigorin-style! Knight blocks the c-pawn.' },
      { w: 'e3', b: 'Nf6', wComment: 'Build the chain.', bComment: 'Normal development.' },
      { w: 'Nf3', b: 'Bg4', wComment: 'Develop.', bComment: 'Black pins the knight.' },
      { w: 'Be2', b: 'e6', wComment: 'Unpin naturally. The Bg4 will have to make a decision.', bComment: 'Black solidifies.' },
      { w: 'O-O', b: 'Bd6', wComment: 'Castle.', bComment: 'Standard development.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat as always.', bComment: 'Black castles.' },
      { w: 'Nbd2', b: 'Ne7', wComment: 'Knight heading for e5.', bComment: 'Black reroutes the c6 knight — admits it was misplaced!' },
      { w: 'c4', b: 'c6', wComment: '⭐ Strike! Black couldn\'t play …c5 with Nc6 blocking, so you get c4 in first.', bComment: 'Black tries to hold but is already cramped.' },
      { w: 'Ne5', b: 'Bxe2', wComment: 'Outpost! With c4 in and Ne5, you dominate the center.', bComment: 'Black trades to relieve pressure.' }
    ],
    mistakes: [
      {
        move: '…Nc6 itself',
        atMove: 'Move 2',
        desc: 'The knight on c6 blocks the c-pawn',
        punishment: 'Play c4! since Black can\'t respond with …c5. You get a favorable central structure.',
        howToPunish: 'c4 achieves maximum impact because Black can\'t counter with …c5.'
      },
      {
        move: '…Bg4 without …e6 first',
        atMove: 'Move 4',
        desc: 'Premature pin — the bishop can be harassed',
        punishment: 'h3 → g4 gains tempo and space. The bishop has to keep retreating.',
        howToPunish: 'h3 Bh5, g4 Bg6, Ne5! All with tempo. You\'ve gained space for free.'
      },
      {
        move: '…Ne7 (retreating)',
        atMove: 'Move 8',
        desc: 'Black admits Nc6 was wrong and retreats',
        punishment: 'You\'ve gained multiple tempi. Use them to play c4 and take over the center immediately.',
        howToPunish: 'c4 + Ne5 while Black wastes time rerouting. You\'re several tempi ahead.'
      }
    ],
    tactics: [
      'c4 before Black can play …c5: The main advantage of facing …Nc6 — exploit the blocked pawn.',
      'h3-g4 bishop chase: Gain tempi and kingside space against an early …Bg4.',
      'd4-d5 advance: Push d5 to blow open the center when Black\'s knight is on e7.'
    ]
  },
  {
    id: 'modern',
    name: 'Line 10: Modern/Pirc (…g6, …d6)',
    freq: '~2%',
    description: 'Black plays without …d5. Use Bc4 to exploit the open a2-g8 diagonal.',
    moves: [
      { w: 'd4', b: 'g6', wComment: 'Standard.', bComment: '⚠️ Modern Defense — no …d5 coming.' },
      { w: 'Bf4', b: 'Bg7', wComment: 'London bishop.', bComment: 'Fianchetto.' },
      { w: 'e3', b: 'd6', wComment: 'Build the chain.', bComment: 'Black plays …d6 instead of …d5. Different plan needed!' },
      { w: 'Nf3', b: 'Nf6', wComment: 'Develop.', bComment: 'Standard.' },
      { w: 'Bc4', b: 'O-O', wComment: '⭐ KEY CHANGE: Bc4 not Bd3! With no pawn on d5, the bishop owns the a2-g8 diagonal.', bComment: 'Black castles.' },
      { w: 'O-O', b: 'Nbd7', wComment: 'Castle.', bComment: 'Black develops.' },
      { w: 'h3', b: 'c5', wComment: 'Prevent …Ng4 and prepare.', bComment: 'Black strikes at the center.' },
      { w: 'c3', b: 'b6', wComment: 'Hold d4.', bComment: 'Black fianchettoes the other bishop.' },
      { w: 'Nbd2', b: 'Bb7', wComment: 'Standard development. Heading for Ne5 or e4.', bComment: 'Development complete.' },
      { w: 'Qe2', b: 'e5', wComment: '⭐ Qe2 + Bc4 battery! Both staring at f7. Very dangerous.', bComment: 'Black pushes but f7 is now very tender.' }
    ],
    mistakes: [
      {
        move: '…d6 (instead of …d5)',
        atMove: 'Move 3',
        desc: 'Not really a mistake but gives you the Bc4 option',
        punishment: 'Bc4 aims at f7 which is much harder to defend without a pawn on d5.',
        howToPunish: 'Bc4 + Qe2 battery on the a2-g8 diagonal. f7 is chronically weak.'
      },
      {
        move: '…e5? (with Bc4 on the board)',
        atMove: 'Move 8-10',
        desc: 'Black pushes …e5 but opens the diagonal to f7',
        punishment: 'dxe5 dxe5 Ng5! threatening Bxf7+ and Nxf7. If …h6, Bxf7+!',
        howToPunish: 'After …e5 dxe5 dxe5: Ng5! with Bxf7+ ideas. Devastating tactics on f7.'
      },
      {
        move: '…Nh5?',
        atMove: 'Move 5-8',
        desc: 'Black tries to harass the bishop',
        punishment: 'Bg5! punishes. If …f6? then Bxf7+! The knight on h5 isn\'t helping defend.',
        howToPunish: 'After …Nh5: Bg5 → if …f6, Bxf7+! Kxf7, Bc4+ winning.'
      }
    ],
    tactics: [
      'Bc4 + Qe2 battery: Both aimed at f7. Tactical shots with Ng5 or Bxf7+ are common.',
      'e4 space advantage: Push e4 to dominate the center and restrict Black.',
      'dxc5 + Nd4: If Black plays …c5, take and plant a knight on d4 with a dream outpost.'
    ]
  },
  {
    id: 'french-delay',
    name: 'Line 11: …e6 First (French Delay)',
    freq: '~5%',
    description: 'Black plays …e6 before …d5. Usually transposes to Line 1.',
    moves: [
      { w: 'd4', b: 'e6', wComment: 'Standard.', bComment: '⚠️ …e6 first. Could be French or transposition to Line 1.' },
      { w: 'Bf4', b: 'd5', wComment: 'London bishop out.', bComment: 'Now it transposes! Same structure as Line 1.' },
      { w: 'e3', b: 'Nf6', wComment: 'Build the chain.', bComment: 'Standard development.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offering the trade again.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat! Same as Line 1.', bComment: 'Castle.' },
      { w: 'Bd3', b: 'c5', wComment: 'Aim at h7.', bComment: 'Standard counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4.', bComment: 'Develop.' },
      { w: 'Nbd2', b: 'Re8', wComment: 'Knight to d2, heading for e5.', bComment: 'Black prepares …e5 push.' },
      { w: 'Ne5', b: 'Nd7', wComment: '⭐ The dream outpost.', bComment: 'Challenging the knight.' },
      { w: 'f4', b: 'f6', wComment: 'Lock down the kingside.', bComment: '⚠️ …f6 kicks the knight but weakens e6 forever!' }
    ],
    mistakes: [
      {
        move: '…f6? (kicking Ne5)',
        atMove: 'Move 10',
        desc: 'Black plays …f6 to kick the knight',
        punishment: 'Nxc6! bxc6 — Black has doubled c-pawns AND the e6 pawn is weak on the open diagonal.',
        howToPunish: 'Nxc6 bxc6 → Bd3 aims at both h7 and the weak e6 pawn. Black\'s structure is ruined.'
      },
      {
        move: '…b6 then …Bb7 (instead of …d5)',
        atMove: 'Move 2-4',
        desc: 'Black avoids …d5 and plays a Queen\'s Indian style',
        punishment: 'Just continue normally. Without …d5, you can play c4 and get a bigger center.',
        howToPunish: 'e3 → Nf3 → c4 → Nc3. You have a massive center and Black is cramped.'
      },
      {
        move: '…e5? (premature)',
        atMove: 'Move 8-10',
        desc: 'Black pushes …e5 too early',
        punishment: 'dxe5 Nxe5 Nxe5 Rxe5 Bc7! wins the queen or traps the rook.',
        howToPunish: 'Look for discovered attacks after dxe5. The open d-file and your active pieces dominate.'
      }
    ],
    tactics: [
      'Same as Line 1: Kingside attack, Bxh7+ sacrifice, e4 break.',
      'Nxc6 structure damage: If …f6, take on c6 to ruin their pawns.',
      'f4 lockdown: Same kingside space strategy — f4 then target the weakened king.'
    ]
  },
  {
    id: 'branch-1-cxd4',
    name: '↳ What if …cxd4? (IQP Play)',
    freq: 'Branch from Line 1, move 6',
    section: 'What If? Branches',
    description: 'Black takes cxd4 in the mainline. You recapture with exd4 and get an Isolated Queen Pawn — but with MASSIVE piece activity.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard opening.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop out.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Build the chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offering bishop trade.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat — keep the bishop!', bComment: 'Black castles.' },
      { w: 'Bd3', b: 'c5', wComment: 'Aim at h7.', bComment: 'Black challenges the center.' },
      { w: 'c3', b: 'cxd4', wComment: 'Reinforce d4.', bComment: '⚠️ Black takes! This gives you an IQP but open lines.' },
      { w: 'exd4', b: 'Nc6', wComment: '⭐ Recapture with the e-pawn! Your pieces are aimed at the kingside and the open e-file is yours.', bComment: 'Black develops.' },
      { w: 'Nbd2', b: 'Nb4', wComment: 'Knight heading for e5. The IQP gives you active play.', bComment: 'Black attacks Bd3.' },
      { w: 'Bb1', b: 'b6', wComment: '⭐ Classic! Bb1 + Qd3 is a classic battery aiming at h7!', bComment: 'Black fianchettoes.' }
    ],
    mistakes: [
      {
        move: '…cxd4 itself',
        atMove: 'Move 7',
        desc: 'Taking on d4 opens lines for YOUR pieces more than Black\'s',
        punishment: 'exd4 gives you open e-file, c-file, and all pieces pointed at the king. The IQP is a strength, not a weakness!',
        howToPunish: 'After exd4: Bb1 + Qd3 battery on h7. Ne5 outpost. Rae1 on the open e-file. Full kingside attack.'
      },
      {
        move: '…Nb4? attacking Bd3',
        atMove: 'Move 9',
        desc: 'Black chases the bishop but wastes time',
        punishment: 'Bb1! is actually BETTER. The Bb1+Qd3 diagonal is the classic IQP attacking setup.',
        howToPunish: 'Bb1 → Qd3 → a3 chasing the knight → Ne5 → full attack. Black wasted 2 tempi for nothing.'
      }
    ],
    tactics: [
      'Bb1 + Qd3 battery: Classic IQP tactic. Both aim at h7. Devastating with Ne5 support.',
      'd4-d5! pawn break: At the right moment, push d5! to blow open the center. If …exd5, Nxd5 is crushing.',
      'Rae1 + open e-file: Rook on the open e-file pressures e6. Combined with the kingside attack, Black is overwhelmed.'
    ]
  },
  {
    id: 'branch-1-bxg3',
    name: '↳ What if …Bxg3? (h-file opens)',
    freq: 'Branch from Line 1, move 5',
    section: 'What If? Branches',
    description: 'After 5.Bg3, Black trades with …Bxg3. You recapture hxg3 and get a FREE open h-file aimed at the king.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offering trade.' },
      { w: 'Bg3', b: 'Bxg3', wComment: 'Sidestep.', bComment: '⚠️ Black trades! They think they\'ve solved the bishop problem — but they just opened the h-file for you.' },
      { w: 'hxg3', b: 'O-O', wComment: '⭐ h-file is OPEN! Your rook on h1 is already active. This is a huge asset.', bComment: 'Castling into the open h-file. Dangerous!' },
      { w: 'Bd3', b: 'c5', wComment: 'Aim at h7. With the open h-file, h7 is a real target.', bComment: 'Black tries counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4.', bComment: 'Develop.' },
      { w: 'Nbd2', b: 'Qe7', wComment: 'Knight to d2, heading for e5.', bComment: 'Black connects.' },
      { w: 'Qe2', b: 'Nd7', wComment: '⭐ Queen goes to e2 — preparing to swing to h5 or support an e4 break. The h-file pressure is building.', bComment: 'Black retreats.' }
    ],
    mistakes: [
      {
        move: '…Bxg3 itself',
        atMove: 'Move 5',
        desc: 'Trading gives White a free open h-file',
        punishment: 'hxg3 → Rh1 already active, doubled pawns on g-file are ATTACKING pawns (g4-g5 storm).',
        howToPunish: 'Qe2 → Qh5 if allowed. Or Rh1 + Qd3 eyeing h7. g4-g5 pushes chase the Nf6 away from defense.'
      },
      {
        move: '…O-O (castling into it)',
        atMove: 'Move 6',
        desc: 'Castling kingside when the h-file is wide open',
        punishment: 'You\'re already attacking. Bd3+Qe2 then Qh5 or g4-g5 creates mating threats.',
        howToPunish: 'g4! → g5 → chase the Nf6 → Qh5 → Rh1-h7. Textbook kingside demolition.'
      },
      {
        move: '…g6?',
        atMove: 'Any point',
        desc: 'Trying to block the h-file pressure with …g6',
        punishment: 'All the dark squares around the king collapse. f6, h6 become targets.',
        howToPunish: 'After …g6: Qe2-h5! threatens Qh7#. Or Ng5 with unstoppable Qh5.'
      }
    ],
    tactics: [
      'g4-g5 pawn storm: The doubled g-pawns launch forward to rip open lines around the king.',
      'Qe2 → Qh5: Swing the queen to the kingside. With the open h-file it\'s devastating.',
      'Rook lift Rh1-h4-f4: Use the open h-file for a rook lift to the kingside.'
    ]
  },
  {
    id: 'branch-2-cxd4',
    name: '↳ What if …cxd4 early? (Line 2)',
    freq: 'Branch from Line 2, move 3-5',
    section: 'What If? Branches',
    description: 'In the …c5 line, Black captures cxd4 early. You recapture exd4 and play IQP dynamics with active pieces.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'c5', wComment: 'London bishop.', bComment: 'Early …c5 challenge.' },
      { w: 'e3', b: 'cxd4', wComment: 'Build chain.', bComment: '⚠️ Black takes immediately! They want to saddle you with an IQP.' },
      { w: 'exd4', b: 'Nc6', wComment: '⭐ Recapture exd4. You have an IQP but your bishop on f4 is already active and the e-file is open.', bComment: 'Black develops, pressuring d4.' },
      { w: 'Nf3', b: 'Nf6', wComment: 'Develop naturally.', bComment: 'Standard.' },
      { w: 'c3', b: 'e6', wComment: 'Support d4 and take away the d4 square from Black\'s knights.', bComment: 'Solid.' },
      { w: 'Bd3', b: 'Be7', wComment: 'Aim at h7 — standard London.', bComment: 'Modest development.' },
      { w: 'O-O', b: 'O-O', wComment: 'Castle.', bComment: 'Castle.' },
      { w: 'Nbd2', b: 'Nb4', wComment: 'Knight heading to e5.', bComment: 'Black harasses the bishop.' },
      { w: 'Bb1', b: 'b6', wComment: '⭐ Classic! Bb1 + Qd3 is the IQP dream — both staring at h7.', bComment: 'Black develops.' }
    ],
    mistakes: [
      {
        move: '…cxd4 (early trade)',
        atMove: 'Move 3',
        desc: 'Opens the position when White\'s bishop is already active',
        punishment: 'exd4 → active IQP. You have the only developed piece and the open e-file. Black is behind.',
        howToPunish: 'Bd3 + Bb1 + Qd3 battery. Ne5 outpost. The d-pawn is mobile — d5! blows things open.'
      },
      {
        move: '…Nb4 chasing Bd3',
        atMove: 'Move 9',
        desc: 'Wastes time chasing the bishop',
        punishment: 'Bb1 is stronger! Now play Qd3 and a3 — the knight retreats and you\'ve gained a tempo for your attack.',
        howToPunish: 'Bb1 → Qd3 → a3 Nc6 → Ne5 → full attack while Black has wasted 2 moves.'
      },
      {
        move: '…Nd7?! (blocking the d-file)',
        atMove: 'After castling',
        desc: 'Knight blocks the d-pawn and is passive',
        punishment: 'Ne5! immediately. The d7 knight blocks Black\'s queen from defending the kingside.',
        howToPunish: 'Ne5 → Qf3 → Qh3. Black\'s pieces are tangled and can\'t coordinate defense.'
      }
    ],
    tactics: [
      'd4-d5! break: The key moment. Push d5 when you have enough pieces attacking to blow open the center.',
      'Bb1 + Qd3 battery: Classic IQP setup targeting h7.',
      'Nc4 targeting d6 and b6: Knight to c4 hits weak dark squares in Black\'s camp.'
    ]
  },
  {
    id: 'branch-2-nh5',
    name: '↳ What if …Nh5? (Kicking Bf4)',
    freq: 'Branch from Lines 1/2, move 4-6',
    section: 'What If? Branches',
    description: 'Black plays …Nh5 trying to kick or trade your London bishop. This wastes time and you can punish it.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Nh5', wComment: 'Develop.', bComment: '⚠️ Black attacks your bishop! Don\'t panic.' },
      { w: 'Bg3', b: 'Nxg3', wComment: '⭐ Just retreat! If they trade, you get the h-file. If they don\'t, the knight is stuck on h5.', bComment: 'Black takes — but this helps you!' },
      { w: 'hxg3', b: 'Bd6', wComment: '⭐ The h-file is OPEN for free! Black wasted 2 tempi (Nf6-h5xg3) just to give you an attacking file.', bComment: 'Black finally develops a piece.' },
      { w: 'Bd3', b: 'O-O', wComment: 'Aim at h7 — now with the h-file open!', bComment: 'Castling into the open h-file. Very risky.' },
      { w: 'c3', b: 'c5', wComment: 'Hold the center.', bComment: 'Black tries counterplay.' },
      { w: 'Nbd2', b: 'Nc6', wComment: 'Knight heading for e5.', bComment: 'Develops.' },
      { w: 'Qe2', b: 'Qe7', wComment: '⭐ Queen ready to swing to h5 or support e4. Black wasted time; you\'re already attacking.', bComment: 'Black is behind in the race.' }
    ],
    mistakes: [
      {
        move: '…Nh5 itself',
        atMove: 'Move 4',
        desc: 'Wastes TWO tempi to trade a knight for your bishop — and gives you the h-file',
        punishment: 'After Bg3 Nxg3 hxg3, you have a free open h-file. The knight spent 2 moves to achieve nothing.',
        howToPunish: 'hxg3 → Bd3 + Qe2 → Qh5 threats. g4-g5 kingside storm. Massive attack for free.'
      },
      {
        move: '…Nh5 then retreats Nf6',
        atMove: 'Move 4-5',
        desc: 'Black chickens out and retreats — pure tempo loss',
        punishment: 'You\'ve gained a free tempo. Black played Nf6-h5-f6, moving the same piece 3 times.',
        howToPunish: 'Just continue normally — you\'re a full tempo ahead. Develop and attack faster.'
      },
      {
        move: '…O-O after hxg3',
        atMove: 'Move 7',
        desc: 'Castling into the open h-file',
        punishment: 'Qe2 → Qh5 is coming. Combined with Bd3 on h7, it\'s very hard to defend.',
        howToPunish: 'Qe2 → g4 → g5 → Qh5 → Rh1 delivers a textbook kingside mate.'
      }
    ],
    tactics: [
      'Free h-file: Black gave you this for nothing. Exploit with Qe2-h5 and rook lifts.',
      'g4-g5 storm: Doubled g-pawns launch forward for a kingside attack.',
      'Tempo advantage: Black wasted 2 moves on the knight. You\'re ahead in development — attack immediately.'
    ]
  },
  {
    id: 'branch-4-dxc4',
    name: '↳ What if …dxc4? (Slav takes c4)',
    freq: 'Branch from Line 4, after c4',
    section: 'What If? Branches',
    description: 'In the Slav line, Black captures dxc4 after you play c4. This opens the center in your favor.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'c6', wComment: 'Chain.', bComment: 'Slav setup.' },
      { w: 'Nf3', b: 'Bf5', wComment: 'Develop.', bComment: 'Bishop out.' },
      { w: 'Bd3', b: 'Bxd3', wComment: 'Force trade.', bComment: 'Takes.' },
      { w: 'Qxd3', b: 'e6', wComment: 'Active queen.', bComment: 'Solid.' },
      { w: 'O-O', b: 'Bd6', wComment: 'Castle.', bComment: 'Offering trade.' },
      { w: 'Bg3', b: 'Bxg3', wComment: 'Retreat.', bComment: 'Black trades.' },
      { w: 'hxg3', b: 'Nbd7', wComment: 'h-file opens!', bComment: 'Develops.' },
      { w: 'c4', b: 'dxc4', wComment: 'Strike the center.', bComment: '⚠️ Black takes — but this helps you!' }
    ],
    mistakes: [
      {
        move: '…dxc4',
        atMove: 'Move 10',
        desc: 'Opens the center and gives White the c-file plus active queen',
        punishment: 'Qxc4 with tempo — queen eyes a6 and c6. Black\'s c6 pawn becomes a permanent weakness on the open file.',
        howToPunish: 'Qxc4 → Rc1 targeting c6 → Nd4. Black has a backward c-pawn and no counterplay.'
      },
      {
        move: '…O-O with h-file open',
        atMove: 'After hxg3',
        desc: 'Castling into the open h-file',
        punishment: 'g4 → g5 pushes the Nf6 away from defending h7, then Qh7#.',
        howToPunish: 'Qd3 (eyes h7) → g4 → g5 → Nf6 moves → Qh7+ ideas.'
      }
    ],
    tactics: [
      'Qxc4 with tempo: Queen is perfectly placed — hits a6, c6, and can swing to the kingside.',
      'Rc1 on the c-file: The c6 pawn becomes a permanent target.',
      'g4-g5 h-file storm: Same kingside attack as the main Slav line.'
    ]
  },
  {
    id: 'branch-5-e5',
    name: '↳ What if …e5? (vs King\'s Indian)',
    freq: 'Branch from Line 5, move 5-7',
    section: 'What If? Branches',
    description: 'Against your London/Jobava setup, Black pushes …e5 trying to seize the center. You win material.',
    moves: [
      { w: 'd4', b: 'Nf6', wComment: 'Standard.', bComment: 'Knight first.' },
      { w: 'Bf4', b: 'g6', wComment: 'London bishop.', bComment: 'KID setup.' },
      { w: 'Nc3', b: 'Bg7', wComment: 'Jobava! Knight to c3.', bComment: 'Fianchetto.' },
      { w: 'e3', b: 'd6', wComment: 'Build chain.', bComment: 'Flexible.' },
      { w: 'Nf3', b: 'O-O', wComment: 'Develop.', bComment: 'Castle.' },
      { w: 'Be2', b: 'e5', wComment: 'Solid.', bComment: '⚠️ Black pushes …e5! Trying to seize the center.' },
      { w: 'dxe5', b: 'dxe5', wComment: '⭐ Take it! Now the d-file is open and Black\'s pawn on e5 is a target.', bComment: 'Black recaptures.' },
      { w: 'Bg5', b: 'Nc6', wComment: '⭐ Pin the knight! Bg5 is very annoying — it pressures f6 and controls the dark squares.', bComment: 'Black develops.' },
      { w: 'Qxd8', b: 'Rxd8', wComment: 'Trade queens — your structure is better and the pin was strong.', bComment: 'Black recaptures.' },
      { w: 'Nd5', b: 'Be6', wComment: '⭐ Knight lands on d5! This is a dominant outpost that Black can barely challenge.', bComment: 'Black tries to deal with the knight.' }
    ],
    mistakes: [
      {
        move: '…e5 (premature)',
        atMove: 'Move 6',
        desc: 'Opens the d-file which benefits White',
        punishment: 'dxe5 dxe5 Bg5! pins and pressures. Then Nd5 dominates.',
        howToPunish: 'dxe5 dxe5 → Bg5 pin → Qxd8 → Nd5. You dominate the only open file with a monster knight.'
      },
      {
        move: '…Nxe5?? (recapture with knight)',
        atMove: 'Move 7',
        desc: 'Taking with the knight instead of the pawn',
        punishment: 'Nxe5 wins a pawn! After …dxe5 you\'re just up material.',
        howToPunish: 'If …Nxe5 Nxe5 dxe5 Qxd8 — you\'re up a clean pawn with a better position.'
      }
    ],
    tactics: [
      'Nd5 outpost: The dominant knight on d5 controls the game.',
      'Bg5 pin: After dxe5, Bg5 is very strong — it pins the Nf6 and controls key dark squares.',
      'Open d-file: You own the d-file after the exchange. Rooks on d1 pressure Black.'
    ]
  },
  {
    id: 'branch-1-exd4',
    name: '↳ What if …exd4? (e-pawn takes)',
    freq: 'Branch from Lines 1/2 if Black plays …e5',
    section: 'What If? Branches',
    description: 'What if Black ever manages to push …e5 and trade exd4? You recapture and keep the center.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offers trade.' },
      { w: 'Bg3', b: 'Bxg3', wComment: 'Retreat.', bComment: '⚠️ Black decides to trade the dark bishops.' },
      { w: 'hxg3', b: 'Nc6', wComment: 'Aim at h7.', bComment: 'Develops.' },
      { w: 'c3', b: 'e5', wComment: 'Hold center.', bComment: '⚠️ Black tries …e5 push to free their position.' },
      { w: 'dxe5', b: 'Nxe5', wComment: '⭐ Take! After Nxe5, you trade knights and have the better structure.', bComment: 'Black recaptures with knight.' },
      { w: 'Nxe5', b: 'Qe7', wComment: '⭐ You\'re better: open h-file, Bd3 aimed at h7, and Black has no dark-squared bishop to defend.', bComment: 'Black develops the queen, eyeing the e-file.' }
    ],
    mistakes: [
      {
        move: '…Bxg3 then …e5',
        atMove: 'Move 6-8',
        desc: 'Black trades dark bishop THEN pushes …e5 — the dark squares collapse',
        punishment: 'Without the dark-squared bishop, Black\'s king is very vulnerable on the dark squares.',
        howToPunish: 'After Nxe5: Qf3 or Qc2 → g4 → g5. The h-file + missing dark bishop = devastating attack.'
      },
      {
        move: '…e5 with no dark-squared bishop',
        atMove: 'Move 8',
        desc: 'Opening the position when you have the only remaining bishop',
        punishment: 'Bd3 is incredibly strong — controls the only open diagonal. Black can\'t cover both light and dark squares.',
        howToPunish: 'Qe2 or Qf3 + Rh1 open file. The Bd3 is a monster with no opposing bishop.'
      }
    ],
    tactics: [
      'h-file + no dark bishop: The combination of open h-file and missing Bd6 is deadly.',
      'Bd3 dominance: Your bishop is the best piece on the board with no counterpart.',
      'g4-g5 storm: Push the doubled g-pawns forward to rip open the kingside.'
    ]
  },
  {
    id: 'branch-3-no-trade',
    name: '↳ What if …Bg6? (Bishop retreats)',
    freq: 'Branch from Line 3, move 5',
    section: 'What If? Branches',
    description: 'After you play Bd3 to force a trade, what if Black retreats the bishop to g6 instead of taking?',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Bf5', wComment: 'London bishop.', bComment: 'Mirror bishop.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Nf6', wComment: 'Develop.', bComment: 'Develop.' },
      { w: 'Bd3', b: 'Bg6', wComment: 'Force trade!', bComment: '⚠️ Black retreats instead of trading! This loses time.' },
      { w: 'Bxg6', b: 'hxg6', wComment: '⭐ YOU take! Black now has doubled g-pawns and a weakened kingside — the h-file is half-open.', bComment: 'Forced recapture. Black has damaged structure.' },
      { w: 'O-O', b: 'Bd6', wComment: 'Castle. You\'re already better structurally.', bComment: 'Black develops.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Standard retreat.', bComment: 'Black castles with weakened king.' },
      { w: 'Nbd2', b: 'c5', wComment: 'Knight heading for e5.', bComment: 'Counterplay attempt.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4. You\'re clearly better — Black\'s king is weak and the structure is damaged.', bComment: 'Black develops.' }
    ],
    mistakes: [
      {
        move: '…Bg6 (retreat)',
        atMove: 'Move 5',
        desc: 'Retreating loses a tempo and you get to trade on YOUR terms',
        punishment: 'Bxg6 hxg6 damages Black\'s kingside pawns. The h-file is now half-open for your rook.',
        howToPunish: 'After Bxg6 hxg6: O-O + Re1 or Qe2. The doubled g-pawns and open h-file give you a lasting edge.'
      },
      {
        move: '…fxg6?? (wrong recapture)',
        atMove: 'Move 6',
        desc: 'Recapturing with f-pawn instead of h-pawn',
        punishment: 'This is much worse! The f-file opens toward Black\'s king and the pawns are still ugly.',
        howToPunish: 'After …fxg6: Bg5! pins the Nf6 to the queen. The f-file is wide open for your rooks.'
      }
    ],
    tactics: [
      'Bxg6 hxg6 structure damage: Black\'s doubled g-pawns are permanent weaknesses.',
      'Semi-open h-file: Even though it\'s only half-open, it gives your rook activity.',
      'Ne5 targeting g6: The knight on e5 puts pressure on the weak g6 pawn.'
    ]
  },
  {
    id: 'branch-e4-kick',
    name: '↳ What if …e4? (Kicking Nf3)',
    freq: 'Branch from mainlines, move 6-9',
    section: 'What If? Branches',
    description: 'Black pushes …e4 to kick your knight from f3. This is tempting but overextends — the e4 pawn becomes a target.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offers trade.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat.', bComment: 'Castle.' },
      { w: 'Bd3', b: 'Ne4', wComment: 'Aim at h7.', bComment: '⚠️ Black puts the knight on e4! Looks aggressive.' },
      { w: 'Nbd2', b: 'Nxd2', wComment: '⭐ Offer to trade! After Nxd2 the knight has wasted 3 moves (Nf6-e4xd2) and you develop with Qxd2.', bComment: 'Black takes.' },
      { w: 'Qxd2', b: 'Bxg3', wComment: 'Queen recaptures — centralized and active.', bComment: 'Black trades the dark bishops.' },
      { w: 'hxg3', b: 'Nd7', wComment: '⭐ Open h-file again! Black wasted time on the knight maneuver and you got the h-file for free.', bComment: 'Black develops.' },
      { w: 'c3', b: 'c5', wComment: 'Hold the center. You\'re better — the h-file is open and your pieces are more active.', bComment: 'Black tries counterplay.' }
    ],
    mistakes: [
      {
        move: '…Ne4 early',
        atMove: 'Move 5-7',
        desc: 'The knight on e4 looks strong but can be challenged immediately with Nbd2',
        punishment: 'After Nbd2, the knight has to trade or retreat. Either way Black has wasted tempi.',
        howToPunish: 'Nbd2! forces Nxd2 Qxd2 — your queen is active and Black spent 3 moves on a knight that\'s gone.'
      },
      {
        move: '…e5-e4 (pawn push)',
        atMove: 'Move 7-9',
        desc: 'If Black pushes the e-pawn to e4 instead, kicking Nf3',
        punishment: 'The pawn on e4 is overextended! Play Nd2 and target it. It becomes a weakness, not a strength.',
        howToPunish: 'After …e4: Nd2 → f3! undermines the pawn. After …exf3, Nxf3 or Qxf3 with open lines toward the king.'
      },
      {
        move: '…f5? supporting e4',
        atMove: 'After …e4',
        desc: 'Black plays …f5 to hold the e4 pawn',
        punishment: 'The e5 square becomes a permanent outpost. Plant a knight there — it can never be kicked.',
        howToPunish: 'After …f5: Nd2 → Ne5. The knight is untouchable on e5 and dominates the position.'
      }
    ],
    tactics: [
      'Nbd2 trading trick: Challenge the Ne4 immediately. After the trade, your queen is active for free.',
      'f3 undermining: If Black pushes …e4, play f3! to break the pawn and open lines.',
      'h-file bonus: The …Bxg3 hxg3 trade often happens as a side effect, giving you the h-file attack.'
    ]
  },
  {
    id: 'branch-englund',
    name: '↳ What if 1.d4 e5? (Englund Gambit)',
    freq: 'Rare but seen at club level',
    section: 'What If? Branches',
    description: 'Black plays 1…e5 directly without …d5 first. This is the Englund Gambit — accept the pawn and you\'re already winning.',
    moves: [
      { w: 'd4', b: 'e5', wComment: 'Standard.', bComment: '⚠️ Englund Gambit! Black sacrifices a pawn immediately. Accept it!' },
      { w: 'dxe5', b: 'Nc6', wComment: '⭐ Take the free pawn! Don\'t overthink it.', bComment: 'Black develops and pressures e5.' },
      { w: 'Bf4', b: 'Qe7', wComment: 'London bishop! Defends e5 and develops.', bComment: 'Black targets the e5 pawn.' },
      { w: 'Nf3', b: 'Qb4+', wComment: 'Develop naturally. Don\'t worry about the check coming.', bComment: 'Check! Black hopes you panic — but you shouldn\'t.' },
      { w: 'Bd2', b: 'Qxb2', wComment: '⭐ Block with the bishop. Let Black grab the b-pawn — you\'re developing with tempo.', bComment: 'Black grabs material but falls way behind in development.' },
      { w: 'Nc3', b: 'Bb4', wComment: '⭐ Develop the knight with tempo! Black\'s queen is in danger on b2.', bComment: 'Black tries to pin, but the queen is misplaced.' },
      { w: 'Rb1', b: 'Qa3', wComment: '⭐ Attack the queen! Rb1 develops the rook AND chases the queen.', bComment: 'Queen runs — it has been chased for 3 moves now.' },
      { w: 'Nd5', b: 'Bxd2+', wComment: '⭐ Knight to the dominant d5 outpost! Threatens Nxc7+ forking king and rook.', bComment: 'Black trades to avoid worse.' },
      { w: 'Qxd2', b: 'Kd8', wComment: 'Recapture. You have a massive lead in development and Black can\'t castle.', bComment: 'Black moves the king to dodge Nxc7+. They can NEVER castle now.' },
      { w: 'Nxc7', b: 'Rb8', wComment: '⭐ Fork wins the rook! You\'re up massive material with a dominant position.', bComment: 'Black saves the rook but the damage is done.' }
    ],
    mistakes: [
      {
        move: '1…e5 itself',
        atMove: 'Move 1',
        desc: 'The Englund Gambit is dubious — Black loses a pawn for nothing',
        punishment: 'Simply take dxe5. Black has no real compensation. Play Bf4 (London style) to defend e5 naturally.',
        howToPunish: 'dxe5 + Bf4 defending the pawn. Black can\'t win it back without making concessions.'
      },
      {
        move: '…Qb4+',
        atMove: 'Move 4',
        desc: 'The queen check looks scary but is actually bad',
        punishment: 'Bd2! blocks and develops. Now the queen is exposed and will be chased around.',
        howToPunish: 'Bd2 → Nc3 → Rb1 chases the queen for 3 moves while you develop everything.'
      },
      {
        move: '…Qxb2 (grabbing the b-pawn)',
        atMove: 'Move 5',
        desc: 'The queen goes pawn-grabbing and gets stuck',
        punishment: 'Nc3! develops with tempo. Rb1 next. The queen has wasted 4-5 moves grabbing one pawn while you developed your entire army.',
        howToPunish: 'Nc3 → Rb1 → Nd5. You\'re fully developed; Black has only moved their queen. It\'s crushing.'
      },
      {
        move: '…Kd8 (can\'t castle)',
        atMove: 'Move 9',
        desc: 'Black is forced to move the king and can never castle',
        punishment: 'A king stuck in the center is a long-term weakness. Open the center with e3-e4 and attack.',
        howToPunish: 'Nxc7 forks → then e3, e4, open the center. Black\'s king will be hunted down.'
      }
    ],
    tactics: [
      'Nd5 fork: The knight on d5 threatens Nxc7+ forking king and rook. Game-winning.',
      'Queen chase: Bd2 → Nc3 → Rb1 develops 3 pieces while chasing Black\'s queen. Massive tempo advantage.',
      'Nxc7 after Kd8: Once the king moves to d8, Nxc7 wins the exchange (rook for knight).'
    ]
  },
  {
    id: 'branch-bg4-pin',
    name: '↳ What if …Bg4? (Pinning Nf3)',
    freq: 'Very common — all levels',
    section: 'What If? Branches',
    description: 'Black pins your knight to the queen with …Bg4. This is one of the MOST common things you\'ll face. Here\'s exactly how to handle it.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'Nf3', b: 'Bg4', wComment: 'Develop the knight.', bComment: '⚠️ The pin! Black puts the bishop on g4 pinning your Nf3 to your queen.' },
      { w: 'e3', b: 'e6', wComment: 'Build the chain calmly.', bComment: 'Solid.' },
      { w: 'Be2', b: 'Bd6', wComment: '⭐ Be2! This is the clean solution — unpin by developing. Now the knight is free again.', bComment: 'Black develops.' },
      { w: 'Bg3', b: 'Bxf3', wComment: 'Retreat the bishop.', bComment: 'Black decides to take — trading bishop for knight.' },
      { w: 'Bxf3', b: 'O-O', wComment: '⭐ Recapture with the bishop! You now have the bishop pair — a long-term advantage.', bComment: 'Black castles.' },
      { w: 'Nd2', b: 'c5', wComment: 'Knight to d2 heading for e5 or c4.', bComment: 'Standard counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold the center.', bComment: 'Develop.' },
      { w: 'O-O', b: 'Qe7', wComment: '⭐ You\'re better: bishop pair + solid center + flexible pieces.', bComment: 'Black connects.' }
    ],
    mistakes: [
      {
        move: '…Bg4 itself',
        atMove: 'Move 4',
        desc: 'The pin looks annoying but Be2 unpins effortlessly',
        punishment: 'After Be2, the pin is broken. If Black trades Bxf3 Bxf3, you have the bishop pair advantage.',
        howToPunish: 'Be2 → if Bxf3 Bxf3, you have 2 bishops vs bishop+knight. In open positions, this is a big edge.'
      },
      {
        move: '…Bxf3 (trading bishop for knight)',
        atMove: 'Move 6',
        desc: 'Giving up the bishop pair for no reason',
        punishment: 'Bxf3 gives you the bishop pair. In the London, having two bishops with an open position is very powerful.',
        howToPunish: 'After Bxf3: two bishops + play for e4 to open the position = bishops dominate.'
      },
      {
        move: '…Bh5 (keeping the pin)',
        atMove: 'Move 5-6',
        desc: 'Black retreats Bg4-h5 but the bishop is passive on h5',
        punishment: 'The Bh5 is out of play. You continue normally and Black has a bad bishop.',
        howToPunish: 'After …Bh5: just castle and play g4! later to chase it. The bishop is trapped on the rim.'
      },
      {
        move: '…Bg4 then …h5?! (preventing g4)',
        atMove: 'Move 5-7',
        desc: 'Black weakens the kingside to keep the bishop active',
        punishment: 'The h5 pawn is a target and the king side is full of holes. g3 + Bg2 can target the weakness.',
        howToPunish: 'After …h5: play normally. The h5 pawn weakens g5 and g6 — exploit these later.'
      }
    ],
    tactics: [
      'Be2 unpinning: The simplest and best solution. Develops a piece AND breaks the pin.',
      'Bishop pair advantage: After Bxf3 Bxf3, aim to open the position so your two bishops dominate.',
      'h3 alternative: You can also play h3 Bh5, g4 Bg6, Ne5 — more aggressive but riskier.'
    ]
  },
  {
    id: 'branch-qb6',
    name: '↳ What if …Qb6? (Hitting b2)',
    freq: 'Common trick at club level',
    section: 'What If? Branches',
    description: 'Black plays …Qb6 targeting the b2 pawn (and sometimes d4). Many London players panic — but the answer is simple.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'c5', wComment: 'Chain.', bComment: 'Black strikes the center early.' },
      { w: 'Nf3', b: 'Qb6', wComment: 'Develop.', bComment: '⚠️ …Qb6! Attacks b2. Looks scary but you have a great answer.' },
      { w: 'Qc1', b: 'e6', wComment: '⭐ Qc1! Defend b2 AND keep the queen connected to Bf4. The queen is fine here — it supports the bishop.', bComment: 'Black solidifies.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4 firmly.', bComment: 'Black develops.' },
      { w: 'Bd3', b: 'Bd6', wComment: 'Aim at h7 — standard.', bComment: 'Offers trade.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat as always.', bComment: 'Castles.' },
      { w: 'Nbd2', b: 'Re8', wComment: 'Knight heading for e5.', bComment: 'Black prepares …e5.' },
      { w: 'O-O', b: 'Qc7', wComment: '⭐ You\'re fully developed with a great position. Black wasted time with the queen and it has to retreat!', bComment: 'Queen goes back — it achieved nothing.' }
    ],
    mistakes: [
      {
        move: '…Qb6 itself',
        atMove: 'Move 4',
        desc: 'Moving the queen early violates opening principles',
        punishment: 'Qc1! solves everything. The queen will have to retreat later, wasting Black\'s tempo.',
        howToPunish: 'Qc1 → develop normally. Black\'s queen will be forced back to c7 or d8, losing 2 tempi.'
      },
      {
        move: '…Qxb2?? (grabbing the pawn)',
        atMove: 'If you DON\'T play Qc1',
        desc: 'If you forgot to defend, Black takes b2',
        punishment: 'This is why Qc1 matters! But even if they grab b2, the queen gets trapped after Nbd2 → Rb1.',
        howToPunish: 'After Qxb2: Nbd2 → Rb1 traps the queen! This is a known trap in the London.'
      },
      {
        move: '…Qb6 then …c5 then …Qb4+?!',
        atMove: 'Move 5-7',
        desc: 'Black checks with the queen',
        punishment: 'Nc3! blocks and develops with tempo. The queen will be chased again.',
        howToPunish: 'After …Qb4+: Nc3 (or c3) blocks. The queen wasted another move.'
      }
    ],
    tactics: [
      'Qc1! key move: Defends b2 and supports Bf4. Simple and effective.',
      'Qxb2 trap: If Black grabs b2, Nbd2 → Rb1 can trap the queen.',
      'Tempo advantage: After the queen retreats, you\'re ahead in development.'
    ]
  },
  {
    id: 'branch-f6-kicks-ne5',
    name: '↳ What if …f6 kicks Ne5?',
    freq: 'Common in many lines',
    section: 'What If? Branches',
    description: 'You\'ve planted your dream knight on e5 — and Black plays …f6 to kick it. What do you do? Trade on c6 to RUIN their pawns.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offers trade.' },
      { w: 'Bg3', b: 'O-O', wComment: 'Retreat.', bComment: 'Castle.' },
      { w: 'Bd3', b: 'c5', wComment: 'Aim at h7.', bComment: 'Counterplay.' },
      { w: 'c3', b: 'Nc6', wComment: 'Hold d4.', bComment: 'Develop.' },
      { w: 'Nbd2', b: 'Nd7', wComment: 'Knight heading for e5.', bComment: 'Challenging e5 square.' },
      { w: 'Ne5', b: 'f6', wComment: '⭐ The dream outpost!', bComment: '⚠️ Black kicks your knight with …f6!' },
      { w: 'Nxc6', b: 'bxc6', wComment: '⭐ Trade on c6! Black is forced to recapture with the b-pawn → DOUBLED c-pawns and a weak e6 pawn!', bComment: 'Forced recapture. Black\'s structure is ruined.' }
    ],
    mistakes: [
      {
        move: '…f6 kicking Ne5',
        atMove: 'Move 9',
        desc: 'Kicking the knight but destroying their own structure',
        punishment: 'Nxc6! bxc6 gives Black doubled c-pawns, a weak isolated a-pawn, and the e6 pawn is now backward.',
        howToPunish: 'Nxc6 bxc6 → target c6 and e6. Play Qe2 → Rae1 eyeing e6. The weak pawns are permanent.'
      },
      {
        move: '…f6 weakening e6',
        atMove: 'Move 9',
        desc: 'The f6 push also weakens the e6 pawn',
        punishment: 'After Nxc6 bxc6, the e6 pawn is backward on an open file. Plant a rook on e1 to target it forever.',
        howToPunish: 'Qe2 → Rae1 → pressure e6. Black can\'t defend everything.'
      },
      {
        move: '…f5 instead of …f6',
        atMove: 'Move 9',
        desc: 'Black plays …f5 instead to lock the knight out',
        punishment: 'The knight stays on e5! And now e6 is weak on the other side. Play f3 → e4 when ready.',
        howToPunish: 'After …f5: Ne5 stays forever since …f6 can\'t happen. Play f3 preparing e4 break.'
      }
    ],
    tactics: [
      'Nxc6 bxc6 structure damage: Doubled c-pawns + weak e6 = permanent targets.',
      'Qe2 + Rae1: Battery on the e-file targeting the backward e6 pawn.',
      'a4 attacking the a-pawn: After …bxc6, Black\'s a-pawn is isolated. Push a4-a5 to create another target.'
    ]
  },
  {
    id: 'branch-g5-chase',
    name: '↳ What if …g5?! (Chasing Bf4)',
    freq: 'Rare but must know',
    section: 'What If? Branches',
    description: 'Black plays the aggressive …g5 to chase your bishop off f4. This is a huge weakening of their kingside — punish it!',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'g5', wComment: 'Develop.', bComment: '⚠️ Crazy! Black pushes …g5 to chase the bishop. This massively weakens the kingside.' },
      { w: 'Bg3', b: 'g4', wComment: '⭐ Just retreat! Let Black overextend. Their kingside is Swiss cheese.', bComment: 'Black chases more — but the pawns can\'t come back!' },
      { w: 'Ne5', b: 'h5', wComment: '⭐ Plant the knight on the eternal e5 outpost. The g4 and g5 pawns left huge holes.', bComment: 'Black keeps pushing, creating more weaknesses.' },
      { w: 'Bd3', b: 'Bd6', wComment: 'Aim at the weakened kingside. The h7 square is now very vulnerable.', bComment: 'Black tries to develop.' },
      { w: 'c3', b: 'Nbd7', wComment: 'Hold the center.', bComment: 'Black develops.' },
      { w: 'Nxd7', b: 'Bxd7', wComment: 'Trade and keep it simple — your position is already much better.', bComment: 'Black recaptures.' },
      { w: 'Nd2', b: 'Bxg3', wComment: 'Develop.', bComment: 'Black trades bishops.' }
    ],
    mistakes: [
      {
        move: '…g5 itself',
        atMove: 'Move 4',
        desc: 'Massive kingside weakening! The dark squares f6, g5, h6 are all soft',
        punishment: 'Bg3 retreat and Ne5 outpost. The g5 and h-pawns are overextended and can never come back.',
        howToPunish: 'Bg3 → Ne5 → Bd3 aimed at the holes. Black can never castle safely now.'
      },
      {
        move: '…g4 (chasing further)',
        atMove: 'Move 5',
        desc: 'Pushing more pawns weakens more squares',
        punishment: 'Ne5 is now PERMANENT — no …f6 can kick it because the g4 pawn blocks the knight retreat.',
        howToPunish: 'Ne5 is untouchable. Bd3 + Qe2 aim at the kingside. Black\'s king is stuck in the center.'
      },
      {
        move: '…O-O?? (castling kingside)',
        atMove: 'Any point',
        desc: 'Castling into a completely destroyed kingside',
        punishment: 'Qh5! or Bxh7+! with immediate devastating attack. The missing pawns around the king are fatal.',
        howToPunish: 'After …O-O: Bxh7+! Kxh7, Qh5+ with a crushing attack on the naked king.'
      },
      {
        move: '…h5 (preventing g4)',
        atMove: 'Move 6',
        desc: 'More pawn pushes creating more holes',
        punishment: 'The g5 pawn is now undefended, f5 square is a hole, and the rook on h8 is locked in.',
        howToPunish: 'Qf3 or Qb3 attacking b7 and f7. Black\'s pieces are totally uncoordinated.'
      }
    ],
    tactics: [
      'Permanent Ne5: With g4 pushed, the knight can never be kicked from e5. Dream scenario!',
      'Bxh7+ sacrifice: If Black castles into the ruined kingside, the Greek Gift is devastating.',
      'Dark square domination: f6, g5, h6 are all weak. Your pieces dance on these squares.'
    ]
  },
  {
    id: 'branch-b6-fianchetto',
    name: '↳ What if …b6 Bb7? (Queenside fianchetto)',
    freq: 'Common — ~10% of games',
    section: 'What If? Branches',
    description: 'Black fianchettoes the queenside bishop with …b6 and …Bb7. This is a solid Queen\'s Indian-style approach. You keep your normal plan.',
    moves: [
      { w: 'd4', b: 'Nf6', wComment: 'Standard.', bComment: 'Knight first.' },
      { w: 'Bf4', b: 'e6', wComment: 'London bishop.', bComment: 'Flexible — could transpose.' },
      { w: 'e3', b: 'b6', wComment: 'Build the chain.', bComment: '⚠️ Queenside fianchetto! Black wants …Bb7 controlling the long diagonal.' },
      { w: 'Nf3', b: 'Bb7', wComment: 'Develop naturally.', bComment: 'Bishop developed on the long diagonal.' },
      { w: 'Bd3', b: 'd5', wComment: 'Aim at h7 as always. The Bb7 doesn\'t stop your kingside plan.', bComment: 'Black takes central space.' },
      { w: 'O-O', b: 'Be7', wComment: 'Castle.', bComment: 'Modest but solid development.' },
      { w: 'c3', b: 'O-O', wComment: 'Hold d4 and prepare Nbd2-e5.', bComment: 'Black castles.' },
      { w: 'Nbd2', b: 'Nbd7', wComment: 'Knight heading for e5 — same plan as always!', bComment: 'Black develops.' },
      { w: 'Ne5', b: 'c5', wComment: '⭐ The dream outpost! The Bb7 is blocked by its own d5 pawn — a "tall pawn."', bComment: 'Black tries counterplay.' },
      { w: 'f3', b: 'Ne4', wComment: '⭐ Solidify the center and support the Ne5. The Bb7 is completely useless behind the d5 pawn.', bComment: 'Black tries to activate but you\'re already dominant.' }
    ],
    mistakes: [
      {
        move: '…b6 …Bb7 with …d5',
        atMove: 'Move 3-5',
        desc: 'The Bb7 gets blocked by its own d5 pawn',
        punishment: 'The Bb7 is a "tall pawn" — blocked by d5 and doing nothing. Meanwhile your Bd3 is aimed at the king.',
        howToPunish: 'Play normally! Ne5 + f4. The Bb7 is irrelevant while your pieces attack the king.'
      },
      {
        move: '…c5 (late)',
        atMove: 'Move 9-10',
        desc: 'Black tries …c5 but you already have Ne5 established',
        punishment: 'The knight on e5 is untouchable. If cxd4, exd4 and your IQP is strong with all pieces active.',
        howToPunish: 'After …c5: just keep the tension or play dxc5 bxc5 and target the isolated c5 pawn.'
      },
      {
        move: '…Nd7 challenging Ne5',
        atMove: 'Move 8-9',
        desc: 'Black challenges with …Nd7',
        punishment: 'If Nxe5 dxe5?? Bxe5 wins a pawn! Or if Nxe5 Bxe5, you keep active pieces.',
        howToPunish: 'After …Nd7: Nxd7 Qxd7 and you still have a great position with f4 coming.'
      }
    ],
    tactics: [
      'Bb7 = "tall pawn": With d5 blocking the diagonal, Black\'s bishop is useless. Exploit this.',
      'Standard Ne5 + f4: Your normal London plan works perfectly. The fianchetto doesn\'t change anything.',
      'f4-f5 break: Once f4 is in, f5 targeting e6 is devastating. The Bb7 can\'t help at all.'
    ]
  },
  {
    id: 'branch-h6-weaken',
    name: '↳ What if …h6? (Weakening kingside)',
    freq: 'Common careless move',
    section: 'What If? Branches',
    description: 'Black plays …h6 \'to prevent Bg5\' (which you weren\'t even planning). This creates a hook for your g4-g5 pawn storm.',
    moves: [
      { w: 'd4', b: 'd5', wComment: 'Standard.', bComment: 'Standard.' },
      { w: 'Bf4', b: 'Nf6', wComment: 'London bishop.', bComment: 'Normal.' },
      { w: 'e3', b: 'e6', wComment: 'Chain.', bComment: 'Solid.' },
      { w: 'Nf3', b: 'Bd6', wComment: 'Develop.', bComment: 'Offers trade.' },
      { w: 'Bg3', b: 'h6', wComment: 'Retreat.', bComment: '⚠️ …h6 looks innocent but creates a "hook" — a target for g4-g5.' },
      { w: 'Bd3', b: 'O-O', wComment: 'Aim at h7. Now the h6 pawn is a weakness you can exploit!', bComment: 'Black castles.' },
      { w: 'c3', b: 'c5', wComment: 'Hold the center.', bComment: 'Standard.' },
      { w: 'Nbd2', b: 'Nc6', wComment: 'Knight to d2, heading for e5.', bComment: 'Develop.' },
      { w: 'Ne5', b: 'Nd7', wComment: '⭐ Outpost!', bComment: 'Challenging.' },
      { w: 'f4', b: 'f5', wComment: '⭐ Lock down and prepare g4! The h6 pawn is now a hook for your g4-g5 storm.', bComment: 'Black tries to block but the damage is done.' }
    ],
    mistakes: [
      {
        move: '…h6 itself',
        atMove: 'Move 5',
        desc: 'Creates a "pawn hook" that gives your g4-g5 push a target',
        punishment: 'After g4-g5, hxg5 opens the h-file AND the g-file. Your rooks flood in.',
        howToPunish: 'After f4: g4! → g5 → hxg5 → Qh5 or fxg5 with rooks pouring down the open files.'
      },
      {
        move: '…O-O after …h6',
        atMove: 'Move 6',
        desc: 'Castling into the weakened kingside',
        punishment: 'The h6 pawn is a permanent hook. Your g4-g5 plan is now far more effective than normal.',
        howToPunish: 'Ne5 → f4 → g4 → g5. After …hxg5 fxg5, the h-file and g-file are both open. Devastating.'
      },
      {
        move: '…g6? (after …h6)',
        atMove: 'After …h6',
        desc: 'Playing …g6 AND …h6 — both kingside pawns have moved',
        punishment: 'The dark squares f6, g5, h6 are all fatally weak. Your pieces pour in.',
        howToPunish: 'After …g6 and …h6: Qf3 → Qf6 or Bh4-g5 aims at the gaping dark-square holes.'
      }
    ],
    tactics: [
      'g4-g5 pawn storm: The h6 pawn is a "hook" — g5 hxg5 opens BOTH the g and h files.',
      'f4 + g4 + g5 sequence: Lock the kingside with f4, then launch g4-g5. The h6 hook makes this lethal.',
      'Qh5 after files open: Once g5 hxg5, swing the queen to h5 for mating threats.'
    ]
  }
];
