import {AlchemyIngredient} from "../model/AlchemyIngredient.js";
import {Properties} from "./AlchemyPropertiesStatic.js";
import {Items} from "./ItemsStatic.js";

export const IngredientTypes = {
  Herb: 1,
  Mushroom: 2,
  Mineral: 3,
  Other: 4,
  MineralCalcination: 5,
  HerbalGrind: 6,
  LyeAblution: 7,
  FieryCombustion: 8,
  MeasuredDistillate: 9,
}

export const AlchemyIngredients = {
  Unfiltered: [
    new AlchemyIngredient(
      Items.Alabaster,
      IngredientTypes.Mineral,
      [Properties.SwampFever, Properties.Marksmanship, Properties.Asphyxiation, Properties.Smithing],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Apatite,
      IngredientTypes.Mineral,
      [Properties.Quilld, Properties.CruelIncision, Properties.Strength, Properties.Tuskalooza],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Arkose,
      IngredientTypes.Mineral,
      [Properties.Charisma, Properties.Agility, Properties.DecreasedDuration, Properties.BlackEyed],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Basalt,
      IngredientTypes.Mineral,
      [Properties.Nidburns, Properties.UnarmedCombat, Properties.Marksmanship, Properties.BladeKiss],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.MaddeningRash }
    ),
    new AlchemyIngredient(
      Items.BatRock,
      IngredientTypes.Mineral,
      [Properties.Agility, Properties.Marksmanship, Properties.Stealth, Properties.Dexterity],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.BayBolete,
      IngredientTypes.Mushroom,
      [Properties.Exploration, Properties.CrabCaressed, Properties.Marksmanship, Properties.SwampFever],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BlackCoal,
      IngredientTypes.Mineral,
      [Properties.BluntTrauma, Properties.Lore, Properties.Psyche, Properties.WretchedGore],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BlackOre,
      IngredientTypes.Mineral,
      [Properties.Farming, Properties.Tuskalooza, Properties.UnarmedCombat, Properties.NastyWart],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BlackTruffles,
      IngredientTypes.Mushroom,
      [Properties.Beesting, Properties.Intelligence, Properties.IncreasedDuration, Properties.Starvation],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BlackTrumpets,
      IngredientTypes.Mushroom,
      [Properties.Marksmanship, Properties.MidgeBite, Properties.BladeKiss, Properties.PunchSore],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BloatedBolete,
      IngredientTypes.Mushroom,
      [Properties.SwollenBump, Properties.DeepCut, Properties.Constitution, Properties.PipeWheeze],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.BlisteringHeadache }
    ),
    new AlchemyIngredient(
      Items.BlockTromboneChantrelle,
      IngredientTypes.Mushroom,
      [Properties.IncreasedDuration, Properties.ScrapesCuts, Properties.Starvation, Properties.HearthBurn],
      0,
      true,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.BloodStern,
      IngredientTypes.Herb,
      [Properties.Strength, Properties.Lore, Properties.Cooking, Properties.DecreasedDuration],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Bloodstone,
      IngredientTypes.Mineral,
      [Properties.Beesting, Properties.ScrapesCuts, Properties.Unfaced, Properties.DecreasedDuration],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Blueberries,
      IngredientTypes.Herb,
      [Properties.Perception, Properties.Bruise, Properties.Strength, Properties.HearthBurn],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Breccia,
      IngredientTypes.Mineral,
      [Properties.Perception, Properties.Agility, Properties.Lore, Properties.AchingJoints],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.BrownKelp,
      IngredientTypes.Herb,
      [Properties.Cooking, Properties.Dexterity, Properties.SwampFever, Properties.Unfaced],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.ButtonMushroom,
      IngredientTypes.Mushroom,
      [Properties.Charisma, Properties.SevereMauling, Properties.Constitution, Properties.Intelligence],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.SwollenBump }
    ),
    new AlchemyIngredient(
      Items.Camomile,
      IngredientTypes.Herb,
      [undefined, undefined, undefined, undefined],
      0b0000,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Candleberry,
      IngredientTypes.Herb,
      [Properties.Masonry, Properties.NicksKnacks, Properties.SandFleaBites, Properties.Constitution],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Cassiterite,
      IngredientTypes.Mineral,
      [Properties.Psyche, Properties.FellSlash, Properties.IncreasedDuration, Properties.Dexterity],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.CatGold,
      IngredientTypes.Mineral,
      [Properties.Beesting, Properties.PipeWheeze, Properties.Unfaced, Properties.SoreSnout],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.CattailFibres,
      IngredientTypes.Herb,
      [Properties.SealFinger, Properties.PipeWheeze, Properties.LeechBurns, Properties.Charisma],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.CattailHead,
      IngredientTypes.Herb,
      [Properties.Intelligence, Properties.IncreasedDuration, Properties.HearthBurn, Properties.CrabCaressed],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.CattailRoots,
      IngredientTypes.Herb,
      [Properties.MaddeningRash, Properties.SevereMauling, Properties.AllergicReaction, Properties.Psyche],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.CaveLantern,
      IngredientTypes.Mushroom,
      [Properties.Carpentry, Properties.Masonry, Properties.Constitution, Properties.Dexterity],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Cavebulb,
      IngredientTypes.Herb,
      [Properties.UnarmedCombat, Properties.NastyLaceration, Properties.Intelligence, Properties.Survival],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Chalcopyrite,
      IngredientTypes.Mineral,
      [Properties.RotGut, Properties.Concussion, Properties.Constitution, Properties.Psyche],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Chantrelles,
      IngredientTypes.Mushroom,
      [Properties.MeleeCombat, Properties.UnarmedCombat, Properties.Constitution, Properties.NettleBurn],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Chert,
      IngredientTypes.Mineral,
      [Properties.Stealth, Properties.NettleBurn, Properties.HearthBurn, Properties.MaddeningRash],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.ChimingBluebell,
      IngredientTypes.Herb,
      [Properties.PunchSore, Properties.Dexterity, Properties.Cooking, Properties.JellyfishSting],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Chives,
      IngredientTypes.Herb,
      [Properties.Agility, Properties.UnarmedCombat, Properties.Sewing, Properties.SoreSnout],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Cinnabar,
      IngredientTypes.Mineral,
      [Properties.DecreasedDuration, Properties.Bruise, Properties.Psyche, Properties.Nidburns],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Clover,
      IngredientTypes.Herb,
      [Properties.NettleBurn, Properties.NastyLaceration, Properties.Farming, Properties.AdderBite],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.CoadeStoneBrick,
      IngredientTypes.Mineral,
      [Properties.Beesting, Properties.Masonry, Properties.Intelligence, Properties.Stealth],
      0,
      true,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Coltsfoot,
      IngredientTypes.Herb,
      [Properties.Psyche, Properties.Agility, Properties.UnarmedCombat, Properties.SealFinger],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.CreminiMushroom,
      IngredientTypes.Mushroom,
      [Properties.RotGut, Properties.Perception, Properties.CoalersCough, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Dandelion,
      IngredientTypes.Herb,
      [Properties.Psyche, Properties.MaddeningRash, Properties.Will, Properties.Unfaced],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.DewyLadysMantle,
      IngredientTypes.Herb,
      [Properties.Unfaced, Properties.UnarmedCombat, Properties.Lore, Properties.Carpentry],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Diabase,
      IngredientTypes.Mineral,
      [Properties.SealFinger, Properties.Cooking, Properties.AllergicReaction, Properties.AntcidBurns],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Dill,
      IngredientTypes.Herb,
      [Properties.DecreasedDuration, Properties.SealFinger, Properties.BladeKiss, Properties.Lore],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Diorite,
      IngredientTypes.Mineral,
      [Properties.Asphyxiation, Properties.Exploration, Properties.Carpentry, Properties.SandFleaBites],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Direvein,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.DecreasedDuration, Properties.Exploration, Properties.Tuskalooza],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Dolomite,
      IngredientTypes.Mineral,
      [Properties.SealFinger, Properties.Cooking, Properties.Carpentry, Properties.Lore],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.SwollenBump }
    ),
    new AlchemyIngredient(
      Items.DoveDroppings,
      IngredientTypes.Other,
      [Properties.Charisma, Properties.Starvation, Properties.SwollenBump, Properties.Carpentry],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.DriedMorels,
      IngredientTypes.Mushroom,
      [Properties.UnarmedCombat, Properties.BladeKiss, Properties.Psyche, Properties.Agility],
      0,
      true,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Dross,
      IngredientTypes.Mineral,
      [Properties.Masonry, Properties.Asphyxiation, Properties.SwampFever, Properties.MidgeBite],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.DuskFern,
      IngredientTypes.Herb,
      [Properties.Masonry, Properties.PipeWheeze, Properties.HearthBurn, Properties.NastyLaceration],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Eclogite,
      IngredientTypes.Mineral,
      [Properties.Masonry, Properties.IncreasedDuration, Properties.Intelligence, Properties.Survival],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Edelweiss,
      IngredientTypes.Herb,
      [Properties.Nidburns, Properties.CoalersCough, Properties.Farming, Properties.Dexterity],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.FairyMushroom,
      IngredientTypes.Mushroom,
      [Properties.Intelligence, Properties.LeechBurns, Properties.Psyche, Properties.SealFinger],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Feldspar,
      IngredientTypes.Mineral,
      [Properties.Starvation, Properties.ChillsNausea, Properties.IncreasedDuration, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.FieldBlewits,
      IngredientTypes.Mushroom,
      [Properties.CruelIncision, Properties.MeleeCombat, Properties.Will, Properties.QuicksilverPoisoning],
      0b1111,
      false,
      { SimpleDistillateSolution: Properties.AchingJoints }
    ),
    new AlchemyIngredient(
      Items.Flint,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.PunchSore, Properties.Charisma, Properties.Will],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Fluorospar,
      IngredientTypes.Mineral,
      [Properties.Farming, Properties.Intelligence, Properties.BlackEyed, Properties.SomethingBroken],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.FourLeafClover,
      IngredientTypes.Herb,
      [Properties.SealFinger, Properties.UnarmedCombat, Properties.SomethingBroken, undefined],
      0b0000,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.FrogsCrown,
      IngredientTypes.Herb,
      [Properties.FellSlash, Properties.Survival, Properties.Marksmanship, Properties.BladeKiss],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Gabbro,
      IngredientTypes.Mineral,
      [Properties.DragonBite, Properties.Stealth, Properties.Perception, Properties.PunchSore],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Galena,
      IngredientTypes.Mineral,
      [Properties.BluntTrauma, Properties.Beesting, Properties.Lore, Properties.TickdOff],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.GhostApple,
      IngredientTypes.Herb,
      [Properties.IncreasedDuration, Properties.Stealth, Properties.QuicksilverPoisoning, Properties.Quilld],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.GiantPuffball,
      IngredientTypes.Mushroom,
      [Properties.Masonry, Properties.CoalersCough, Properties.DecreasedDuration, Properties.Will],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.NerveDamage }
    ),
    new AlchemyIngredient(
      Items.Glimmermoss,
      IngredientTypes.Herb,
      [Properties.Survival, Properties.Sewing, Properties.Concussion, Properties.CoalersCough],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Gneiss,
      IngredientTypes.Mineral,
      [Properties.Survival, Properties.ChillsNausea, Properties.AdderBite, Properties.PunchSore],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Granite,
      IngredientTypes.Mineral,
      [Properties.NicksKnacks, Properties.Lore, Properties.IncreasedDuration, Properties.Stealth],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Graywacke,
      IngredientTypes.Mineral,
      [Properties.SealFinger, Properties.ChillsNausea, Properties.SevereMauling, Properties.NastyWart],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.GreenKelp,
      IngredientTypes.Herb,
      [Properties.CrabCaressed, Properties.Strength, Properties.Marksmanship, Properties.BladeKiss],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Greenschist,
      IngredientTypes.Mineral,
      [Properties.Agility, Properties.UnarmedCombat, Properties.MeleeCombat, Properties.Masonry],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Heartsease,
      IngredientTypes.Herb,
      [Properties.IncreasedDuration, Properties.SealFinger, Properties.Intelligence, Properties.Perception],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.HeavyEarth,
      IngredientTypes.Mineral,
      [Properties.Survival, Properties.BirdLung, Properties.Strength, Properties.ScrapesCuts],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.HornSilver,
      IngredientTypes.Mineral,
      [Properties.Psyche, Properties.NastyWart, Properties.CoalersCough, Properties.Stealth],
      0b1111,
      false,
      { SimpleDistillateSolution: Properties.BlisteringHeadache }
    ),
    new AlchemyIngredient(
      Items.Hornblende,
      IngredientTypes.Mineral,
      [Properties.BirdLung, Properties.BlisteringHeadache, Properties.Marksmanship, Properties.NerveDamage],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.ChillsNausea }
    ),
    new AlchemyIngredient(
      Items.IndigoCap,
      IngredientTypes.Mushroom,
      [undefined, undefined, undefined, undefined],
      0b0000,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.IronOchre,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.ScrapesCuts, Properties.IncreasedDuration, Properties.Masonry],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Jasper,
      IngredientTypes.Mineral,
      [Properties.Stealth, Properties.Intelligence, Properties.HearthBurn, Properties.CrabCaressed],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Korund,
      IngredientTypes.Mineral,
      [Properties.Constitution, Properties.SandFleaBites, Properties.NastyLaceration, Properties.SevereMauling],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.AllergicReaction }
    ),
    new AlchemyIngredient(
      Items.Kvann,
      IngredientTypes.Herb,
      [Properties.SevereMauling, Properties.Will, Properties.DeepCut, Properties.HearthBurn],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Kyanite,
      IngredientTypes.Mineral,
      [Properties.Constitution, Properties.BumBurn, Properties.Farming, Properties.DecreasedDuration],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.LadysMantle,
      IngredientTypes.Herb,
      [Properties.SwollenBump, Properties.Constitution, Properties.Bruise, Properties.Smithing],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.LampStalk,
      IngredientTypes.Herb,
      [Properties.Dexterity, Properties.Bruise, Properties.Lore, Properties.Charisma],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.LavaRock,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.Perception, Properties.BladeKiss, Properties.DecreasedDuration],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.LeadGlance,
      IngredientTypes.Mineral,
      [Properties.Sewing, Properties.NerveDamage, Properties.Smithing, Properties.AntcidBurns],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.LeafOre,
      IngredientTypes.Mineral,
      [Properties.NastyLaceration, Properties.SevereMauling, Properties.SwollenBump, Properties.LeechBurns],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.LibertyCaps,
      IngredientTypes.Mushroom,
      [Properties.PunchSore, Properties.MeleeCombat, Properties.BirdLung, Properties.ScrapesCuts],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Limestone,
      IngredientTypes.Mineral,
      [Properties.RotGut, Properties.NicksKnacks, Properties.NettleBurn, Properties.DecreasedDuration],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Lingonberries,
      IngredientTypes.Herb,
      [Properties.IncreasedDuration, Properties.Tuskalooza, Properties.Constitution, Properties.ScrapesCuts],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Lupine,
      IngredientTypes.Herb,
      [Properties.Asphyxiation, Properties.Agility, Properties.Bruise, Properties.NerveDamage],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Malachite,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.UnarmedCombat, Properties.QuicksilverPoisoning, Properties.Exploration],
      0b1111,
      false,
      { SimpleDistillateSolution: Properties.AllergicReaction }
    ),
    new AlchemyIngredient(
      Items.MandrakeRoot,
      IngredientTypes.Herb,
      [Properties.SwollenBump, Properties.UnarmedCombat, Properties.Lore, Properties.AdderBite],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Marble,
      IngredientTypes.Mineral,
      [Properties.Smithing, Properties.Starvation, Properties.Intelligence, Properties.NastyWart],
      0b1111,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.MarshMallow,
      IngredientTypes.Herb,
      [Properties.Will, Properties.LeechBurns, Properties.DecreasedDuration, Properties.Asphyxiation],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Mica,
      IngredientTypes.Mineral,
      [Properties.Cooking, Properties.LeechBurns, Properties.Perception, Properties.BlackEyed],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Microlite,
      IngredientTypes.Mineral,
      [Properties.Charisma, Properties.Perception, Properties.MaddeningRash, Properties.CrabCaressed],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Mistletoe,
      IngredientTypes.Herb,
      [Properties.SwampFever, Properties.BirdLung, Properties.Smithing, Properties.SevereMauling],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Morels,
      IngredientTypes.Herb,
      [Properties.Smithing, Properties.Starvation, Properties.SwampFever, Properties.NoseBleed],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Obsidian,
      IngredientTypes.Mineral,
      [Properties.Intelligence, Properties.Charisma, Properties.Sewing, Properties.Nidburns],
      0b0000,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Olivine,
      IngredientTypes.Mineral,
      [Properties.Will, Properties.BirdLung, Properties.IncreasedDuration, Properties.Psyche],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Orthoclase,
      IngredientTypes.Mineral,
      [Properties.UnarmedCombat, Properties.MidgeBite, Properties.CrabCaressed, Properties.DeepCut],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.OysterMushroom,
      IngredientTypes.Mushroom,
      [Properties.TickdOff, Properties.Intelligence, Properties.Charisma, Properties.NoseBleed],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.ParasolMushroom,
      IngredientTypes.Mushroom,
      [Properties.Masonry, Properties.NastyLaceration, Properties.ChillsNausea, Properties.SandFleaBites],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.AllergicReaction }
    ),
    new AlchemyIngredient(
      Items.ParboiledMorels,
      IngredientTypes.Mushroom,
      [Properties.IncreasedDuration, Properties.Exploration, Properties.Lore, Properties.SwampFever],
      0,
      true,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.PeacockOre,
      IngredientTypes.Mineral,
      [Properties.WretchedGore, Properties.Cooking, Properties.UnarmedCombat, Properties.BluntTrauma],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Pegmatite,
      IngredientTypes.Mineral,
      [Properties.Tuskalooza, Properties.BlackEyed, Properties.SoreSnout, Properties.Survival],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.PerfectAutumnLeaf,
      IngredientTypes.Herb,
      [Properties.MeleeCombat, Properties.CoalersCough, Properties.Lore, Properties.Farming],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Porphyry,
      IngredientTypes.Mineral,
      [Properties.JellyfishSting, Properties.Perception, Properties.UnarmedCombat, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.PortobelloMushroom,
      IngredientTypes.Mushroom,
      [Properties.IncreasedDuration, Properties.Dexterity, Properties.NettleBurn, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Pumice,
      IngredientTypes.Mineral,
      [Properties.NettleBurn, Properties.RotGut, Properties.MeleeCombat, Properties.NastyWart],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Quarryartz,
      IngredientTypes.Mineral,
      [Properties.Dexterity, Properties.MaddeningRash, Properties.Psyche, Properties.BumBurn],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Quartz,
      IngredientTypes.Mineral,
      [Properties.Survival, Properties.HearthBurn, Properties.Masonry, Properties.Constitution],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Reeds,
      IngredientTypes.Herb,
      [Properties.TickdOff, Properties.AdderBite, Properties.UnarmedCombat, Properties.Concussion],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Rhyolite,
      IngredientTypes.Mineral,
      [Properties.Psyche, Properties.ScrapesCuts, Properties.Perception, Properties.Marksmanship],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.RockCrystal,
      IngredientTypes.Mineral,
      [undefined, undefined, undefined, undefined],
      0b0000,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.RockSalt,
      IngredientTypes.Mineral,
      [Properties.Farming, Properties.Lore, Properties.WretchedGore, Properties.Nidburns],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.RoyalToadstool,
      IngredientTypes.Herb,
      [Properties.NoseBleed, Properties.Exploration, Properties.BluntTrauma, Properties.NastyLaceration],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.RubyBolete,
      IngredientTypes.Mushroom,
      [Properties.HearthBurn, Properties.DecreasedDuration, Properties.AllergicReaction, Properties.SwampFever],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Rustroot,
      IngredientTypes.Herb,
      [Properties.Lore, Properties.Masonry, Properties.Survival, Properties.JellyfishSting],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Sage,
      IngredientTypes.Herb,
      [Properties.AdderBite, Properties.SandFleaBites, Properties.Will, Properties.Exploration],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Sandstone,
      IngredientTypes.Mineral,
      [Properties.DragonBite, Properties.AdderBite, Properties.Smithing, Properties.Strength],
      0b1100,
      false,
      { SimpleDistillateSolution: Properties.NerveDamage }
    ),
    new AlchemyIngredient(
      Items.Schist,
      IngredientTypes.Mineral,
      [Properties.BlisteringHeadache, Properties.Masonry, Properties.AllergicReaction, Properties.Sewing],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Schrifterz,
      IngredientTypes.Mineral,
      [Properties.Agility, Properties.DragonBite, Properties.Sewing, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Seasponge,
      IngredientTypes.Other,
      [Properties.DecreasedDuration, Properties.Survival, Properties.Perception, Properties.Carpentry],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Serpentine,
      IngredientTypes.Mineral,
      [Properties.Dexterity, Properties.Agility, Properties.Carpentry, Properties.SoreSnout],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.ShardofConch,
      IngredientTypes.Mineral,
      [Properties.QuicksilverPoisoning, undefined, undefined, undefined],
      0b0000,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Silvershine,
      IngredientTypes.Mineral,
      [Properties.QuicksilverPoisoning, Properties.Smithing, Properties.Cooking, Properties.Charisma],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Slag,
      IngredientTypes.Mineral,
      [Properties.Marksmanship, Properties.Psyche, Properties.Will, Properties.JellyfishSting],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Slate,
      IngredientTypes.Mineral,
      [Properties.Agility, Properties.Marksmanship, Properties.Bruise, Properties.SomethingBroken],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Sleighbell,
      IngredientTypes.Herb,
      [Properties.SwollenBump, Properties.Smithing, Properties.NettleBurn, Properties.DragonBite],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Snowtop,
      IngredientTypes.Mushroom,
      [Properties.Carpentry, Properties.Exploration, Properties.Beesting, Properties.Tuskalooza],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Soapstone,
      IngredientTypes.Mineral,
      [Properties.BirdLung, Properties.Strength, Properties.Constitution, Properties.DecreasedDuration],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Sodalite,
      IngredientTypes.Mineral,
      [Properties.Exploration, Properties.Intelligence, Properties.Carpentry, Properties.CruelIncision],
      0b1111,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.SpindlyTaproot,
      IngredientTypes.Herb,
      [Properties.Starvation, Properties.Agility, Properties.UnarmedCombat, Properties.Constitution],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Stalagoom,
      IngredientTypes.Herb,
      [Properties.NerveDamage, Properties.DeepCut, Properties.Smithing, Properties.NastyLaceration],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.StandingGrass,
      IngredientTypes.Herb,
      [Properties.SwampFever, Properties.Stealth, Properties.Constitution, Properties.IncreasedDuration],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.StingingNettle,
      IngredientTypes.Herb,
      [Properties.Intelligence, Properties.AntcidBurns, Properties.NoseBleed, Properties.MeleeCombat],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Strawberry,
      IngredientTypes.Herb,
      [Properties.DecreasedDuration, Properties.IncreasedDuration, Properties.Agility, Properties.Beesting],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Sunstone,
      IngredientTypes.Mineral,
      [Properties.MeleeCombat, Properties.Smithing, Properties.NoseBleed, Properties.Charisma],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.TangledBramble,
      IngredientTypes.Herb,
      [Properties.Carpentry, Properties.Perception, Properties.DecreasedDuration, Properties.Cooking],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Tansy,
      IngredientTypes.Herb,
      [Properties.Constitution, Properties.Carpentry, Properties.SwampFever, Properties.DragonBite],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.ThornyThistle,
      IngredientTypes.Herb,
      [Properties.WretchedGore, Properties.Psyche, Properties.SomethingBroken, Properties.BlisteringHeadache],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Thyme,
      IngredientTypes.Herb,
      [Properties.Asphyxiation, Properties.Unfaced, Properties.BirdLung, Properties.Agility],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Toadflax,
      IngredientTypes.Herb,
      [Properties.FellSlash, Properties.Smithing, Properties.MeleeCombat, Properties.IncreasedDuration],
      0b1111,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.TrollMushrooms,
      IngredientTypes.Mushroom,
      [Properties.PipeWheeze, Properties.Survival, Properties.SwollenBump, Properties.Agility],
      0,
      true,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.UncommonSnapdragon,
      IngredientTypes.Herb,
      [Properties.Psyche, Properties.Constitution, Properties.Tuskalooza, Properties.Carpentry],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.WashedupBladderwrack,
      IngredientTypes.Herb,
      [Properties.Exploration, Properties.Constitution, Properties.Stealth, Properties.Unfaced],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Waybroad,
      IngredientTypes.Herb,
      [Properties.ChillsNausea, Properties.NastyWart, Properties.IncreasedDuration, Properties.Quilld],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.WhiteTruffles,
      IngredientTypes.Mushroom,
      [undefined, undefined, undefined, undefined],
      0b0000,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.WildWindsownWeed,
      IngredientTypes.Herb,
      [Properties.Psyche, Properties.BumBurn, Properties.ScrapesCuts, Properties.Masonry],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.WineGlance,
      IngredientTypes.Mineral,
      [Properties.AchingJoints, Properties.Exploration, Properties.Tuskalooza, Properties.NerveDamage],
      0b1100,
      false,
      { SimpleDistillateSolution: null }
    ),
    new AlchemyIngredient(
      Items.Wintergreen,
      IngredientTypes.Herb,
      [undefined, undefined, undefined, undefined],
      0b0000,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Yarrow,
      IngredientTypes.Herb,
      [Properties.MeleeCombat, Properties.WretchedGore, Properties.PunchSore, Properties.Beesting],
      0b1100,
      false,
      { }
    ),
    new AlchemyIngredient(
      Items.Yellowfeet,
      IngredientTypes.Mushroom,
      [Properties.NoseBleed, Properties.AllergicReaction, Properties.Exploration, Properties.DragonBite],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),
    new AlchemyIngredient(
      Items.Zincspar,
      IngredientTypes.Mineral,
      [Properties.IncreasedDuration, Properties.HearthBurn, Properties.Charisma, Properties.Farming],
      0b1100,
      false,
      { SimpleDistillateSolution: undefined }
    ),

    /// Mineral Calcinations
    new AlchemyIngredient(
      [Items.Malachite, Items.Greenschist],
      IngredientTypes.MineralCalcination,
      [null, Properties.QuicksilverPoisoning, Properties.Exploration, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.Malachite, Items.Slag],
      IngredientTypes.MineralCalcination,
      [null, Properties.QuicksilverPoisoning, undefined, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.Diorite, Items.Porphyry],
      IngredientTypes.MineralCalcination,
      [null, Properties.SandFleaBites, undefined, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.Olivine, Items.Basalt],
      IngredientTypes.MineralCalcination,
      [null, Properties.BladeKiss, undefined, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.Chalcopyrite, Items.Basalt],
      IngredientTypes.MineralCalcination,
      [null, Properties.BladeKiss, undefined, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.HeavyEarth, Items.LavaRock],
      IngredientTypes.MineralCalcination,
      [null, Properties.BladeKiss, undefined, undefined],
      0b1100
    ),
    new AlchemyIngredient(
      [Items.Olivine, Items.Pegmatite],
      IngredientTypes.MineralCalcination,
      [null, Properties.SoreSnout, Properties.Survival, undefined],
      0b1100
    ),

    /// Herbal Grinds
    new AlchemyIngredient(
      [Items.Tansy, Items.Dandelion],
      IngredientTypes.HerbalGrind,
      [Properties.Unfaced, Properties.Unfaced, Properties.Survival, undefined],
      0b1000
    ),
    new AlchemyIngredient(
      [Items.Clover, Items.CaveLantern],
      IngredientTypes.HerbalGrind,
      [Properties.NastyLaceration, undefined, undefined, undefined],
      0b1000
    ),
  ],
  Filtered: {}
};

function CreateFilteredSets() {
  AlchemyIngredients.Filtered.Herbs = AlchemyIngredients.Unfiltered.filter((n) => n.type === IngredientTypes.Herb);
  AlchemyIngredients.Filtered.Minerals = AlchemyIngredients.Unfiltered.filter((n) => n.type === IngredientTypes.Mineral);
  AlchemyIngredients.Filtered.Mushrooms = AlchemyIngredients.Unfiltered.filter((n) => n.type === IngredientTypes.Mushroom);

// Map properties
  for (let key in Properties) {
    const id = Properties[key].id
    AlchemyIngredients.Filtered[id] = {
      Ordered: [[], [], [], []],
      Unordered: [],
    }
  }

  AlchemyIngredients.Unfiltered.forEach(ingredient => {
    for (let i = 0; i < 4; i++) {
      const unorderedProperty = ingredient.properties[i];
      if (unorderedProperty && 'id' in unorderedProperty) {
        AlchemyIngredients.Filtered[unorderedProperty.id].Unordered.push(ingredient);
      }

      const orderedProperty = ingredient.orderedProperties[i];
      if (orderedProperty && 'id' in orderedProperty) {
        AlchemyIngredients.Filtered[orderedProperty.id].Ordered[i].push(ingredient);
      }
    }
  });
}

CreateFilteredSets();
