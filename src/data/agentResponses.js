// Standardized prototype advice. Participant answers never change this content.
export const adviceVersion = 'static-advice-1'

export const agentResponses = {
  'confidential-design-disclosure': {
    overall: {
      recommends: 'D',
      reasoning: 'Keep the matter internal and pause further discussion until the thermal issue is reproduced. The test results remain inconsistent, and a formal internal review is already scheduled within the week. Treating an unreproduced signal as confirmed risks acting on a testing artifact, and releasing design information now would expose confidential material over an issue that has not yet been established.',
    },
    agents: [
      {
        id: 'safety',
        name: 'Safety and Risk',
        recommends: 'D',
        reasoning: 'The thermal signal has not been consistently reproduced across tests, so there is not yet a verified safety issue to act on. Escalating or disclosing before reproduction risks responding to noise rather than a confirmed hazard, and the scheduled internal review is the appropriate venue to resolve that uncertainty first.',
      },
      {
        id: 'ethics',
        name: 'Professional Ethics',
        recommends: 'D',
        reasoning: 'Commercial confidentiality obligations and professional diligence both support resolving the technical uncertainty internally before any external communication. Acting on an unreproduced signal, or disclosing confidential design detail in response to it, would not be a proportionate step given what is currently known.',
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
