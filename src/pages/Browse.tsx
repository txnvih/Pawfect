import { useState } from "react";
import Navigation from "@/components/Navigation";
import PetCard from "@/components/PetCard";
import { Button } from "@/components/ui/button";
import petDog1 from "@/assets/pet-dog-1.jpg";
import petCat1 from "@/assets/pet-cat-1.jpg";
import petSmall1 from "@/assets/pet-small-1.jpg";
import petDog2 from "@/assets/pet-dog-2.jpg";

const categories = ["All", "Dog", "Cat", "Bird", "Small Animals", "Others"];

const pets = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: "2 years",
    image: petDog1,
    category: "Dog",
    gender: "male",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Tabby",
    age: "18 months",
    image: petCat1,
    category: "Cat",
    gender: "female",
  },
  {
    id: 3,
    name: "Sunny & Pip",
    breed: "Parrot & Hamster",
    age: "1 year",
    image: petSmall1,
    category: "Small Animals",
  },
  {
    id: 4,
    name: "Bailey",
    breed: "Corgi",
    age: "3 years",
    image: petDog2,
    category: "Dog",
    gender: "male",
  },
];

const Browse = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPets = activeCategory === "All" 
    ? pets 
    : pets.filter(pet => pet.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-6">Browse Pets</h1>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Pet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              age={pet.age}
              image={pet.image}
              gender={pet.gender}
            />
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No pets found in this category.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
