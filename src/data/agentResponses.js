// Standardized prototype advice. Participant answers never change this content.
export const adviceVersion = 'static-advice-1'

export const agentResponses = {
  'confidential-design-disclosure': {
    overall: {
      recommends: 'A',
      reasoning: 'Use the internal review and seek a controlled independent assessment. The thermal issue remains uncertain, and a review is offered in one week. This approach investigates possible harm while protecting confidential design information, although the community receives less immediate information.',
    },
    agents: [
      {
        id: 'safety',
        name: 'Safety and Risk',
        recommends: 'A',
        reasoning: 'The tests have not consistently reproduced the thermal issue, so its severity remains uncertain. A controlled independent assessment can examine that uncertainty without publishing all design files. The review should address the concern promptly; confidentiality should not become a reason to leave it unexamined.',
      },
      {
        id: 'ethics',
        name: 'Professional Ethics',
        recommends: 'A',
        reasoning: 'The decision involves both responsible investigation and confidentiality. Internal review combined with independent assessment provides a way to examine the concern while protecting sensitive information. Its limitation is that the community must wait for more information.',
      },
      {
        id: 'stakeholder',
        name: 'Stakeholder Impact',
        recommends: 'B',
        reasoning: 'The community group has asked for information about possible risks. A limited factual notice acknowledges that concern without releasing detailed design files. It should clearly describe the uncertain evidence and should accompany, rather than replace, further assessment.',
      },
    ],
  },
  'community-grid-deployment': {
    overall: {
      recommends: 'B',
      reasoning: 'Proceed within the funding window with noise monitoring and a documented community benefits review. The technical checks meet the stated limits, and the project could improve reliability. These measures provide a way to respond to residents while retaining the funding opportunity, but they do not settle concerns about location or community support.',
    },
    agents: [
      {
        id: 'safety',
        name: 'Safety and Risk',
        recommends: 'B',
        reasoning: 'The technical checks meet the project’s stated limits, which supports proceeding with noise monitoring. Monitoring provides a way to examine residents’ concerns during deployment. Meeting those limits does not guarantee that every impact is acceptable, so the results still need attention.',
      },
      {
        id: 'ethics',
        name: 'Professional Ethics',
        recommends: 'B',
        reasoning: 'Proceeding with documented monitoring and a benefits review can preserve the funding opportunity while keeping impacts and benefits open to scrutiny. That is a defensible balance under the supplied facts. Its limitation is that residents have less opportunity to influence the location before deployment.',
      },
      {
        id: 'stakeholder',
        name: 'Stakeholder Impact',
        recommends: 'A',
        reasoning: 'Residents have raised concerns about noise, location and how benefits will be shared. Time-limited consultation gives them an opportunity to influence the decision before the location is final. Requesting an extension addresses the funding pressure, although the facts do not establish that an extension will be available.',
      },
    ],
  },
}
