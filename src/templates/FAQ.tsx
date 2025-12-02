import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  const t = useTranslations('FAQ');

  const faqs = [
    { id: 'q1', question: t('question'), answer: t('answer') },
    { id: 'q2', question: t('question-2'), answer: t('answer-2') },
    { id: 'q3', question: t('question-3'), answer: t('answer-3') },
    { id: 'q4', question: t('question-4'), answer: t('answer-4') },
    { id: 'q5', question: t('question-5'), answer: t('answer-5') },
    { id: 'q6', question: t('question-6'), answer: t('answer-6') },
  ];

  return (
    <section id="sss" className="relative bg-[#0a0a0f] py-24 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-purple-400">
            Yardım
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-lg text-gray-400">
            Merak ettiğiniz her şeyin cevabı burada
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="multiple" className="space-y-4">
          {faqs.map(faq => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all data-[state=open]:border-purple-500/50 data-[state=open]:bg-white/10"
            >
              <AccordionTrigger className="px-6 py-5 text-left text-white hover:no-underline [&>svg]:hidden">
                <span className="pr-6 text-base font-medium">{faq.question}</span>
                <ChevronDown className="size-5 shrink-0 text-gray-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
