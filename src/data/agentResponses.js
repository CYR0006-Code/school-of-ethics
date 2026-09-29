// Hardcoded mock AI-agent advice. Two response sets, selected by the
// "dissent visibility" condition — this is the thing the PoC exists to prove.
//
// - visible: agents are shown individually, and a genuine 2-1 split is exposed.
// - hidden:  agents are collapsed into a single consensus recommendation,
//            masking the fact that the underlying panel did not fully agree.

export const dissentVisibleAgents = [
  {
    name: 'Agent Rho',
    recommends: 'B',
    reasoning:
      'Disabling autonomy in known-risk conditions meaningfully cuts the hazard while still honoring the delivery commitment.',
  },
  {
    name: 'Agent Iris',
    recommends: 'B',
    reasoning:
      'The failure mode is rare and narrow; a rain-mode restriction is a proportionate interim control, not a full stop.',
  },
  {
    name: 'Agent Callum',
    recommends: 'A',
    reasoning:
      'A known defect affecting emergency braking is a bright line. No schedule pressure justifies knowingly shipping it.',
  },
]

export const dissentHiddenConsensus = {
  recommends: 'B',
  reasoning:
    'After weighing safety and delivery considerations, the AI review panel recommends launching with autonomous mode disabled in heavy rain until the sensor fix ships.',
}
