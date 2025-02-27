import {AlchemyProperty} from "../model/AlchemyProperty.js";

export const Properties = {
  Strength: new AlchemyProperty(1, "Strength", "str"),
  Agility: new AlchemyProperty(2, "Agility", "agi"),
  Intelligence: new AlchemyProperty(3, "Intelligence", "int"),
  Constitution: new AlchemyProperty(4, "Constitution", "con"),
  Perception: new AlchemyProperty(5, "Perception", "prc"),
  Charisma: new AlchemyProperty(6, "Charisma", "csm"),
  Dexterity: new AlchemyProperty(7, "Dexterity", "dex"),
  Will: new AlchemyProperty(8, "Will", "wil"),
  Psyche: new AlchemyProperty(9, "Psyche", "psy"),
  UnarmedCombat: new AlchemyProperty(10, "Unarmed Combat", "unarmed"),
  MeleeCombat: new AlchemyProperty(11, "Melee Combat", "melee"),
  Marksmanship: new AlchemyProperty(12, "Marksmanship", "ranged"),
  Exploration: new AlchemyProperty(13, "Exploration", "explore"),
  Stealth: new AlchemyProperty(14, "Stealth", "stealth"),
  Sewing: new AlchemyProperty(15, "Sewing", "sewing"),
  Smithing: new AlchemyProperty(16, "Smithing", "smithing"),
  Masonry: new AlchemyProperty(17, "Masonry", "masonry"),
  Carpentry: new AlchemyProperty(18, "Carpentry", "carpentry"),
  Cooking: new AlchemyProperty(19, "Cooking", "cooking"),
  Farming: new AlchemyProperty(20, "Farming", "farming"),
  Survival: new AlchemyProperty(21, "Survival", "survive"),
  Lore: new AlchemyProperty(22, "Lore", "lore"),
  AdderBite: new AlchemyProperty(23, "Adder Bite", "addervenom"),
  AllergicReaction: new AlchemyProperty(24, "Allergic Reaction", "allergicreaction"),
  AntcidBurns: new AlchemyProperty(25, "Antcid Burns", "antburn"),
  Asphyxiation: new AlchemyProperty(26, "Asphyxiation", "asphyxiation"),
  Beesting: new AlchemyProperty(27, "Beesting", "beesting"),
  BirdLung: new AlchemyProperty(28, "Bird Lung", "birdlung"),
  BlackEyed: new AlchemyProperty(29, "Black-eyed", "blackeye"),
  BladeKiss: new AlchemyProperty(30, "Blade Kiss", "bladekiss"),
  BluntTrauma: new AlchemyProperty(31, "Blunt Trauma", "blunttrauma"),
  Bruise: new AlchemyProperty(32, "Bruise", "bruise"),
  BumBurn: new AlchemyProperty(33, "Bum Burn", "bumburn"),
  CoalersCough: new AlchemyProperty(34, "Coaler's Cough", "coalcough"),
  Concussion: new AlchemyProperty(35, "Concussion", "concussion"),
  CrabCaressed: new AlchemyProperty(36, "Crab Caressed", "crabcaressed"),
  CruelIncision: new AlchemyProperty(37, "Cruel Incision", "cruelincision"),
  DeepCut: new AlchemyProperty(38, "Deep Cut", "deepcut"),
  DragonBite: new AlchemyProperty(39, "Dragon Bite", "dragonbite"),
  FellSlash: new AlchemyProperty(40, "Fell Slash", "fellslash"),
  HearthBurn: new AlchemyProperty(41, "Hearth Burn", "hearthburn"),
  JellyfishSting: new AlchemyProperty(42, "Jellyfish Sting", "jellysting"),
  LeechBurns: new AlchemyProperty(43, "Leech Burns", "leechburns"),
  MidgeBite: new AlchemyProperty(44, "Midge Bite", "midgebite"),
  NastyLaceration: new AlchemyProperty(45, "Nasty Laceration", "nastylaceration"),
  NastyWart: new AlchemyProperty(46, "Nasty Wart", "toadwart"),
  NerveDamage: new AlchemyProperty(47, "Nerve Damage", "nervdmg"),
  NettleBurn: new AlchemyProperty(48, "Nettle Burn", "nettleburn"),
  NicksKnacks: new AlchemyProperty(49, "Nicks & Knacks", "nicksnknacks"),
  Nidburns: new AlchemyProperty(50, "Nidburns", "nidburns"),
  NoseBleed: new AlchemyProperty(51, "Nose Bleed", "nosebleed"),
  PipeWheeze: new AlchemyProperty(52, "Pipe Wheeze", "pipewheeze"),
  PunchSore: new AlchemyProperty(53, "Punch Sore", "punchsore"),
  QuicksilverPoisoning: new AlchemyProperty(54, "Quicksilver Poisoning", "mercury"),
  Quilld: new AlchemyProperty(55, "Quill'd", "quilled"),
  SandFleaBites: new AlchemyProperty(56, "Sand Flea Bites", "sandfleabites"),
  ScrapesCuts: new AlchemyProperty(57, "Scrapes & Cuts", "scrapesncuts"),
  SealFinger: new AlchemyProperty(58, "Seal Finger", "sealfinger"),
  SevereMauling: new AlchemyProperty(59, "Severe Mauling", "severemauling"),
  SomethingBroken: new AlchemyProperty(60, "Something Broken", "somethingbroken"),
  SoreSnout: new AlchemyProperty(61, "Sore Snout", "soresnout"),
  Starvation: new AlchemyProperty(62, "Starvation", "starvation"),
  SwampFever: new AlchemyProperty(63, "Swamp Fever", "swampfever"),
  SwollenBump: new AlchemyProperty(64, "Swollen Bumps", "swollenbump"),
  TickdOff: new AlchemyProperty(65, "Tick'd Off", "tickedoff"),
  Tuskalooza: new AlchemyProperty(66, "Tuskalooza!", "tuskalooza"),
  AchingJoints: new AlchemyProperty(67, "Aching Joints", "jointache"),
  BlisteringHeadache: new AlchemyProperty(68, "Blistering Headache", "blisteringheadache"),
  ChillsNausea: new AlchemyProperty(69, "Chills & Nausea", "chillsandnausea"),
  MaddeningRash: new AlchemyProperty(70, "Maddening Rash", "maddeningrash"),
  RotGut: new AlchemyProperty(71, "Rot Gut", "rotgut"),
  Unfaced: new AlchemyProperty(72, "Unfaced", "unfaced"),
  WretchedGore: new AlchemyProperty(73, "Wretched Gore", "wretchedgore"),
  IncreasedDuration: new AlchemyProperty(74, "Increased Duration", "duration-increased"),
  DecreasedDuration: new AlchemyProperty(75, "Decreased Duration", "duration-decreased"),
};

export function GetPropertyById(id) {
  return PropertyIdLookupTable[id];
}

const PropertyIdLookupTable = {};
for (let key in Properties) {
  PropertyIdLookupTable[Properties[key].id] = Properties[key];
}
