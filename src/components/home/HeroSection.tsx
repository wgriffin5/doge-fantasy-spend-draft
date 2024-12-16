import ReformLogo from "@/components/ReformLogo";
import SocialShare from "@/components/SocialShare";
import InaugurationCountdown from "@/components/InaugurationCountdown";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <ReformLogo />
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Fantasy{" "}
            <span className="relative">
              <span className="relative z-10 doge-gradient-text">D.O.G.E.</span>
              <span
                className="absolute inset-0 doge-gradient opacity-75 blur-sm"
                aria-hidden="true"
              ></span>
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Welcome to the Department of Government Efficiency Fantasy League!
            Draft federal spending programs you think will be cut or streamlined,
            earn points for successful predictions, and compete with other
            efficiency advocates.
          </p>
          <div className="mb-8">
            <InaugurationCountdown />
          </div>
          <SocialShare />
        </div>
      </div>

      <div className="absolute -top-40 left-0 h-96 w-96 animate-float opacity-10">
        <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
      </div>
      <div className="absolute -bottom-40 right-0 h-96 w-96 animate-float opacity-10">
        <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}