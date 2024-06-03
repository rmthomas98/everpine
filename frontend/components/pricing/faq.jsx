"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export const Faqs = () => {
  return (
    <div className="bg-accent/40 border-t border-b py-12 px-4">
      <div className="max-w-[650px] mx-auto">
        <h2 className="text-2xl font-bold text-center">
          Frequently asked questions
        </h2>
        <p className="text-muted-foreground mt-2 text-sm text-center mx-auto">
          Find answers to the most common questions about Dreamist and how it
          works.
        </p>
        <div className="mt-8">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="border-t">
              <AccordionTrigger>
                Why should I use Dreamist for my business?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Dreamist is your all-in-one solution for creating
                  custom-branded links and stunning QR codes powered by AI. Our
                  platform is crafted to enhance your audience engagement,
                  monitor your marketing campaigns, and drive your business
                  growth.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What are AI-powered QR codes?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Dreamist leverages AI to craft eye-catching QR codes by
                  blending an AI-generated image, inspired by your imagination,
                  or a custom-uploaded image with the QR code itself. This
                  results in visually captivating and engaging QR codes that
                  spark curiosity and excitement in your audience, potentially
                  boosting your scan rates.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>
                Why use QR codes for my business?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  QR codes are a great way to engage with your audience. They
                  are easy to scan and can be used in a variety of ways. You can
                  use QR codes to link to your website, social media, or any
                  other online content. They are a great way to drive traffic to
                  your site or any other content.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>
                What are custom-branded short links?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Custom-branded short links are unique, branded links that
                  represent your brand and are used to redirect users to your
                  content. These links are customizable, allowing you to create
                  links that are easy to remember and share. They are great for
                  branding and making your links more recognizable.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>
                Why are short links important for my business?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Short links are important for your business because they are
                  easy to remember and share. They are great for branding and
                  making your links more recognizable. Short links are also
                  trackable, allowing you to monitor the performance of your
                  links and see how many people are clicking on them.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What is a custom domain and how do I set it up?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  A custom domain allows you to use your own website name for
                  your custom links and will show up as the URL when scanning
                  your QR codes. This is great for branding and making your
                  links more recognizable. You can follow&nbsp;
                  <Link
                    href="/guides/custom-domains"
                    target="_blank"
                    className="text-blue-500 border-b border-transparent hover:underline"
                  >
                    these instructions
                  </Link>
                  &nbsp;to set up your custom domain.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Which Dreamist plan is right for me?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Our plans are designed to meet the needs of businesses of all
                  sizes. Our free plan is perfect for personal use or if you are
                  just wanting to try out Dreamist. Our paid plans are going to
                  vary on your specific needs. If you are unsure, you can always
                  start with our free plan and upgrade later. Or you can contact
                  us and we can help you find the right plan.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer custom plans?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Yes, we do offer custom plans for businesses that have
                  specific needs. If you are interested in a custom plan, please
                  contact us and we can create a plan tailored to your needs.
                </p>
              </AccordionContent>
            </AccordionItem>
            {/*<AccordionItem value="item-3">*/}
            {/*  <AccordionTrigger>*/}
            {/*    Can I get my website on my links instead of Dreamist?*/}
            {/*  </AccordionTrigger>*/}
            {/*</AccordionItem>*/}
            <AccordionItem value="item-4">
              <AccordionTrigger>
                I have a free account, how do I upgrade?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  You can follow&nbsp;
                  <Link
                    href="/guides/upgrade"
                    target="_blank"
                    className="text-blue-500 border-b border-transparent hover:underline"
                  >
                    these instructions
                  </Link>
                  &nbsp;to upgrade to a paid plan.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                What happens to my links if I cancel my plan?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  If you cancel or downgrade your plan, your links will still
                  work the same as they did before. However, you will be limited
                  to the features of your new plan. If you are on a paid plan
                  and you downgrade to a free plan, you will lose access to the
                  features that are not included in the free plan.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Have more questions?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  If you have any other questions, feel free to reach out to us
                  at&nbsp;
                  <Link
                    href="mailto:support@dreamist.ai"
                    className="text-blue-500 border-b border-transparent hover:underline"
                  >
                    support@dreamist.ai
                  </Link>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
