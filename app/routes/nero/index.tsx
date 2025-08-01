import type {NeroLayoutProps} from "~/layouts/nero";
import NeroLayout from "~/layouts/nero";
import NeroSidebar from "~/components/nero-sidebar";
import NeroGlobalNav from "~/components/nero-global-nav";
import NeroRegionalNav from "~/components/nero-regional-nav";
import SimplePromotionalText from "~/components/simple-promotional-text";

export default function NeroIndexRoute() {

  const props = {
    pageTitle: "Nero",
    promotion: (
      <SimplePromotionalText text="The Yogg is devouring the Overflowing Expanse.." linkTo="/" />
    ),
    crumbs: [
      {title: "Universe", to: "/universe"},
      {title: "SW - Coruscant", to: "/universe/12"},
      {title: "Codex", to: "/universe/12/codex"},
      {title: "Nightlife & Gangs", to: "/universe/12/codex/page/nightlife-and-gangs"},
    ]
  }

  const leftSidebarSections = [
    {
      title: "General",
      items: [
        {url: "universe", title: "Universe"},
        {url: "help", title: "Help"},
        {url: "talk", title: "Talk"},
      ],
    },
  ];

  const layoutProps: NeroLayoutProps = {
    leftSidebar: (<NeroSidebar activeSubsite="universe" sections={leftSidebarSections} />),
    globalNavBar: (<NeroGlobalNav {...props} />),
    regionalNavBar: (<NeroRegionalNav {...props} />),
  }

  return (
    <NeroLayout {...layoutProps}>
      <div className="p-6">
        <div className="mb-6 flex h-[450px] w-full flex-col justify-center bg-blue-100">
          <div className="flex justify-center italic">Image Placeholder</div>
        </div>

        <h2 className="mb-4 block border-b border-b-gray-200 pb-2 text-xl font-semibold">Climate</h2>

        <p className="pb-6">Due to the oscillating equators, this world is prone to violent storms and shifting
          landscapes. An area could shift from desert to subtropics in the span of a year.</p>
      </div>
    </NeroLayout>
  );
}