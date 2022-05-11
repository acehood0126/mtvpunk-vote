
import SectionHero from "../components/home/section-hero"
import SectionFAQ from "../components/home/section-faq"
import SectionRecent from "../components/home/section-recent"
import SectionHowTo from "../components/home/section-how-to"
import SectionProposal from "../components/home/section-proposal"

export default function Home(props) {

  return (
    <>
      <SectionHero />
      <SectionRecent />
      <SectionHowTo />
      <SectionProposal />
      <SectionFAQ />
    </>
  )
}
