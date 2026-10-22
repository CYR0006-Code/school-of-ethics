export const scenarios = [
  {
    id: 'confidential-design-disclosure',
    title: 'The Confidential Design Disclosure',
    description: 'You are an engineer at a fictional battery manufacturer. Internal tests suggest a thermal problem under an unusual charging pattern, but the team has not reproduced it consistently and its severity remains uncertain. Detailed design information is commercially confidential. Internal escalation has started, and the engineering director offers a review in one week. A community technical group requests the design files now to assess possible risks. The scenario supplies no legal disclosure requirement and no evidence of an immediate public emergency.',
    options: [
      { id: 'A', label: 'Use the internal review and seek a controlled independent assessment that protects sensitive design details.' },
      { id: 'B', label: 'Provide a limited factual risk notice to the community group while withholding detailed design files.' },
      { id: 'C', label: 'Publish all design files immediately to enable unrestricted external scrutiny.' },
      { id: 'D', label: 'Keep all information internal and stop further discussion until the issue is reproduced.' },
    ],
    version: 'development-1',
    expertReference: {
      version: 'expert-reference-1',
      scenarioVersion: 'development-1',
      status: 'pending-review',
      reviewers: [],
      reviewedAt: null,
      reviewSource: null,
      acceptableOptions: ['A', 'B'],
      rationale: 'A and B balance investigating possible harm with protecting confidential information. A seeks a controlled assessment; B gives the community earlier, limited information. Both approaches should keep the possible risk under review.',
      optionFeedback: {
        A: 'A controlled assessment seeks better evidence while protecting sensitive design details. The review should address the possible harm promptly, even though the test results remain uncertain. The community receives less immediate information through this approach.',
        B: 'A limited factual notice responds to the community’s concern without releasing all design files. It should clearly explain the uncertain evidence and accompany further assessment. Sharing information does not by itself resolve the possible thermal issue.',
        C: 'Publishing every design file enables broad scrutiny but also releases commercially confidential information. A limited notice or controlled assessment could address the concern while protecting sensitive details; the facts do not establish an immediate emergency or a legal requirement to disclose.',
        D: 'Stopping discussion until the issue is reproduced leaves the possible harm and the community’s concern unaddressed. Protecting confidential information still allows investigation through the offered review and a controlled assessment.',
      },
      sources: [{
        title: 'Code of Ethics and Guidelines on Professional Conduct (Engineers Australia, 2022)',
        url: 'https://www.engineersaustralia.org.au/sites/default/files/2022-08/code-ethics-guidelines-professional-conduct-2022.pdf',
        sections: ['1.2(e)', '3.3(a)', '4.1(a–c)'],
        summary: 'The Code supports respecting confidentiality, communicating honestly about risks and involving affected communities in decisions.',
      }],
    },
  },
  {
    id: 'community-grid-deployment',
    title: 'The Community Grid Deployment',
    description: 'You are an engineer planning a fictional neighbourhood battery installation. Technical checks meet the project’s stated limits. The installation could improve electricity reliability and generate revenue, but nearby residents raise concerns about noise, location, and how benefits will be shared. A funding offer expires this month. The available information does not establish whether further consultation would change the design, whether the offer could be extended, or whether the community favours deployment overall.',
    options: [
      { id: 'A', label: 'Pause the final location decision for a time-limited consultation and request a funding extension.' },
      { id: 'B', label: 'Proceed within the funding window with noise monitoring and a documented community benefits review.' },
      { id: 'C', label: 'Cancel the installation because any resident objection should prevent deployment.' },
      { id: 'D', label: 'Proceed immediately without responding to residents because the technical limits are met.' },
    ],
    version: 'development-1',
    expertReference: {
      version: 'expert-reference-1',
      scenarioVersion: 'development-1',
      status: 'pending-review',
      reviewers: [],
      reviewedAt: null,
      reviewSource: null,
      acceptableOptions: ['A', 'B'],
      rationale: 'A and B balance community participation, possible project benefits and the funding deadline differently. A gives residents an earlier opportunity to influence the location; B proceeds with monitoring and a benefits review. Neither approach removes all the uncertainty.',
      optionFeedback: {
        A: 'Time-limited consultation gives residents an opportunity to influence the location before it is final. Requesting an extension addresses the funding pressure, but the facts do not establish that an extension is available or that consultation will change the design.',
        B: 'Proceeding with noise monitoring and a documented benefits review retains the funding opportunity while responding to residents’ concerns. Residents have less influence before deployment, and meeting the technical limits does not settle every social concern.',
        C: 'Cancelling because of any objection gives those objections priority without balancing the possible reliability and revenue benefits. The facts do not establish that the community opposes the project overall. Consultation could help clarify those views.',
        D: 'Meeting the technical limits does not resolve residents’ concerns about noise, location or the sharing of benefits. Proceeding without responding to them excludes their voice from that balance, even though the project could provide benefits.',
      },
      sources: [{
        title: 'Code of Ethics and Guidelines on Professional Conduct (Engineers Australia, 2022)',
        url: 'https://www.engineersaustralia.org.au/sites/default/files/2022-08/code-ethics-guidelines-professional-conduct-2022.pdf',
        sections: ['4.1(a–c)', '4.2(a)'],
        summary: 'The Code supports community involvement and considering health, safety and wellbeing alongside social, environmental and economic impacts.',
      }],
    },
  },
]

// Review evidence must apply to the exact scenario version shown to participants.
export function isExpertReviewed(scenario) {
  const reference = scenario.expertReference
  const hasText = value => typeof value === 'string' && value.trim().length > 0
  return Boolean(reference && reference.status === 'reviewed' && hasText(reference.version) &&
    reference.scenarioVersion === scenario.version &&
    Array.isArray(reference.reviewers) && reference.reviewers.length > 0 &&
    reference.reviewers.every(reviewer => reviewer && hasText(reviewer.name) && hasText(reviewer.expertise)) &&
    hasText(reference.reviewedAt) && !Number.isNaN(Date.parse(reference.reviewedAt)) &&
    hasText(reference.reviewSource?.title) && hasText(reference.rationale) &&
    Array.isArray(reference.acceptableOptions) && reference.acceptableOptions.length > 0 &&
    reference.acceptableOptions.every(id => scenario.options.some(option => option.id === id)))
}
