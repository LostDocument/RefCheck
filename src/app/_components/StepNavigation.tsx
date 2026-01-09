"use client";

import { ChevronLeft, ChevronRight, PencilLine } from "lucide-react";

export default function StepNavigation({
	currentStep,
	totalSteps,
	canGoNext,
	isAnalyzing,
	onNext,
	onBack,
	onEditDocument,
}: {
	currentStep: number;
	totalSteps: number;
	canGoNext: boolean;
	isAnalyzing: boolean;
	onNext: () => void;
	onBack: () => void;
	onEditDocument: () => void;
}) {
	return (
		<div className="lg:hidden shrink-0 p-4 bg-surface border-t border-border">
			<div className="flex gap-3">
				{currentStep > 1 && (
					<button
						onClick={onBack}
						className="clay-button btn-secondary flex-1 flex items-center justify-center gap-2"
					>
						<ChevronLeft className="w-4 h-4" />
						Back
					</button>
				)}

				{currentStep < totalSteps ? (
					<button
						onClick={onNext}
						disabled={!canGoNext || isAnalyzing}
						className={`clay-button btn-primary flex-1 flex items-center justify-center gap-2 ${
							currentStep === 1 ? "w-full" : ""
						}`}
					>
						{currentStep === 2 ? (
							isAnalyzing ? (
								<>
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Analyzing...
								</>
							) : (
								<>
									Analyze
									<ChevronRight className="w-4 h-4" />
								</>
							)
						) : (
							<>
								Next
								<ChevronRight className="w-4 h-4" />
							</>
						)}
					</button>
				) : (
					<button
						onClick={onEditDocument}
						className="clay-button btn-primary flex-1 flex items-center justify-center gap-2"
					>
						<PencilLine className="w-4 h-4" />
						Edit Document
					</button>
				)}
			</div>
		</div>
	);
}
