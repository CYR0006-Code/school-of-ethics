// Standardized prototype advice. Participant answers never change this content.
export const adviceVersion = 'static-advice-1'

export const agentResponses = {
  'confidential-design-disclosure': {
    overall: {
      recommends: 'D',
      reasoning: 'Keep this internal for now and stop further discussion until the issue is reproduced. The thermal problem has not been consistently reproduced and its severity remains uncertain, the engineering director has already offered a review in one week, and the design details are commercially confidential. Acting or disclosing anything before the issue is confirmed risks releasing sensitive information over an effect that may not even be real.',
    },
    agents: [
      {
        id: 'safety',
        name: 'Safety and Risk',
        recommends: 'D',
        reasoning: 'The tests have not consistently reproduced the thermal issue, so its severity remains uncertain. Without a confirmed effect there is nothing concrete to assess or disclose yet. Holding the matter internally until the scheduled review avoids reacting to a problem that may not be reproducible.',
      },
      {
        id: 'ethics',
        name: 'Professional Ethics',
        recommends: 'D',
        reasoning: 'Commercially confidential design information should not be shared, even partially, while the underlying issue remains unconfirmed. The internal review in one week is a reasonable, already-scheduled path. Pausing discussion until then avoids overstating an uncertain risk to the community.',
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
