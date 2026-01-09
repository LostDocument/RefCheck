"use client";

import { useState } from "react";
import { ChartNetwork } from "lucide-react";
import Header from "@/app/_components/Header";
import DocumentInput from "@/app/_components/DocumentInput";
import CorpusManager from "@/app/_components/CorpusManager";
import AnalyzeButton from "@/app/_components/AnalyzeButton";
import SummaryReport from "@/app/_components/SummaryReport";
import SourceBreakdown from "@/app/_components/SourceBreakdown";
import ComparisonView from "@/app/_components/ComparisonView";
import ExportButton from "@/app/_components/ExportButton";
import MobileStepper from "@/app/_components/MobileStepper";
import StepNavigation from "@/app/_components/StepNavigation";
import {
	mockSimilarityScore,
	mockRiskLevel,
	mockSources,
	mockUserText,
	mockReferenceText,
	mockHighlights,
} from "@/lib/data/mockData";

export default function Home() {
	const [documentText, setDocumentText] = useState("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [showResults, setShowResults] = useState(false);

	// Mobile stepper state
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 3;

	const handleAnalyze = () => {
		setIsAnalyzing(true);

		// Simulate analysis delay
		setTimeout(() => {
			setIsAnalyzing(false);
			setShowResults(true);
			// Move to results step on mobile
			setCurrentStep(3);
		}, 2000);
	};

	const handleExport = (format: "json" | "html") => {
		if (format === "json") {
			const data = {
				similarityScore: mockSimilarityScore,
				riskLevel: mockRiskLevel,
				sources: mockSources,
				timestamp: new Date().toISOString(),
			};

			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: "application/json",
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `similarity-report-${Date.now()}.json`;
			a.click();
			URL.revokeObjectURL(url);
		} else {
			alert("HTML export will be implemented in Phase 2");
		}
	};

	const canGoNext = () => {
		if (currentStep === 1) return documentText.trim().length > 0;
		if (currentStep === 2) return true;
		return false;
	};

	const handleNext = () => {
		if (currentStep < totalSteps && canGoNext()) {
			if (currentStep === 2) {
				// Trigger analysis when moving from step 2 to 3
				handleAnalyze();
			} else {
				setCurrentStep(currentStep + 1);
			}
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const getStepTitle = (step: number) => {
		switch (step) {
			case 1:
				return "Input Document";
			case 2:
				return "Manage Corpus";
			case 3:
				return "View Results";
			default:
				return "";
		}
	};

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			{/* Mobile: Stepper Header */}
			<MobileStepper
				currentStep={currentStep}
				totalSteps={totalSteps}
				onStepChange={setCurrentStep}
				showResults={showResults}
				getStepTitle={getStepTitle}
			/>

			{/* Main Content Area */}
			<div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
				{/* Left Column: Input & Corpus */}
				<div className="flex flex-col gap-4 overflow-auto px-3 py-3">
					<div className="hidden lg:block">
						<Header />
					</div>

					{/* Step 1: Document Input (Mobile) */}
					<div className={`${currentStep === 1 ? "block" : "hidden"} lg:block`}>
						<DocumentInput onTextChange={setDocumentText} />
					</div>

					{/* Step 2: Corpus Manager (Mobile) */}
					<div className={`${currentStep === 2 ? "block" : "hidden"} lg:block`}>
						<CorpusManager />
					</div>

					{/* Desktop: Sticky Analyze Button */}
					<div className="hidden lg:block sticky bottom-0 bg-bg pt-4 pb-2">
						<AnalyzeButton
							onClick={handleAnalyze}
							disabled={!documentText.trim()}
							isLoading={isAnalyzing}
						/>
					</div>
				</div>

				{/* Right Column: Results */}
				<div className="flex flex-col h-full overflow-hidden">
					{/* Step 3: Results (Mobile) */}
					<div
						className={`${
							currentStep === 3 ? "block" : "hidden"
						} lg:block overflow-y-auto px-3 py-3 h-full`}
					>
						{showResults ? (
							<div className="space-y-4">
								<SummaryReport
									similarityScore={mockSimilarityScore}
									riskLevel={mockRiskLevel}
								/>

								<SourceBreakdown sources={mockSources} />

								<ComparisonView
									userText={mockUserText}
									referenceText={mockReferenceText}
									referenceName="Research Paper - AI Ethics.txt"
									highlights={mockHighlights}
								/>

								<ExportButton onExport={handleExport} />
							</div>
						) : (
							<div className="hidden lg:flex clay-card h-full items-center justify-center">
								<div className="text-center text-text-tertiary">
									<ChartNetwork className="w-16 h-16 mb-4 text-text-tertiary mx-auto" />
									<h3 className="text-xl font-semibold mb-2 text-text-secondary">
										Results will appear here
									</h3>
									<p className="text-sm">
										Submit a document and click "Analyze Document" to see
										similarity results
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile: Navigation Buttons */}
			<StepNavigation
				currentStep={currentStep}
				totalSteps={totalSteps}
				canGoNext={canGoNext()}
				isAnalyzing={isAnalyzing}
				onNext={handleNext}
				onBack={handleBack}
				onEditDocument={() => setCurrentStep(1)}
			/>
		</div>
	);
}
