'use client';

import type React from 'react';
import FeedbackButton from '../FeedbackButton';
import { AnalysisOptionCard } from './AnalysisOptionCard';
import {
  DiscoverGraphic,
  ActivateGraphic,
} from '../graphics/PathSelectionGraphics';

interface PathSelectionCardProps {
  onActivateClick: () => void;
}

const DISCOVER_FEEDBACK_QUESTION =
  '*Feature under development* To help us build this feature, how detailed would you like us to be in describing your customer?';

export const PathSelectionCard: React.FC<PathSelectionCardProps> = ({
  onActivateClick,
}) => {
  return (
    <div className="flex h-full w-full max-w-5xl flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="mb-[2vh] text-center sm:mb-[3vh]">
        <h2 className="mb-2 text-[clamp(1.5rem,4vh,2.5rem)] font-bold text-white">
          Choose Your Path
        </h2>
        <p className="text-[clamp(0.875rem,2vh,1.125rem)] text-slate-400">
          How would you like to proceed?
        </p>
      </div>

      {/* Options grid - 2 columns, 1 row */}
      <div className="grid w-full max-w-5xl grid-cols-2 gap-[1.5vmin] sm:gap-[2vmin] md:gap-[2.5vmin]">
        {/* Discover - Feedback option */}
        <FeedbackButton
          question={DISCOVER_FEEDBACK_QUESTION}
          buttonText="Discover"
          answerType="text"
          onClick={() => {
            // Feedback collection handled by FeedbackButton
          }}
        >
          <AnalysisOptionCard
            title="Discover"
            description="I don't yet know who my ideal customers should be, and I want to use data to discover them."
            graphic={<DiscoverGraphic />}
            variant="feedback"
          />
        </FeedbackButton>

        {/* Activate - Navigation option */}
        <AnalysisOptionCard
          title="Activate"
          description="I can describe my ideal customer, and now I want data-backed strategies to help reach them."
          graphic={<ActivateGraphic />}
          onClick={onActivateClick}
          variant="navigation"
        />
      </div>
    </div>
  );
};
