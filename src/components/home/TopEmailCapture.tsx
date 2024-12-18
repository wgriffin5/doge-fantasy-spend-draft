import { motion } from "framer-motion";
import EmailSubmission from "../common/EmailSubmission";

export default function TopEmailCapture() {
  return (
    <div className="w-full bg-gradient-to-r from-doge-gold/10 via-doge-purple/10 to-doge-blue/10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Efficiency Expert"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <h3 className="font-bold text-lg">Join the Reform Movement!</h3>
                <p className="text-sm text-muted-foreground">
                  Elon & Vivek are waiting for your efficiency expertise
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 max-w-md">
            <EmailSubmission
              type="welcome"
              buttonText="Join the Movement"
              successMessage="Welcome aboard! Check your email for next steps."
              onSuccess={() => {}}
              variant="C"
            />
          </div>
        </div>
      </div>
    </div>
  );
}