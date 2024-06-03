"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const Faqs = () => {
  return (
    <div className="bg-accent/40 border-t border-b py-12 px-4">
      <div className="max-w-[600px] mx-auto">
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
                Which Dreamist plan is right for me?
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                Our plans are designed to meet the needs of businesses of all
                sizes. Our free plan is perfect for personal use or if you are
                just wanting to try out Dreamist. Our paid plans are going to
                vary on your specific needs. If you are unsure, you can always
                start with our free plan and upgrade later. Or you can contact
                us and we can help you find the right plan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer custom plans?</AccordionTrigger>
              <AccordionContent className="text-sm">
                Yes, we do offer custom plans for businesses that have specific
                needs. If you are interested in a custom plan, please contact us
                and we can create a plan tailored to your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
