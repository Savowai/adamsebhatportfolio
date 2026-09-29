import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/Chrome";
import { Contours } from "@/components/Contours";

export const metadata = { title: "Off the map" };

export default function NotFound() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main id="main" className="relative">
        <Contours />
        <div className="relative py-s7">
          <p className="label">Error 404 · No survey data at these coordinates</p>
          <h1 className="mt-3.5 font-serif text-[clamp(56px,11vw,160px)] leading-[0.9] tracking-[-0.025em]">
            Off the <em className="text-orange-ink">map</em>.
          </h1>
          <p className="mt-s4 max-w-[40ch] text-[18px]">
            This page was never surveyed, or it moved. The work is all on the main sheet.
          </p>
          <p className="label mt-s5 flex flex-wrap gap-6">
            <Link href="/" className="link-underline">
              Back to the main sheet
            </Link>
            <Link href="/#work" className="link-underline">
              See the work
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter sheet="Sheet 404" />
    </div>
  );
}
