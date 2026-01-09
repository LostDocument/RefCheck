"use client";

import { Check } from "lucide-react";

export default function MobileStepper({
	currentStep,
	totalSteps,
	onStepChange,
	showResults,
	getStepTitle,
}: {
	currentStep: number;
	totalSteps: number;
	onStepChange: (step: number) => void;
	showResults: boolean;
	getStepTitle: (step: number) => string;
}) {
	return (
		<div className="lg:hidden shrink-0 bg-surface border-b border-border">
			{/* App Branding */}
			<div className="px-4 pt-3 pb-2 border-b border-border">
				<h1 className="text-base font-semibold text-center">
					Document Similarity Checker
				</h1>
				<p className="text-xs text-text-secondary text-center font-inter">
					Privacy-first analysis
				</p>
			</div>

			{/* Stepper */}
			<div className="p-4">
				<div className="flex items-center justify-center mb-3">
					{Array.from({ length: totalSteps }, (_, i) => i + 1).map(
						(step, index) => (
							<div key={step} className="flex items-center">
								<button
									onClick={() => {
										// Allow going back to completed steps
										if (
											step < currentStep ||
											(step === totalSteps && showResults)
										) {
											onStepChange(step);
										}
									}}
									disabled={
										step > currentStep && !(step === totalSteps && showResults)
									}
									className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
										step < currentStep ||
										(step === totalSteps && showResults && step !== currentStep)
											? "bg-primary text-white cursor-pointer"
											: step === currentStep
												? "bg-primary text-white"
												: "bg-surface-elevated text-text-tertiary"
									}`}
								>
									{step < currentStep ||
									(step === totalSteps &&
										showResults &&
										step !== currentStep) ? (
										<Check className="w-4 h-4" />
									) : (
										step
									)}
								</button>
								{index < totalSteps - 1 && (
									<div
										className={`w-16 h-0.5 mx-2 ${
											step < currentStep ? "bg-primary" : "bg-border"
										}`}
									/>
								)}
							</div>
						)
					)}
				</div>
				<h2 className="text-lg font-semibold text-center">
					{getStepTitle(currentStep)}
				</h2>
			</div>
		</div>
	);
}
