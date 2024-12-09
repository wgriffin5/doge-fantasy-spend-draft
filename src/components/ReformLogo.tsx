import { Chainsaw, Axe } from "lucide-react";

export default function ReformLogo() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid grid-cols-3 gap-4">
          {/* Elon with chainsaw */}
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"
              alt="Elon"
              className="w-12 h-12 rounded-full"
            />
            <Chainsaw className="text-doge-gold mt-2" />
          </div>
          
          {/* Donald with "You're Fired" gesture */}
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png"
              alt="Donald"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-2xl mt-2">🔥</span>
          </div>
          
          {/* Vivek with axe */}
          <div className="flex flex-col items-center">
            <img
              src="/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"
              alt="Vivek"
              className="w-12 h-12 rounded-full"
            />
            <Axe className="text-doge-purple mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}