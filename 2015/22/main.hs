import Data.List
data Spell = Spell {
  manaCost :: Int,
  damage :: Int,
  duration :: Int,
  heal :: Int,
  mana :: Int,
  armor :: Int
} deriving (Show)

magicMissile = Spell {
  manaCost = 53,
  damage = 4,
  duration = 0,
  heal = 0,
  mana = 0,
  armor = 0
}

drain = Spell {
  manaCost = 73,
  damage = 2,
  duration = 0,
  heal = 2,
  mana = 0,
  armor = 0
}

shield = Spell {
  manaCost = 113,
  damage = 0,
  duration = 6,
  heal = 0,
  mana = 0,
  armor = 7
}

poison = Spell {
  manaCost = 173,
  damage = 3,
  duration = 6,
  heal = 0,
  mana = 0,
  armor = 0
}

recharge = Spell {
  manaCost = 229,
  damage = 0,
  duration = 5,
  heal = 0,
  mana = 101,
  armor = 0
}

bossDamage = 10

spells = [magicMissile, drain, shield, poison ]


handleSpell :: Spell -> [Spell] -> Int -> Int -> Int -> Int
handleSpell spell currentSpells bossHp manaUsed currentMana =
  let newSpells = currentSpells ++ [spell]
      computedArmor = sum (map armor newSpells)
      computedDamage = sum (map damage newSpells)
      newBossHp = bossHp - computedDamage
      newManaUsed = manaUsed + (manaCost spell)
      newCurrentMana = currentMana + sum (map mana newSpells)
      keptSpells = filter (\x -> (duration x) >= 0) (map (\spell -> spell { duration = (pred . duration $ spell) }) newSpells)

  in if (newBossHp <= 0) then newManaUsed
  else 
    doFight newBossHp (bossDamage - computedArmor) keptSpells newCurrentMana newManaUsed

doFight :: Int -> Int -> [Spell] -> Int -> Int -> Int
doFight bossHp hp currentSpells currentMana manaUsed =
  let possibleSpells = filter (\x -> manaCost x <= currentMana) spells
      usedMana = map (\spell -> handleSpell spell currentSpells bossHp manaUsed currentMana) possibleSpells

  in minimum usedMana

main = do
  putStrLn $ show $ doFight 71 50 [] 500 0
