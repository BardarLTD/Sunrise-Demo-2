'use client';

import type React from 'react';
import FeedbackButton from '../FeedbackButton';
import { AnalysisOptionCard } from './AnalysisOptionCard';
import {
  ProductInsightsGraphic,
  PartnershipsGraphic,
  ContentInsightsGraphic,
  CompetitorsGraphic,
} from '../graphics/AnalysisGraphics';

interface CustomerAnalysisPageProps {
  onNavigateToMarketing: () => void;
}

const FEEDBACK_QUESTION =
  'Help us plan our roadmap by identifying which of these features would be most useful to you and why. Please be specific about your use case and the value this would provide.';

export const CustomerAnalysisPage: React.FC<CustomerAnalysisPageProps> = ({
  onNavigateToMarketing,
}) => {
  return (
    <div className="flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* Header - scales with viewport height */}
      <div className="mb-[2vh] text-center sm:mb-[3vh]">
        <h2 className="mb-2 text-[clamp(1.5rem,4vh,2.5rem)] font-bold text-white">
          Customer Analysis
        </h2>
        <p className="text-[clamp(0.875rem,2vh,1.125rem)] text-slate-400">
          What insights would you like to draw from these customers first
        </p>
      </div>

      {/* Options grid - Always 2 columns, scales with viewport */}
      <div className="grid w-full max-w-5xl grid-cols-2 gap-[1.5vmin] sm:gap-[2vmin] md:gap-[2.5vmin]">
        {/* Product Insights - Feedback */}
        <FeedbackButton
          question={FEEDBACK_QUESTION}
          buttonText="Product Insights"
          answerType="text"
          onClick={() => {
            // Feedback collection handled by FeedbackButton
          }}
        >
          <AnalysisOptionCard
            title="Product Insights"
            description="Discover what products or features would resonate most with these customers"
            graphic={<ProductInsightsGraphic />}
            variant="feedback"
          />
        </FeedbackButton>

        {/* Partnerships and Ads - Navigation */}
        <AnalysisOptionCard
          title="Partnerships and Ads"
          description="Find the best communities and platforms to reach these customers"
          graphic={<PartnershipsGraphic />}
          onClick={onNavigateToMarketing}
          variant="navigation"
        />

        {/* Content Insights - Feedback */}
        <FeedbackButton
          question={FEEDBACK_QUESTION}
          buttonText="Content Insights"
          answerType="text"
          onClick={() => {
            // Feedback collection handled by FeedbackButton
          }}
        >
          <AnalysisOptionCard
            title="Content Insights"
            description="Learn what content topics and formats would engage these customers"
            graphic={<ContentInsightsGraphic />}
            variant="feedback"
          />
        </FeedbackButton>

        {/* Competitors - Feedback */}
        <FeedbackButton
          question={FEEDBACK_QUESTION}
          buttonText="Competitors"
          answerType="text"
          onClick={() => {
            // Feedback collection handled by FeedbackButton
          }}
        >
          <AnalysisOptionCard
            title="Competitors"
            description="Identify which competitors are targeting these same customers"
            graphic={<CompetitorsGraphic />}
            variant="feedback"
          />
        </FeedbackButton>
      </div>
    </div>
  );
};
