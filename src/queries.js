import { Op, where } from "sequelize";
import { Animal, Human } from "./model.js";

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({ where: { species: "fish" } });

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({ where: { humanId: 5 } });

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    birth_year: {
      [Op.gt]: 2015,
    },
  },
});

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    fname: {
      [Op.startsWith]: "J",
    },
  },
});

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birth_year: {
      [Op.is]: null,
    },
  },
});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    species: {
      [Op.or]: ["fish", "rabbit"],
    },
  },
});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    email: {
      [Op.notLike]: "%gmail%",
    },
  },
});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  const humans = await Human.findAll({
    attributes: ["fname", "lname", "humanId"],
  });

  for (let i = 0; i < humans.length; i++) {
    console.log(humans[i].fname);

    const id = humans[i].humanId;
    const animals = await Animal.findAll({
      where: {
        humanId: id,
      },
    });

    for (let x = 0; x < animals.length; x++) {
      const name = animals[x].name;
      const species = animals[x].species;

      console.log(name);
    }
  }
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  const humanIds = await Animal.findAll({
    attributes: ["humanId"],
    where: {
      species: species,
    },
  });
  const humansData = await Human.findAll({
    attributes: ["fname", "lname"],
    where: {
      humanId: humanIds,
    },
  });

  const humans = new Set();

  for (let i = 0; i < humansData; i++) {
    const fullName = humansData[i].fname + " " + humansData[i].lname;
    humans.add(fullName);
  }
  return humans;
}
