import BlogSection from "@/components/home/BlogSection";
import SearchInput from "@/components/home/SearchInput";
import ContainerLayout from "@/components/layouts/ContainerLayout";

function Page() {
  return (
    <ContainerLayout>
      <div className="space-y-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-primary/20 blur-[120px] rounded-full -z-10" />
        <h1 className="text-3xl lg:text-5xl xl:text-6xl tracking-wide leading-tight text-center">
          <span className="font-bold"> Welcome to PostCraft</span>
          <br />
          Where Ideas Turn Into Opportunities.
        </h1>

        <p className="text-gray-400 max-w-2xl text-center mx-auto">
          Dive into practical insights on tech, startups, lifestyle, and finance
          to help build smarter and live better.
        </p>
        <SearchInput />
        <BlogSection />
      </div>
    </ContainerLayout>
  );
}

export default Page;
