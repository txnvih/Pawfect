import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PetCardProps {
  name: string;
  breed: string;
  age?: string;
  image: string;
  gender?: string;
}

const PetCard = ({ name, breed, age, image, gender }: PetCardProps) => {
  return (
    <Card className="overflow-hidden bg-card shadow-[var(--card-shadow)] hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <button
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          {gender && (
            <span className="text-muted-foreground text-sm">
              {gender === "male" ? "♂" : "♀"}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-1">Breed: {breed}</p>
        {age && <p className="text-muted-foreground text-sm mb-4">Age: {age}</p>}
        <Button className="w-full">View Details</Button>
      </div>
    </Card>
  );
};

export default PetCard;
