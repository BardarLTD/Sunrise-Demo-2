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
    <div className="flex w-full max-w-5xl flex-col items-center">
      {/* Header */}
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="mb-3 text-3xl font-bold text-white lg:text-4xl">
          Customer Analysis
        </h2>
        <p className="text-base text-slate-400 lg:text-lg">
          What insights would you like to draw from these customers first
        </p>
      </div>

      {/* Options grid */}
      <div className="grid w-full gap-6 md:grid-cols-2">
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
