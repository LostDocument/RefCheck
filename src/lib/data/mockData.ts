// Mock data for demonstration purposes
// This will be replaced with real analysis results in Phase 2

export const mockSimilarityScore = 42;
export const mockRiskLevel: "low" | "medium" | "high" = "medium";

export const mockSources = [
	{
		id: "1",
		name: "Research Paper - AI Ethics.txt",
		similarity: 38,
		matchCount: 12,
		color: "#FF6B6B",
	},
	{
		id: "2",
		name: "Article - Machine Learning.md",
		similarity: 25,
		matchCount: 8,
		color: "#4ECDC4",
	},
	{
		id: "3",
		name: "Thesis Chapter 3.txt",
		similarity: 15,
		matchCount: 5,
		color: "#FFE66D",
	},
];

export const mockUserText = `Artificial intelligence has become increasingly important in modern society. Machine learning algorithms are now used in various applications, from healthcare to finance. The ethical implications of AI deployment must be carefully considered to ensure responsible innovation.

Deep learning techniques have revolutionized computer vision and natural language processing. Neural networks can now perform tasks that were previously thought to require human intelligence. However, concerns about bias and fairness in AI systems remain significant challenges.

The future of AI research will likely focus on developing more interpretable and transparent models. Explainable AI is crucial for building trust and ensuring accountability in automated decision-making systems.`;

export const mockReferenceText = `Machine learning algorithms are now used in various applications, from healthcare to finance. The development of these systems requires careful consideration of ethical implications and potential societal impacts.

Neural networks have demonstrated remarkable capabilities in computer vision and natural language processing tasks. These deep learning techniques represent a significant advancement in artificial intelligence research.

Building trust in AI systems requires transparency and interpretability. Explainable AI approaches are essential for ensuring accountability in automated decision-making processes.`;

export const mockHighlights = [
	{
		userStart: 85,
		userEnd: 185,
		refStart: 0,
		refEnd: 100,
		color: "#FF6B6B",
		sourceName: "Research Paper - AI Ethics.txt",
	},
	{
		userStart: 320,
		userEnd: 450,
		refStart: 200,
		refEnd: 330,
		color: "#4ECDC4",
		sourceName: "Article - Machine Learning.md",
	},
	{
		userStart: 550,
		userEnd: 680,
		refStart: 400,
		refEnd: 530,
		color: "#FFE66D",
		sourceName: "Thesis Chapter 3.txt",
	},
];
