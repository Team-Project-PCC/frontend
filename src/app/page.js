import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Collection from "@/components/section/Collection";
import Event from "@/components/section/Event";
import Review from "@/components/section/Review";

export default function Home() {
  return (
    <main>
      <Hero/>
      <About/>
      <Collection/>
      <Event/>
      <Review/>
    </main>
  );
}
